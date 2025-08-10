// pages/CartPage.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCart, updateCartItem, removeCartItem } from '@/store/cartSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CartItem } from '@/types';
import { api } from '@/lib/api';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import type { Address } from '@/types/User';

// Address Modal Component
const AddressModal = ({
  open,
  address,
  setAddress,
  onClose,
  onSubmit,
  loading,
}: {
  open: boolean;
  address: Address;
  setAddress: (val: Address) => void;
  onClose: () => void;
  onSubmit: () => void;
  loading: boolean;
}) => {
  if (!open) return null;

  const handleChange = (field: keyof Address, value: string) => {
    setAddress({ ...address, [field]: value });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Enter Delivery Address</h2>

        <div className="space-y-3">
          <Input
            placeholder="House No."
            value={address.houseNo}
            onChange={e => handleChange('houseNo', e.target.value)}
          />
          <Input
            placeholder="Landmark"
            value={address.landmark}
            onChange={e => handleChange('landmark', e.target.value)}
          />
          <Input
            placeholder="Area"
            value={address.area}
            onChange={e => handleChange('area', e.target.value)}
          />
          <Input
            placeholder="District"
            value={address.district}
            onChange={e => handleChange('district', e.target.value)}
          />
          <Input
            placeholder="State"
            value={address.state}
            onChange={e => handleChange('state', e.target.value)}
          />
          <Input
            placeholder="Pincode"
            value={address.pincode}
            onChange={e => handleChange('pincode', e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            disabled={
              loading ||
              !address.houseNo.trim() ||
              !address.area.trim() ||
              !address.state.trim() ||
              !address.pincode.trim()
            }
          >
            {loading ? 'Saving...' : 'Save & Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
};

const CartPage = () => {
  const dispatch = useAppDispatch();
  const { cart, loading } = useAppSelector(state => state.cart);
  const { user, token, updateUser } = useAuth();

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [address, setAddress] = useState<Address>(
    user?.address || {
      houseNo: '',
      landmark: '',
      area: '',
      district: '',
      state: '',
      pincode: '',
    }
  );
  const [savingAddress, setSavingAddress] = useState(false);
  const [processing, setProcessing] = useState(false);
  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;

  useEffect(() => {
    if (token) {
      dispatch(fetchCart(token));
    }
  }, [dispatch, token]);

  const loadRzp = () =>
    new Promise<boolean>(resolve => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handleProceedToCheckout = () => {
    setShowAddressModal(true);
  };

  const handleAddressSubmit = async () => {
    if (!user || !token) return;
    setSavingAddress(true);
    try {
      const res = await fetch('https://shophub-backend-qebe.onrender.com/api/user/address', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, address }),
      });
      if (!res.ok) throw new Error('Failed to update address');

      updateUser({ ...user, address });

      setShowAddressModal(false);
      toast({ title: 'Address Saved', description: 'Proceeding to payment.' });
      handlePayment();
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to save address',
        variant: 'destructive',
      });
    } finally {
      setSavingAddress(false);
    }
  };

  const handlePayment = async () => {
    if (!token) {
      toast({ title: 'Unauthorized', description: 'Please login.', variant: 'destructive' });
      return;
    }
    const ok = await loadRzp();
    if (!ok) {
      toast({
        title: 'Error',
        description: 'Failed to load Razorpay SDK.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const res = await fetch('https://shophub-backend-qebe.onrender.com/api/orders/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const { order, razorpayOrder } = await res.json();
      if (!order || !razorpayOrder) throw new Error('Create order failed');

      const options = {
        key: razorpayKey,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'Your Store Name',
        description: `Order #${order._id}`,
        order_id: razorpayOrder.id,
        handler: async (resp: any) => {
          try {
            const verifyRes = await fetch(
              'https://shophub-backend-qebe.onrender.com/api/orders/verify-payment',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(resp),
              }
            );
            const { order: updatedOrder } = await verifyRes.json();
            toast({ title: 'Payment Successful', description: 'Order placed.' });
            clearCart();
          } catch {
            toast({
              title: 'Verification Failed',
              description: 'Contact support',
              variant: 'destructive',
            });
          }
        },
        prefill: {
          name: order.user.name,
          email: order.user.email,
        },
        theme: { color: '#2563eb' },
      };

      new (window as any).Razorpay(options).open();
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Something went wrong',
        variant: 'destructive',
      });
    }
  };

  const clearCart = async () => {
    if (!token) return;
    try {
      const response = await api.cart.clear(token);
      if (response.ok) {
        dispatch(fetchCart(token));
        toast({ title: 'Success', description: 'Cart cleared successfully!' });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to clear cart',
        variant: 'destructive',
      });
    }
  };

  const calculateTotal = () => {
    if (!cart?.items) return 0;
    return cart.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (!token) return;
    dispatch(updateCartItem({ productId, quantity, token }));
  };

  const removeItem = (productId: string) => {
    if (!token) return;
    dispatch(removeCartItem({ productId, token }));
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h1>
          <p className="text-gray-600 mb-6">
            You need to be logged in to view your cart.
          </p>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (loading || cart === null || !cart.items) {
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

  if (cart.items.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Your cart is empty
        </h2>
        <p className="text-gray-600 mb-6">
          Start shopping to add items to your cart
        </p>
        <Link to="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AddressModal
        open={showAddressModal}
        address={address}
        setAddress={setAddress}
        onClose={() => setShowAddressModal(false)}
        onSubmit={handleAddressSubmit}
        loading={savingAddress}
      />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-600">
          Review your items and proceed to checkout
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                    <h3 className="font-semibold text-lg">
                      {item.product.title}
                    </h3>
                    <p className="text-gray-600">
                      {item.product.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateQuantity(
                            item.product._id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={e =>
                          updateQuantity(
                            item.product._id,
                            parseInt(e.target.value) || 1
                          )
                        }
                        className="w-16 text-center"
                        min="1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateQuantity(item.product._id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        ${item.product.price} each
                      </p>
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
                  <span>
                    $
                    {(
                      calculateTotal() +
                      9.99 +
                      calculateTotal() * 0.08
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
              <Button
                className="w-full"
                onClick={handleProceedToCheckout}
                disabled={!cart?.items.length || processing}
              >
                {processing ? 'Processing...' : 'Proceed to Checkout'}
              </Button>

              <Button variant="outline" className="w-full" onClick={clearCart}>
                Clear Cart
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
