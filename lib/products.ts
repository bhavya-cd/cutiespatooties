export interface ProductColor {
  name: string;
  image: string;
  slug: string;
}

export interface Product {
  id: string;
  slug: string;
  brand?: string;
  title: string;
  shortDescription: string;
  description: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  rating?: number;
  ratingCount?: number;
  sizes: string[];
  availableSizes?: string[];
  images: string[];
  colors?: ProductColor[];
  whatsappMessage: string;
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'pink-halter-top',
    brand: 'Cutiespatooties',
    title: 'Pink Halter Top',
    shortDescription: 'Soft • Playful • Summer-ready',
    description: 'Soft and playful halter top, perfect for sunny days, brunches and casual outings. Made with premium cotton blend fabric for ultimate comfort.',
    price: '₹899',
    originalPrice: '₹1,499',
    discount: '40% OFF',
    rating: 4.2,
    ratingCount: 128,
    sizes: ['S', 'M', 'L', 'XL'],
    availableSizes: ['S', 'M', 'L', 'XL'],
    images: [
      '/assets/images/logo2.jpeg',
      '/assets/images/logo5.jpeg',
      '/assets/images/logo6.jpeg',
    ],
    colors: [
      { name: 'Pink', image: '/assets/images/logo2.jpeg', slug: 'pink-halter-top' },
      { name: 'Blue', image: '/assets/images/logo3.jpeg', slug: 'blue-halter-top' },
    ],
    whatsappMessage: 'Hi! I want to order the Pink Halter Top',
  },
  {
    id: '2',
    slug: 'yellow-floral-kurti',
    brand: 'Cutiespatooties',
    title: 'Yellow Floral Kurti',
    shortDescription: 'Easy • Breezy • Elegant',
    description: 'Lightweight kurti with delicate floral patterns, ideal for everyday wear or festive get-togethers. Features comfortable fit and breathable fabric.',
    price: '₹1,199',
    originalPrice: '₹1,999',
    discount: '40% OFF',
    rating: 4.5,
    ratingCount: 89,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableSizes: ['XS', 'S', 'M', 'L'],
    images: [
      '/assets/images/logo3.jpeg',
      '/assets/images/logo7.jpeg',
      '/assets/images/logo8.jpeg',
    ],
    colors: [
      { name: 'Yellow', image: '/assets/images/logo3.jpeg', slug: 'yellow-floral-kurti' },
      { name: 'Pink', image: '/assets/images/logo2.jpeg', slug: 'pink-floral-kurti' },
    ],
    whatsappMessage: 'Hi! I want to order the Yellow Floral Kurti',
  },
  {
    id: '3',
    slug: 'red-coord-set',
    brand: 'Cutiespatooties',
    title: 'Red Co-ord Set',
    shortDescription: 'Bold • Comfortable • Statement',
    description: 'Bold and comfy co-ord set that makes a statement while keeping you relaxed all day. Perfect for casual outings and weekend brunches.',
    price: '₹1,599',
    originalPrice: '₹2,499',
    discount: '36% OFF',
    rating: 4.3,
    ratingCount: 156,
    sizes: ['S', 'M', 'L'],
    availableSizes: ['S', 'M', 'L'],
    images: [
      '/assets/images/logo4.jpeg',
      '/assets/images/logo9.jpeg',
      '/assets/images/logo10.jpeg',
    ],
    colors: [
      { name: 'Red', image: '/assets/images/logo4.jpeg', slug: 'red-coord-set' },
      { name: 'Black', image: '/assets/images/logo5.jpeg', slug: 'black-coord-set' },
    ],
    whatsappMessage: 'Hi! I want to order the Red Co-ord Set',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getAllProducts(): Product[] {
  return products;
}

