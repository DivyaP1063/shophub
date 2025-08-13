import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {  Camera,  Mail, Phone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const SellerProfile = () => {
  const { user,token } = useAuth();
  const [profile, setProfile] = useState({
    Fullname: user.name,
    email: user.email,
    phone: '+91 (555) 123-4567',

  });

  const handleSave = () => {
    console.log('Saving profile:', profile);

  };

  return (
    <DashboardLayout userRole="seller">
      
      <div className="p-6 space-y-6 ">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your Admin profile and store information</p>
        </div>

        <div className="grid gap-6 md:grid-cols-1">

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
                    onChange={(e) => setProfile({...profile, Fullname: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  />
                </div>

              </div>
   
            </CardContent>
          </Card>


        </div>
      </div>
    </DashboardLayout>
  );
};

export default SellerProfile;