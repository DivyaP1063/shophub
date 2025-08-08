import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { ShoppingCart, User, Heart } from 'lucide-react';

const Header = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b  w-full ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center pl-10">
            <Link to="/" className="text-2xl font-bold text-primary">
              ShopHub
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link to="/products" className="text-gray-700 hover:text-primary">
              Products
            </Link>

            {token && user?.role && (
              <Link to={`/${user.role}/profile`} className="text-gray-700 hover:text-primary">
                Dashboard
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {user.role === 'buyer' && (
                  <>
                    <Link to="/cart">
                      <Button variant="ghost" size="icon">
                        <ShoppingCart className="h-5 w-5" />
                      </Button>
                    </Link>
                    <Link to="/wishlist">
                      <Button variant="ghost" size="icon">
                        <Heart className="h-5 w-5" />
                      </Button>
                    </Link>
                  </>
                )}

                <div className="flex items-center space-x-2">
                  {user.role && (
                    <Link to={`/${user.role}/profile`}>
                      <Button variant="ghost" size="icon">
                        <User className="h-5 w-5" />
                      </Button>
                    </Link>
                  )}
                  <span className="text-sm text-gray-700 max-md:hidden">
                    {user.name}
                  </span>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
