
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wishlist, Product } from '@/types';
import { api } from '@/lib/api';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const WishlistPage = () => {
  const { user, token } = useAuth();
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && token) {
      fetchWishlist();
    }
  }, [user, token]);

  const fetchWishlist = async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      const response = await api.wishlist.get(token);
      if (response.ok) {
        const data = await response.json();
        setWishlist(data);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!token) return;

    try {
      const response = await api.wishlist.remove(productId, token);
      if (response.ok) {
        fetchWishlist();
        toast({
          title: "Success",
          description: "Item removed from wishlist!",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item from wishlist",
        variant: "destructive",
      });
    }
  };

  const addToCart = async (product: Product) => {
    if (!token) return;

    try {
      const response = await api.cart.add({ product: product._id, quantity: 1 }, token);
      if (response.ok) {
        toast({
          title: "Success",
          description: "Product added to cart!",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product to cart",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h1>
          <p className="text-gray-600 mb-6">You need to be logged in to view your wishlist.</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-80"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
        <p className="text-gray-600">Save your favorite items for later</p>
      </div>

      {wishlist?.products && wishlist.products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.products.map((product: Product) => (
            <Card key={product._id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={product.images[0] || '/placeholder.svg'}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => removeFromWishlist(product._id)}
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1 line-clamp-2">{product.title}</h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                <p className="text-lg font-bold text-primary mb-3">${product.price}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline">{product.category}</Badge>
                  <span className="text-xs text-gray-500">Stock: {product.stock}</span>
                </div>

                {product.size.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-600 mb-1">Available sizes:</p>
                    <div className="flex gap-1">
                      {product.size.map((size) => (
                        <span key={size} className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Link to={`/products/${product._id}`} className="flex-1">
                    <Button variant="outline" className="w-full" size="sm">
                      View Details
                    </Button>
                  </Link>
                  
                  <Button 
                    onClick={() => addToCart(product)} 
                    size="sm" 
                    className="flex-1"
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">Save items you love to your wishlist</p>
          <Link to="/products">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
