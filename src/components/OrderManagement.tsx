import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';

interface Order {
  _id: string;
  user: string;
  totalAmount: number;
  status: string;
  createdAt: string;
}

interface OrderManagementProps {
  userRole: string;
  token: string;
}

const OrderManagement: React.FC<OrderManagementProps> = ({ userRole, token }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async (userRole: string, token: string): Promise<Order[]> => {
    try {
      const endpoint = userRole === "seller" ? "http://localhost:5000/api/orders/seller" : "http://localhost:5000/api/orders/user";
  
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
  
      const data = await response.json();
      console.log(data);
      return data; // This is directly the array of orders
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  };

  // const updateOrderStatus = async (orderId: string, newStatus: string) => {
  //   // implement order status update logic here (e.g., PATCH request)
  //   console.log(`Update order ${orderId} to ${newStatus}`);
  // };

  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case "paid": return "bg-green-100 text-green-800";
  //     case "shipped": return "bg-yellow-100 text-yellow-800";
  //     case "delivered": return "bg-blue-100 text-blue-800";
  //     default: return "bg-gray-100 text-gray-800";
  //   }
  // };

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await fetchOrders(userRole, token);
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, [userRole, token]);

  if (loading) return <p>Loading orders...</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Management</CardTitle>
      </CardHeader>
      <CardContent>
        {orders.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="font-mono">#{order._id}</TableCell>
                  {userRole=='seller'?(
                                      <TableCell>  {order.user.name}
                                      </TableCell>
                  ):(
                  <TableCell>  {order.items.map((item, index) => (
                    <span key={index}>
                      {item.product?.seller?.name || "Unknown"}
                      {index < order.items.length - 1 && ", "}
                    </span>
                  ))}</TableCell>
                  )}
                  
                  <TableCell>₹{order.totalAmount}</TableCell>

                  <TableCell>
                    
                    {new Date(order.createdAt).toLocaleDateString('en-GB')}
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No orders found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderManagement;
