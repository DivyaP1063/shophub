import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAppDispatch } from '@/store/hooks';
import { openAuthModal } from '@/store/authModalSlice';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { api } from '@/lib/api';
import { toast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    if (!id) return;
    
    try {
      const response = await api.products.getById(id);
      const productData = await response.json();
      
      if (response.ok) {
        setProduct(productData);
      } else {
        toast({
          title: "Error",
          description: "Product not found",
          variant: "destructive",
        });
        navigate('/products');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch product details",
        variant: "destructive",
      });
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    // If not logged in, open auth modal
    if (!user || !token) {
      dispatch(openAuthModal());
      return;
    }

    // If logged in but not a buyer, show error
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

  const handleAddToWishlist = async () => {
    // If not logged in, open auth modal
    if (!user || !token) {
      dispatch(openAuthModal());
      return;
    }

    // If logged in but not a buyer, show error
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

  // Helper function to render features/specification if present
  const renderFeatures = () =>
    product?.features && product.features.length > 0 ? (
      <ul className="list-disc ml-6 text-gray-700 mb-2">
        {product.features.map((feature, idx) => (
          <li key={idx}>{feature}</li>
        ))}
      </ul>
    ) : <span className="text-gray-400">No features listed.</span>;

  const renderSpecification = () =>
    product?.specification ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        {Object.entries(product.specification).map(([key, value]) =>
          value ? (
            <div key={key}>
              <span className="font-medium">{key}:</span>
              <div className="whitespace-pre-line text-sm mt-1">{value}</div>
            </div>
          ) : null
        )}
      </div>
    ) : <span className="text-gray-400">No specification available.</span>;

  // Show cart/wishlist buttons for: not logged in OR logged in buyers (but not sellers)
  const showCartButtons = !user || user.role === 'buyer';

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images - Fixed height container */}
        <div className="flex flex-col h-[600px]">
          <div className="flex-1 overflow-hidden rounded-lg ">
            <img
              src={product.images[0] || '/placeholder.svg'}
              alt={product.title}
              className="w-full h-full object-fill"
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 h-20">
              {product.images.slice(1, 5).map((image, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded">
                  <img
                    src={image}
                    alt={`${product.title} ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info - Matching height container */}
        <div className="flex flex-col h-[600px]">
          {/* Product Title and Price */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>
            <div className="flex items-center">
              <span className="text-4xl font-extrabold text-primary">
                ₹{Number(product.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 bg-white rounded-lg shadow border p-4 overflow-y-auto mb-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600 mb-4">{product.description || "No description available."}</p>

            <h3 className="text-lg font-semibold mb-2">Features</h3>
            {renderFeatures()}

            <h3 className="text-lg font-semibold mb-2">Specification</h3>
            {renderSpecification()}

            <h3 className="text-lg font-semibold mb-2">Availability</h3>
            <Badge variant={product.stock > 0 ? "default" : "destructive"} className="mb-4">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </Badge>

            <h3 className="text-lg font-semibold mb-2">Seller</h3>
            <p className="text-gray-600">Mythri InnovoTech Solutions Pvt Ltd</p>
          </div>

          {/* Fixed Action Buttons at Bottom */}
          {showCartButtons && (
            <div className="flex space-x-4">
              <Button 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1"
                size="lg"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button 
                variant="outline"
                onClick={handleAddToWishlist}
                size="lg"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
