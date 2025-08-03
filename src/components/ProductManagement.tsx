
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Product } from '@/types';
import { Edit, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { deleteProduct } from '@/store/slices/productsSlice';
import { toast } from '@/hooks/use-toast';

interface ProductManagementProps {
  products: Product[];
  onRefresh: () => void;
}

const ProductManagement: React.FC<ProductManagementProps> = ({ products, onRefresh }) => {
  const { token } = useAuth();
  const dispatch = useAppDispatch();

  const handleDelete = async (productId: string) => {
    console.log('Delete button clicked for product:', productId);
    console.log('Token available:', !!token);
    
    if (!token) {
      toast({
        title: "Error",
        description: "You must be logged in to delete products",
        variant: "destructive",
      });
      return;
    }

    if (window.confirm('Are you sure you want to delete this product?')) {
      console.log('User confirmed deletion');
      try {
        console.log('Dispatching deleteProduct action...');
        await dispatch(deleteProduct({ id: productId, token })).unwrap();
        console.log('Product deleted successfully');
        toast({
          title: "Success",
          description: "Product deleted successfully",
        });
        onRefresh();
      } catch (error) {
        console.error('Error deleting product:', error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : 'Failed to delete product',
          variant: "destructive",
        });
      }
    } else {
      console.log('User cancelled deletion');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Management</CardTitle>
      </CardHeader>
      <CardContent>
        {products.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.images[0] || '/placeholder.svg'}
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{product.title}</p>
                        <p className="text-sm text-gray-500">
                          Sizes: {product.size.join(', ')}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={product.stock > 0 ? "default" : "destructive"}
                    >
                      {product.stock} items
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={product.stock > 0 ? "default" : "secondary"}
                    >
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link to={`/products/${product._id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link to={`/seller/products/${product._id}/edit`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(product._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No products found</p>
            <Link to="/seller/products/new">
              <Button>Add Your First Product</Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductManagement;