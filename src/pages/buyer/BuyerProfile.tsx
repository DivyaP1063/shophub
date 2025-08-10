import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const BuyerProfile = () => {
  const { user, token, updateUser } = useAuth();


  const [profile, setProfile] = useState({
    Fullname: user?.name || '',
    email: user?.email || '',
    phone: '+91 (555) 123-4567',
    houseNo: user?.address?.houseNo || '',
    landmark: user?.address?.landmark || '',
    area: user?.address?.area || '',
    district: user?.address?.district || '',
    state: user?.address?.state || '',
    pincode: user?.address?.pincode || '',
  });

  useEffect(() => {
    if (user) {
      setProfile({
        Fullname: user?.name || '',
        email: user?.email || '',
        phone: '+91 (555) 123-4567',
        houseNo: user?.address?.houseNo || '',
        landmark: user?.address?.landmark || '',
        area: user?.address?.area || '',
        district: user?.address?.district || '',
        state: user?.address?.state || '',
        pincode: user?.address?.pincode || '',
      });
    }
  }, [user]);

  if (!user) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

const handleSave = async () => {
  try {
    const res = await fetch('https://shophub-backend-qebe.onrender.com/api/user/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: user._id,
        name: profile.Fullname,
        email: profile.email,
        address: {
          houseNo: profile.houseNo,
          landmark: profile.landmark,
          area: profile.area,
          district: profile.district,
          state: profile.state,
          pincode: profile.pincode,
        },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast({
        title: 'Error',
        description: data.message || 'Failed to update profile',
        variant: 'destructive',
      });
      return;
    }

    // ✅ Update context and localStorage with new user data
    updateUser(data.user);

    toast({
      title: 'Success',
      description: 'Profile updated successfully!',
    });
  } catch (err) {
    console.error('Error saving profile:', err);
    toast({
      title: 'Error',
      description: 'Failed to save profile',
      variant: 'destructive',
    });
  }
};

  return (
<DashboardLayout userRole="buyer">
  <div className="px-6 pb-6 space-y-6">
    <div>
      <p className="text-muted-foreground">Manage your profile information</p>
    </div>

    {/* Personal Information Form */}
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={profile.Fullname}
              onChange={(e) => setProfile({ ...profile, Fullname: e.target.value })}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
          </div>
        </div>

        {/* Address (inside same container) */}
        <div className="p-4 border rounded-md space-y-4">
          <h3 className="font-semibold">Address Details</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {['houseNo', 'landmark', 'area', 'district', 'state', 'pincode'].map((field) => (
              <div key={field} className="space-y-2">
                <Label htmlFor={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Label>
                <Input
                  id={field}
                  type={field === 'pincode' ? 'number' : 'text'}
                  value={profile[field]}
                  onChange={(e) => setProfile({ ...profile, [field]: e.target.value })}
                />
              </div>
            ))}
          </div>
        </div>

        <Button className="mt-4" onClick={handleSave}>
          Save Changes
        </Button>
      </CardContent>
    </Card>
  </div>
</DashboardLayout>

  );
};

export default BuyerProfile;
