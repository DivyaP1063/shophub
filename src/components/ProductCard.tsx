
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import { toast } from '@/hooks/use-toast';
import { ShoppingCart, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode = 'grid' }) => {
  const { user, token } = useAuth();

  const addToCart = async () => {
    if (!user || !token) {
      toast({
        title: "Error",
        description: "Please login to add items to cart",
        variant: "destructive",
      });
      return;
    }

    if (user.role !== 'buyer') {
      toast({
        title: "Error",
        description: "Only buyers can add items to cart",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await api.cart.add({ product: product._id, quantity: 1 }, token);
      if (response.ok) {
        toast({
          title: "Success",
          description: "Product added to cart!",
        });
      } else {
        throw new Error('Failed to add to cart');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product to cart",
        variant: "destructive",
      });
    }
  };

  const addToWishlist = async () => {
    if (!user || !token) {
      toast({
        title: "Error",
        description: "Please login to add items to wishlist",
        variant: "destructive",
      });
      return;
    }

    if (user.role !== 'buyer') {
      toast({
        title: "Error",
        description: "Only buyers can add items to wishlist",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await api.wishlist.add({ product: product._id }, token);
      if (response.ok) {
        toast({
          title: "Success",
          description: "Product added to wishlist!",
        });
      } else {
        throw new Error('Failed to add to wishlist');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product to wishlist",
        variant: "destructive",
      });
    }
  };

  if (viewMode === 'list') {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center space-x-6">
            <div className="w-32 h-32 flex-shrink-0">
              <img
                src={product.images[0] || '/placeholder.svg'}
                alt={product.title}
                className="w-full h-full object-cover rounded"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-xl mb-2">{product.title}</h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center space-x-3 mb-3">
                    <Badge variant="outline">{product.category}</Badge>
                    <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                  </div>

                  {product.size.length > 0 && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-600 mb-1">Available sizes:</p>
                      <div className="flex gap-1">
                        {product.size.slice(0, 4).map((size) => (
                          <Badge key={size} variant="secondary" className="text-xs">
                            {size}
                          </Badge>
                        ))}
                        {product.size.length > 4 && (
                          <Badge variant="secondary" className="text-xs">
                            +{product.size.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary mb-4">${product.price}</p>
                  
                  <div className="flex flex-col space-y-2">
                    <Link to={`/products/${product._id}`}>
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                    
                    {user?.role === 'buyer' && (
                      <div className="flex space-x-2">
                        <Button onClick={addToCart} className="flex-1">
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Add to Cart
                        </Button>
                        <Button onClick={addToWishlist} variant="outline" size="icon">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="aspect-square overflow-hidden relative">
        <img
          src={product.images[0] || '/placeholder.svg'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {user?.role === 'buyer' && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={addToWishlist}
          >
            <Heart className="h-4 w-4" />
          </Button>
        )}
        {product.stock < 10 && (
          <Badge className="absolute top-2 left-2 bg-red-600">
            Only {product.stock} left
          </Badge>
        )}
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
            <div className="flex gap-1 flex-wrap">
              {product.size.slice(0, 3).map((size) => (
                <Badge key={size} variant="secondary" className="text-xs">
                  {size}
                </Badge>
              ))}
              {product.size.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{product.size.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Link to={`/products/${product._id}`} className="flex-1">
            <Button variant="outline" className="w-full" size="sm">
              View Details
            </Button>
          </Link>
          
          {user?.role === 'buyer' && (
            <Button onClick={addToCart} size="sm" className="flex-1">
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Cart
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
