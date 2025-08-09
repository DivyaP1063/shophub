import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Camera, Mail, Phone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const BuyerProfile = () => {
  const { user, token } = useAuth();

  // Guard: Wait for user to load
  if (!user) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  const [profile, setProfile] = useState({
    Fullname: user.name || "",
    email: user.email || "",
    phone: '+91 (555) 123-4567',
    address: user.address || '',
  });

  // Update profile state if user changes (e.g. after login or reload)
  useEffect(() => {
    setProfile({
      Fullname: user.name || "",
      email: user.email || "",
      phone: '+91 (555) 123-4567',
      address: user.address || '',
    });
  }, [user]);

  const handleSave = () => {
    // Implement save logic here (e.g. API call)
    console.log('Saving profile:', profile);
  };

  return (
    <DashboardLayout userRole="buyer">
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your buyer profile and store information</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>Update your profile image</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-lg">
                    {profile.Fullname ? profile.Fullname[0] : "U"}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Change Photo
                </Button>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{profile.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{profile.phone}</span>
                </div>
              </div>
              <Badge variant="secondary" className="w-full justify-center">
                Verified Seller
              </Badge>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.Fullname}
                    onChange={(e) => setProfile({ ...profile, Fullname: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <textarea
                    id="address"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    placeholder={user.address ? user.address : "Add address"}
                  />
                </div>
              </div>
              <Button className="mt-4" onClick={handleSave}>
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BuyerProfile;