
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, AirVentIcon as Air, Zap, Wifi, ChevronRight, Truck, CreditCard, CheckCircle, Leaf, Wind, Heart, Users, Award } from 'lucide-react'
import Img from "../assets/productImg.png"
import { Link} from 'react-router-dom';

export default function SafeGuardAirEcommerce() {
  return (
    <div className="min-h-screen max-w-7xl mx-auto  bg-background text-foreground">


      {/* Hero Section */}
      <section className="py-10">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge>
                  <Leaf className="w-4 h-4 mr-2" />
                  Advanced Air Purification Technology
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Know what you Breathe
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Professional-grade air quality monitoring and purification technology that ensures every breath you take is clean, safe, and healthy.
                </p>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>EPA Certified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4" />
                  <span>Award Winning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>50K+ Users</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg">
                  Explore Products
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Watch Demo
                  <Wind className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Guarantee Badges */}
              <div className="flex items-center space-x-6 text-sm text-muted-foreground pt-4">
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>2-Year Warranty</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span>30-Day Returns</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end rounded-lg">
              <img
                src={Img}
                alt="SafeGuard Air Professional Air Quality Monitor"
                width={500}
                height={500}
                className="max-w-full h-auto rounded-lg"

              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="technology" className="py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="secondary">
              <Wind className="w-4 h-4 mr-2" />
              Clean Air Technology
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Why Choose SafeGuard Air?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our advanced multi-stage filtration system combines cutting-edge technology with intelligent monitoring 
              to deliver hospital-grade air quality for your environment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <Air className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Real-time Monitoring</h3>
                <p className="text-muted-foreground">
                  Advanced sensors continuously monitor air quality with laboratory-grade precision, providing instant alerts and detailed analytics.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <Leaf className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">HEPA Filtration</h3>
                <p className="text-muted-foreground">
                  Medical-grade H13 HEPA filter captures 99.97% of particles as small as 0.3 microns, including viruses and bacteria.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <Wifi className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Smart Integration</h3>
                <p className="text-muted-foreground">
                  Seamlessly connects to your smart home ecosystem with WiFi 6, mobile app control, and cloud-based analytics.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Energy Efficient</h3>
                <p className="text-muted-foreground">
                  Ultra-low power consumption with smart sleep modes and eco-friendly operation that reduces your carbon footprint.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Health Protection</h3>
                <p className="text-muted-foreground">
                  Comprehensive health monitoring with personalized recommendations and instant alerts for sensitive individuals.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Professional Support</h3>
                <p className="text-muted-foreground">
                  24/7 customer support, professional installation services, and comprehensive warranty coverage.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8">
            <Badge>
              <Leaf className="w-4 h-4 mr-2" />
              Start Your Clean Air Journey
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Ready to Breathe Cleaner Air?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the perfect SafeGuard Air solution for your space. Professional-grade air purification technology 
              with intelligent monitoring and comprehensive support.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Shop Products
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Contact Sales
                <Wind className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
