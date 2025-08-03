import { DashboardLayout } from '@/components/DashboardLayout';
import { CardDescription } from '@/components/ui/card';
import { Edit, Trash2, Eye, DollarSign } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Product, Order } from '@/types';
import { api } from '@/lib/api';
import { Plus, Package, ShoppingBag, TrendingUp } from 'lucide-react';
import ProductManagement from '@/components/ProductManagement';
import { Link } from 'react-router-dom';



const SellerProducts = () => {
    const { user, token } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);

    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
      pendingOrders: 0
    });
  
    useEffect(() => {
      if (user?.role === 'seller' && token) {
        fetchSellerData();
      }
    }, [user, token]);
  
    const fetchSellerData = async () => {
      setLoading(true);
      try {
        // Fetch seller's products
        const productsResponse = await api.products.getAll('seller=' + user?._id);
        if (productsResponse.ok) {
          const productsData = await productsResponse.json();
          setProducts(productsData.products || productsData);
          setStats(prev => ({ ...prev, totalProducts: (productsData.products || productsData).length }));
        }
  
        // Fetch seller's orders (would need backend endpoint)
        // For now, we'll use placeholder data
        setStats(prev => ({ 
          ...prev, 
          totalOrders: 25,
          totalRevenue: 15750,
          pendingOrders: 3
        }));
      } catch (error) {
        console.error('Error fetching seller data:', error);
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

  return (
    <DashboardLayout userRole="seller">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-muted-foreground">Manage your product inventory</p>
          </div>
          <Link to="/seller/products/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
          </Link>
          
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Products</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>

          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
              <Trash2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {products.filter(p => p.stock < 15).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>

          </Card>
        </div>

<Tabs defaultValue="products" className="space-y-6">
        <div className="flex items-center justify-between">

          
          <Link to="/seller/products/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>

        <TabsContent value="products">
          <ProductManagement products={products} onRefresh={fetchSellerData} />
        </TabsContent>


      </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SellerProducts;