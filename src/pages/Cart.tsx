
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Cart, CartItem } from '@/types';
import { api } from '@/lib/api';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { user, token } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;

  useEffect(() => {
    if (user && token) {
      fetchCart();
    }
  }, [user, token]);

  const loadRzp = () =>
    new Promise<boolean>((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    if (!token) {
      toast({ title: "Unauthorized", description: "Please login.", variant: "destructive" });
      return;
    }
    const ok = await loadRzp();
    if (!ok) {
      toast({ title: "Error", description: "Failed to load Razorpay SDK.", variant: "destructive" });
      return;
    }

    try {
      setProcessing(true);
      // 1️⃣ Create order via backend
      const res = await fetch('http://localhost:5000/api/orders/user', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { order, razorpayOrder } = await res.json();
      if (!order || !razorpayOrder) throw new Error("Create order failed");

      // 2️⃣ Launch Razorpay checkout
      const options = {
        key: razorpayKey,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Your Store Name",
        description: `Order #${order._id}`,
        order_id: razorpayOrder.id,
        handler: async (resp: any) => {
          try {
            // 3️⃣ Verify payment
            const verifyRes = await fetch('http://localhost:5000/api/orders/verify-payment', {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(resp),
            });
            const { order: updatedOrder } = await verifyRes.json();
            toast({ title: "Payment Successful", description: "Order placed." });
            clearCart(); // clear cart after success
          } catch {
            toast({ title: "Verification Failed", description: "Contact support", variant: "destructive" });
          }
        },
        prefill: {
          name: order.user.name,
          email: order.user.email,
        },
        theme: { color: "#2563eb" },
      };

      new (window as any).Razorpay(options).open();
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Something went wrong", variant: "destructive" });
    } finally {
      setProcessing(false);
    }
  };
  

  const fetchCart = async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      const response = await api.cart.get(token);
      if (response.ok) {
        const data = await response.json();
        setCart(data);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!token) return;

    try {
      const response = await api.cart.update({ product: productId, quantity }, token);
      if (response.ok) {
        fetchCart();
        toast({
          title: "Success",
          description: "Cart updated successfully!",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update cart",
        variant: "destructive",
      });
    }
  };

  const removeItem = async (productId: string) => {
    if (!token) return;

    try {
      const response = await api.cart.remove(productId, token);
      if (response.ok) {
        fetchCart();
        toast({
          title: "Success",
          description: "Item removed from cart!",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive",
      });
    }
  };

  const clearCart = async () => {
    if (!token) return;

    try {
      const response = await api.cart.clear(token);
      if (response.ok) {
        fetchCart();
        toast({
          title: "Success",
          description: "Cart cleared successfully!",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear cart",
        variant: "destructive",
      });
    }
  };

  const calculateTotal = () => {
    if (!cart?.items) return 0;
    return cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h1>
          <p className="text-gray-600 mb-6">You need to be logged in to view your cart.</p>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-600">Review your items and proceed to checkout</p>
      </div>

      {cart?.items && cart.items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item: CartItem) => (
              <Card key={item.product._id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.product.images[0] || '/placeholder.svg'}
                      alt={item.product.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.product.title}</h3>
                      <p className="text-gray-600">{item.product.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="outline">{item.product.category}</Badge>
                        {item.product.size.length > 0 && (
                          <Badge variant="secondary">
                            {item.product.size.join(', ')}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateQuantity(item.product._id, Math.max(1, item.quantity - 1))}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.product._id, parseInt(e.target.value) || 1)}
                          className="w-16 text-center"
                          min="1"
                        />
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${(item.product.price * item.quantity).toFixed(2)}</p>
                        <p className="text-sm text-gray-500">${item.product.price} each</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.product._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>$9.99</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(calculateTotal() * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${(calculateTotal() + 9.99 + calculateTotal() * 0.08).toFixed(2)}</span>
                  </div>
                </div>
                <Button className='w-full' onClick={handlePayment} disabled={!cart?.items.length || processing}>
                  {processing ? "Processing..." : "Proceed to Checkout"}
                </Button>

                <Button variant="outline" className="w-full" onClick={clearCart}>
                  Clear Cart
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
          <Link to="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
