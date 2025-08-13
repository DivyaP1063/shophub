import React, { useEffect, useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import { Search, Filter, Grid, List } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts } from '@/store/productsSlice';

const Products = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector(state => state.products);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filtering and sorting in-memory
  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // Price filter
    if (priceFilter !== 'all') {
      filtered = filtered.filter(p => {
        const price = p.price;
        if (priceFilter === '0-50') return price < 50;
        if (priceFilter === '50-100') return price >= 50 && price < 100;
        if (priceFilter === '100-200') return price >= 100 && price < 200;
        if (priceFilter === '200-500') return price >= 200 && price < 500;
        if (priceFilter === '500+') return price >= 500;
        return true;
      });
    }
    // Sorting
    if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);
    // Add more sort logic as needed
    return filtered;
  }, [products, searchTerm, priceFilter, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setPriceFilter('all');
    setSortBy('latest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">SafeGuard Devices</h1>
        <p className="text-gray-600">Discover the latest devices</p>
        
        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="0-50">Under $50</SelectItem>
                <SelectItem value="50-100">$50 - $100</SelectItem>
                <SelectItem value="100-200">$100 - $200</SelectItem>
                <SelectItem value="200-500">$200 - $500</SelectItem>
                <SelectItem value="500+">$500+</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Best Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={clearFilters} size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
              {(priceFilter !== 'all') && (
                <Badge variant="secondary">
                  {[priceFilter].filter(f => f !== 'all').length} filters applied
                </Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">View:</span>
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      {loading ? (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          : "space-y-4"
        }>
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-80"></div>
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          : "space-y-4"
        }>
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} viewMode={viewMode} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🛡️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-500 text-lg mb-6">Try adjusting your filters or search terms</p>
          <Button onClick={clearFilters} variant="outline" className="mr-4">
            Clear Filters
          </Button>
          <Button onClick={() => setSearchTerm('')}>
            Browse All Items
          </Button>
        </div>
      )}
    </div>
  );
};

export default Products;
