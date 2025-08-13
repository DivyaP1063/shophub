import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { updateProduct } from '@/store/slices/productsSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Upload } from 'lucide-react';
import { api } from '@/lib/api';
import { Product } from '@/types';

const defaultSpecification = {
  Generic: '',
  ParticulateMatter: '',
  VOC: '',
  Humidity: '',
  Temperature: '',
};

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    stock: '',
    features: [''],
    specification: { ...defaultSpecification },
  });
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    if (id && token) {
      fetchProduct();
    }
    // eslint-disable-next-line
  }, [id, token]);

  const fetchProduct = async () => {
    if (!id) return;

    try {
      const response = await api.products.getById(id);
      const productData = await response.json();

      if (response.ok) {
        setProduct(productData);
        setFormData({
          title: productData.title,
          description: productData.description || '',
          price: productData.price.toString(),
          stock: productData.stock.toString(),
          features: productData.features && Array.isArray(productData.features) && productData.features.length > 0
            ? productData.features
            : [''],
          specification: productData.specification
            ? { ...defaultSpecification, ...productData.specification }
            : { ...defaultSpecification },
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch product details",
          variant: "destructive",
        });
        navigate('//seller/products');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch product details",
        variant: "destructive",
      });
      navigate('/s/seller/products');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    setFormData(prev => {
      const updatedFeatures = [...prev.features];
      updatedFeatures[index] = value;
      return { ...prev, features: updatedFeatures };
    });
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, ''],
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => {
      const updatedFeatures = prev.features.filter((_, i) => i !== index);
      return { ...prev, features: updatedFeatures };
    });
  };

  const handleSpecChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      specification: { ...prev.specification, [field]: value },
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token || user?.role !== 'seller' || !id) {
      toast({
        title: "Error",
        description: "You must be logged in as a seller to edit products",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const productFormData = new FormData();
      productFormData.append('title', formData.title);
      productFormData.append('description', formData.description);
      productFormData.append('price', formData.price);
      productFormData.append('stock', formData.stock);

      // Features
      formData.features.forEach(feature => {
        if (feature.trim()) productFormData.append('features', feature);
      });

      // Specification
      Object.entries(formData.specification).forEach(([key, value]) => {
        productFormData.append(`specification[${key}]`, value);
      });

      if (images.length > 0) {
        images.forEach(image => {
          productFormData.append('images', image);
        });
      }

      await dispatch(updateProduct({ id, productData: productFormData, token })).unwrap();

      toast({
        title: "Success",
        description: "Product updated successfully!",
      });

      navigate('/seller/products');
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to update product',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'seller') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">This page is only accessible to sellers.</p>
        </div>
      </div>
    );
  }

  if (fetchLoading) {
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/seller/products')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Product</h1>
        <p className="text-gray-600">Update your product details.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Product Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter product title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter product description"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => handleInputChange('stock', e.target.value)}
                  placeholder="0"
                  required
                />
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2">
              <Label>Features</Label>
              {formData.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-2">
                  <Input
                    value={feature}
                    onChange={e => handleFeatureChange(idx, e.target.value)}
                    placeholder={`Feature ${idx + 1}`}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeFeature(idx)}
                    disabled={formData.features.length === 1}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" size="sm" onClick={addFeature}>
                Add Feature
              </Button>
            </div>

            {/* Specification */}
            <div className="space-y-2">
              <Label>Specification</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(defaultSpecification).map((key) => (
                  <div key={key} className="space-y-1">
                    <Label htmlFor={`spec-${key}`}>{key}</Label>
                    <Textarea
                      id={`spec-${key}`}
                      value={formData.specification[key]}
                      onChange={e => handleSpecChange(key, e.target.value)}
                      placeholder={`Enter ${key} specification`}
                      rows={2}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Current Images</Label>
              {product.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {product.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="w-full h-24 object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
              )}

              <Label htmlFor="images">Upload New Images (Optional)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <Label htmlFor="images" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        Upload new images
                      </span>
                      <span className="mt-1 block text-sm text-gray-500">
                        PNG, JPG, GIF up to 10MB each (will replace current images)
                      </span>
                    </Label>
                    <Input
                      id="images"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
              {images.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    {images.length} new image(s) selected
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/seller/products')}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Update Product'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProduct;