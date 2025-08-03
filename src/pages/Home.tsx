
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to ShopHub
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
              Discover amazing products from sellers around the world
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Shop Now
                </Button>
              </Link>
              {!user && (
                <Link to="/register">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Join as Seller
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose ShopHub?
            </h2>
            <p className="text-lg text-gray-600">
              Experience the best of online shopping with our platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                🛍️
              </div>
              <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
              <p className="text-gray-600">
                Browse thousands of products from verified sellers
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                🚚
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable shipping to your doorstep
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                🔒
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Shopping</h3>
              <p className="text-gray-600">
                Your data and transactions are protected
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {user?.role === 'seller' ? 'Start Selling Today' : 'Ready to Start Shopping?'}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {user?.role === 'seller' 
              ? 'Add your products and reach thousands of customers'
              : 'Join millions of satisfied customers worldwide'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user?.role === 'seller' ? (
              <Link to="/seller/products">
                <Button size="lg">
                  Manage Products
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/products">
                  <Button size="lg">
                    Browse Products
                  </Button>
                </Link>
                {!user && (
                  <Link to="/register">
                    <Button size="lg" variant="outline">
                      Create Account
                    </Button>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
