import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { api } from '@/lib/api';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

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
    if (!user || !token) {
      setShowAuthModal(true);
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

  const handleAddToWishlist = async () => {
    if (!user || !token) {
      setShowAuthModal(true);
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
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg">
            <img
              src={product.images[0] || '/placeholder.svg'}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1).map((image, index) => (
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

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>
            <div className="flex items-center mb-2">
              <span className="text-4xl font-extrabold text-primary mr-2">
                ₹{Number(product.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
              {/* Optionally, you can add a badge for offers/discounts here */}
            </div>
          </div>

          <Accordion type="multiple" className="mb-4">
            <AccordionItem value="description">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">{product.description || "No description available."}</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="features">
              <AccordionTrigger>Features</AccordionTrigger>
              <AccordionContent>
                {renderFeatures()}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="specification">
              <AccordionTrigger>Specification</AccordionTrigger>
              <AccordionContent>
                {renderSpecification()}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="availability">
              <AccordionTrigger>Availability</AccordionTrigger>
              <AccordionContent>
                <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </Badge>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="seller">
              <AccordionTrigger>Seller</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">Mythri InnovoTech Solutions Pvt Ltd</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex space-x-4">
            <Button 
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button 
              variant="outline"
              onClick={handleAddToWishlist}
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent className="max-w-sm rounded-2xl shadow-lg">
          <DialogHeader className="text-center space-y-2">
            <DialogTitle className="text-xl font-semibold">
              Welcome to <span className="text-primary">Safeguard Air</span>
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              Please choose an option to continue
            </p>
          </DialogHeader>

          <div className="mt-4 flex flex-row gap-4 justify-center items-start">
            <div className="flex flex-col items-center flex-1">
              <p className="mb-2 font-medium">Already a user?</p>
              <Button
                className="w-full"
                size="lg"
                onClick={() => {
                  setShowAuthModal(false);
                  navigate("/login");
                }}
              >
                Login
              </Button>
            </div>

            <div className="flex flex-col items-center flex-1">
              <p className="mb-2 font-medium">New here?</p>
              <Button
                className="w-full bg-white text-black border border-gray-300 font-bold"
                size="lg"
                variant="outline"
                onClick={() => {
                  setShowAuthModal(false);
                  navigate("/register");
                }}
              >
                Create Account
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetail;
