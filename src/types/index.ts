export type Category = 'Outerwear' | 'Tailoring' | 'Dresses & Silks' | 'Knitwear' | 'Accessories';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subheading: string;
  category: Category;
  collectionSlug: string;
  price: number; // in INR
  originalPrice?: number;
  description: string;
  editorialNote: string;
  details: string[];
  care: string[];
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  material: string;
  fit: string;
  dimensions?: string;
  madeIn: string;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  season: string;
  concept: string;
  heroImage: string;
  editorialQuote: string;
  productIds: string[];
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  kicker: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  heroImage: string;
  content: {
    sectionHeading?: string;
    paragraph: string;
    pullQuote?: string;
  }[];
  relatedProductSlugs?: string[];
}

export interface CartItem {
  id: string; // unique item composite key (productId + size + color)
  product: Product;
  selectedSize: string;
  selectedColor: ProductColor;
  quantity: number;
}
