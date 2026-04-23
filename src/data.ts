
export interface Category {
  id: string;
  name: string;
  icon?: string;
  image: string;
  subcategories: string[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  category: string;
  subcategory: string;
  onSale: boolean;
  trending: boolean;
}

export const CATEGORIES: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics & Technology',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80',
    subcategories: ['Phones', 'Phone Accessories', 'Computers & Laptops', 'Computer Accessories', 'Audio', 'Video & TVs', 'Gaming', 'Smart Home / Solar', 'Street Light Lamp']
  },
  {
    id: 'fashion',
    name: 'Fashion & Apparel',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80',
    subcategories: ['Men', 'Women', 'Kids', 'Shoes', 'Bags & Accessories', 'Jewelry & Watches']
  },
  {
    id: 'home',
    name: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
    subcategories: ['Furniture', 'Home Decor', 'Kitchen & Dining', 'Bedding & Bath', 'Lighting', 'Storage & Organization']
  },
  {
    id: 'beauty',
    name: 'Health & Beauty',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80',
    subcategories: ['Skincare', 'Haircare', 'Makeup', 'Personal Care', 'Grooming', 'Wellness', 'Baby Essentials', 'Baby Gear', 'Baby, Kids & Toys']
  },
  {
    id: 'toys',
    name: 'Toys',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    subcategories: ['Educational Toys', 'Games & Puzzles', 'Sports, Fitness & Outdoors', 'Fitness Equipment']
  },
  {
    id: 'sportswear',
    name: 'Sportswear',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
    subcategories: ['Team Sports', 'Outdoor & Camping', 'Cycling', 'Automotive & Tools']
  },
  {
    id: 'car',
    name: 'Car Accessories',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&q=80',
    subcategories: ['Auto Care', 'Power Tools', 'Hand Tools', 'Phone Holders']
  },
  {
    id: 'hardware',
    name: 'Hardware',
    image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400&q=80',
    subcategories: ['Office Supplies', 'School Supplies', 'Office Furniture', 'Printers & Accessories', 'Office, School & Stationery']
  },
  {
    id: 'pets',
    name: 'Pet Supplies',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80',
    subcategories: ['Pet Food', 'Pet Toys', 'Pet Care', 'Pet Accessories']
  },
  {
    id: 'groceries',
    name: 'Groceries & Essentials',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80',
    subcategories: ['Beverages', 'Pantry Staples', 'Household Essentials', 'Snacks', 'Specialty Foods', 'Books', 'Movies', 'Music', 'Arts & Crafts', 'DIY & Hobbies']
  }
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Bluetooth Air Buds',
    price: 1999,
    originalPrice: 2999,
    rating: 4.8,
    reviewsCount: 124,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1000&auto=format&fit=crop',
    category: 'Electronics & Technology',
    subcategory: 'Audio',
    onSale: true,
    trending: true
  },
  {
    id: '2',
    name: 'Bluetooth Headphones',
    price: 1999,
    originalPrice: 2999,
    rating: 4.5,
    reviewsCount: 89,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
    category: 'Electronics & Technology',
    subcategory: 'Audio',
    onSale: true,
    trending: true
  },
  {
    id: '3',
    name: 'Premium Books Collection',
    price: 1.90,
    originalPrice: 2.99,
    rating: 4.9,
    reviewsCount: 56,
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1000&auto=format&fit=crop',
    category: 'Groceries & Essentials',
    subcategory: 'Books',
    onSale: true,
    trending: true
  },
  {
    id: '4',
    name: 'Advanced Cars Tools Set',
    price: 1999,
    originalPrice: 2999,
    rating: 4.7,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=1000&auto=format&fit=crop',
    category: 'Car Accessories',
    subcategory: 'Hand Tools',
    onSale: true,
    trending: true
  },
  {
    id: '5',
    name: 'Electric Face Shaver',
    price: 1999,
    originalPrice: 2999,
    rating: 4.6,
    reviewsCount: 231,
    image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?q=80&w=1000&auto=format&fit=crop',
    category: 'Health & Beauty',
    subcategory: 'Grooming',
    onSale: true,
    trending: true
  },
  {
    id: '6',
    name: 'Modern Home Furniture',
    price: 1999,
    originalPrice: 2999,
    rating: 4.8,
    reviewsCount: 15,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop',
    category: 'Home & Living',
    subcategory: 'Furniture',
    onSale: true,
    trending: true
  },
  {
    id: '7',
    name: 'Pro Gaming Console Toys',
    price: 1999,
    originalPrice: 2999,
    rating: 4.9,
    reviewsCount: 1205,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop',
    category: 'Toys',
    subcategory: 'Games & Puzzles',
    onSale: true,
    trending: true
  },
  {
    id: '8',
    name: "Glowic Men's Hoodie (Oversized)",
    price: 599,
    originalPrice: 1999,
    rating: 4.4,
    reviewsCount: 442,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop',
    category: 'Fashion & Apparel',
    subcategory: 'Men',
    onSale: true,
    trending: true
  },
  {
    id: '9',
    name: 'Professional DSLR Camera',
    price: 2499,
    originalPrice: 2999,
    rating: 4.8,
    reviewsCount: 78,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop',
    category: 'Electronics & Technology',
    subcategory: 'Video & TVs',
    onSale: true,
    trending: false
  },
  {
    id: '10',
    name: 'Smart Watch Series X',
    price: 399,
    originalPrice: 499,
    rating: 4.7,
    reviewsCount: 312,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
    category: 'Electronics & Technology',
    subcategory: 'Phone Accessories',
    onSale: true,
    trending: false
  }
];
