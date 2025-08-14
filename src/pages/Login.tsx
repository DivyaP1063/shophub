import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password); // Only use AuthContext login
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

    const googleLogin = useGoogleLogin({
    onSuccess: async (credentialResponse:any) => {
      try {
        await login('', credentialResponse.credential, true);
        navigate('/');
      } catch (error) {
        console.error('Google login error:', error);
      }
    },
    onError: () => console.log('Google Login Failed'),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Sign in to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          {/* Professional separator */}
          <div className="my-6 flex items-center">
            <div className="flex-grow h-px bg-gray-200" />
            <span className="mx-4 text-gray-500 font-medium">or</span>
            <div className="flex-grow h-px bg-gray-200" />
          </div>

          <Button
            type="button"
            onClick={() => googleLogin()}
            className="w-full  hover:bg-blue-600 hover:text-white text-black bg-gray-300/50 font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 533.5 544.3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#4285f4"
                d="M533.5 278.4c0-17.4-1.5-34.1-4.3-50.4H272v95.4h147c-6.4 34.4-25 63.5-53.6 83v68h86.5c50.5-46.6 81.6-115.2 81.6-196z"
              />
              <path
                fill="#34a853"
                d="M272 544.3c72.6 0 133.5-24 178-65.2l-86.5-68c-23.9 16-54.4 25.4-91.5 25.4-70.4 0-130-47.6-151.3-111.5H33.8v69.8c44.3 87.8 136.3 149.5 238.2 149.5z"
              />
              <path
                fill="#fbbc04"
                d="M120.7 324c-10.5-31.4-10.5-65.6 0-97l-86.9-69.8c-37.6 74.8-37.6 161.8 0 236.6l86.9-69.8z"
              />
              <path
                fill="#ea4335"
                d="M272 107.6c39.5 0 75.1 13.6 103.2 40.2l77.4-77.4C405.5 24 344.6 0 272 0 170.1 0 78.1 61.7 33.8 149.5l86.9 69.8C142 155.2 201.6 107.6 272 107.6z"
              />
            </svg>
            Sign in with Google
          </Button>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-primary hover:underline">
                Sign up
              </Link>
              {' '}Or An Admin?{' '}
              <Link to="/Admin" className="font-medium text-primary hover:underline">
                Admin
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
