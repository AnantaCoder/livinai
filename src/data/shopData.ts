// src/data/shopData.ts

import shopHero from "@/assets/shop-hero.jpg";
import victorianImg from "@/assets/style-victorian.jpg";
import industrialImg from "@/assets/style-industrial.jpg";
import retroImg from "@/assets/style-retro.jpg";
import minimalImg from "@/assets/style-minimal.jpg";
import coffeeImg from "@/assets/life-coffee.jpg";
import wfhImg from "@/assets/life-wfh.jpg";
import balconyImg from "@/assets/life-balcony.jpg";

// Assets helper to use text-based keys if needed, or just export directly
export const shopAssets = {
  shopHero,
  victorianImg,
  industrialImg,
  retroImg,
  minimalImg,
  coffeeImg,
  wfhImg,
  balconyImg,
};

// Types
export interface Product {
  id: number | string;
  name: string;
  price: string;
  image: any;
  desc: string;
  rating?: number;
  reviews?: number;
  features?: string[];
}

// ----------------------------------------------------------------------
// 1. Categories & Mock Products
// ----------------------------------------------------------------------

// Fallback products used in ShopCategory
export const defaultProducts: Product[] = [
  {
    id: 1,
    name: "Velvet Chesterfield Sofa",
    price: "45,999",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    desc: "A timeless classic with deep button tufting.",
  },
  {
    id: 2,
    name: "Industrial Coffee Table",
    price: "12,499",
    image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80",
    desc: "Rugged metal frame with reclaimed wood top.",
  },
  {
    id: 3,
    name: "Retro Armchair",
    price: "8,299",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80",
    desc: "Mid-century modern design with tapered legs.",
  },
  {
    id: 4,
    name: "Minimalist Desk",
    price: "6,999",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80",
    desc: "Clean lines and functional storage for modern workspaces.",
  },
];

export const categoryData: Record<string, Product[]> = {
  "victorian-charm": [
    {
      id: 101,
      name: "Victorian Velvet Sofa",
      price: "3,999",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      desc: "Elegant Victorian sofa with plush velvet upholstery and carved wooden legs.",
    },
    {
      id: 102,
      name: "Carved Wood Armchair",
      price: "5,499",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
      desc: "Hand-carved wooden armchair with intricate Victorian details and rich finish.",
    },
    {
      id: 103,
      name: "Antique Oak Coffee Table",
      price: "8,999",
      image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80",
      desc: "Solid oak table with a timeless antique finish and ornate carvings.",
    },
    {
      id: 104,
      name: "Floral Tapestry Chaise",
      price: "12,500",
      image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80",
      desc: "Classic chaise lounge with floral tapestry upholstery and tufted details.",
    },
    {
      id: 105,
      name: "Victorian Dining Chair Set",
      price: "18,999",
      image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=800&q=80",
      desc: "Set of 4 elegant dining chairs with velvet cushions and carved backs.",
    },
    {
      id: 106,
      name: "Ornate Mirror Frame",
      price: "6,500",
      image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80",
      desc: "Gilded Victorian mirror with intricate baroque-style frame.",
    },
  ],
  "industrial-edge": [
    {
      id: 201,
      name: "Industrial Marble Countertop",
      price: "9,999",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      desc: "Premium marble countertop with natural veining and industrial metal edge trim.",
    },
    {
      id: 202,
      name: "Concrete Vessel Sink",
      price: "14,999",
      image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80",
      desc: "Handcrafted concrete sink with raw industrial finish and modern design.",
    },
    {
      id: 203,
      name: "Pipe Leg Side Table",
      price: "4,200",
      image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80",
      desc: "Unique side table featuring industrial pipe legs and wood top.",
    },
    {
      id: 204,
      name: "Concrete Top Dining Table",
      price: "22,000",
      image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
      desc: "Modern dining table with a durable concrete top and steel base.",
    },
  ],
  "retro-curves": [
    {
      id: 301,
      name: "Curved Back Sofa",
      price: "6,239",
      image: "https://images.unsplash.com/photo-1550254478-ead40cc54513?w=800&q=80",
      desc: "Mid-century sofa with a distinctive curved back and tapered legs.",
    },
    {
      id: 302,
      name: "Egg Chair",
      price: "7,500",
      image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80",
      desc: "Iconic egg chair design for ultimate comfort and retro style.",
    },
    {
      id: 303,
      name: "Teak Wood Coffee Table",
      price: "5,400",
      image: "https://images.unsplash.com/photo-1565191999001-551c187427bb?w=800&q=80",
      desc: "Sleek teak wood table with retro styling and organic curves.",
    },
    {
      id: 304,
      name: "Geometric Rug",
      price: "3,100",
      image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80",
      desc: "Bold geometric rug to add retro flair to any room.",
    },
  ],
  "modern-minimalism": [
    {
      id: 401,
      name: "Carrara Marble Vanity Top",
      price: "420",
      image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
      desc: "Elegant Carrara marble vanity top with subtle grey veining and polished finish.",
    },
    {
      id: 402,
      name: "Minimalist Ceramic Sink",
      price: "850",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
      desc: "Sleek white ceramic sink with clean lines and modern rectangular design.",
    },
    {
      id: 403,
      name: "Monochrome Lounge Chair",
      price: "600",
      image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80",
      desc: "Comfortable lounge chair in monochrome shades with sleek design.",
    },
    {
      id: 404,
      name: "Floating Wall Shelf",
      price: "150",
      image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80",
      desc: "Simple floating shelf for modern storage display.",
    },
  ],
  // Lifestyle Categories
  "the-first-cup-moment": [
    {
      id: 501,
      name: "Sunrise Coffee Table",
      price: "1,299",
      image: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800&q=80",
      desc: "Perfect for your morning brew with warm wood tones.",
    },
    {
      id: 502,
      name: "Cozy Bean Bag",
      price: "2,499",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
      desc: "Sink in and enjoy the aroma in ultimate comfort.",
    },
    {
      id: 503,
      name: "Ceramic Mug Set",
      price: "899",
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80",
      desc: "Artisan mugs for a perfect start to your day.",
    },
    {
      id: 504,
      name: "Compact Side Table",
      price: "1,500",
      image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80",
      desc: "Holds your cup right where you need it.",
    },
  ],
  "wfh-hustle": [
    {
      id: 601,
      name: "Ergonomic Office Chair",
      price: "9,999",
      image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80",
      desc: "Support for long hours of productivity with lumbar support.",
    },
    {
      id: 602,
      name: "Standing Desk Converter",
      price: "5,499",
      image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80",
      desc: "Switch between sitting and standing easily for better health.",
    },
    {
      id: 603,
      name: "Monitor Arm Mount",
      price: "2,200",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80",
      desc: "Clear desk space and improve posture with adjustable mount.",
    },
    {
      id: 604,
      name: "Cable Management Box",
      price: "499",
      image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80",
      desc: "Keep your workspace clutter-free and organized.",
    },
  ],
  "the-balcony-escape": [
    {
      id: 701,
      name: "Rattan Balcony Set",
      price: "12,999",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
      desc: "Weather-resistant seating for outdoors with cushions.",
    },
    {
      id: 702,
      name: "Folding Bistro Table",
      price: "3,500",
      image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
      desc: "Space-saving table for small balconies and patios.",
    },
    {
      id: 703,
      name: "Hanging Planter",
      price: "450",
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80",
      desc: "Add greenery to your view with stylish planters.",
    },
    {
      id: 704,
      name: "Outdoor Rug",
      price: "1,200",
      image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80",
      desc: "Define your outdoor living space with weather-proof rug.",
    },
  ],
  "the-movie-night": [
    {
      id: 801,
      name: "Home Theater Recliner",
      price: "32,221",
      image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80",
      desc: "Ultimate comfort for movie marathons with cup holders.",
    },
    {
      id: 802,
      name: "Popcorn Bowl Set",
      price: "599",
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80",
      desc: "Essential for movie snacks in stylish ceramic.",
    },
    {
      id: 803,
      name: "Blackout Curtains",
      price: "1,800",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
      desc: "Set the mood with darkness for perfect viewing.",
    },
    {
      id: 804,
      name: "TV Console Unit",
      price: "8,500",
      image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80",
      desc: "Sleek storage for your media and entertainment.",
    },
  ],
  'the-"i\'m-finally-home"-moment': [
    {
      id: 901,
      name: "Plush Sectional Sofa",
      price: "45,000",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      desc: "A giant hug after a long day with deep cushions.",
    },
    {
      id: 902,
      name: "Soft Throw Blanket",
      price: "1,200",
      image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80",
      desc: "Warmth and comfort instantly in soft fabric.",
    },
    {
      id: 903,
      name: "Ambient Floor Lamp",
      price: "3,500",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
      desc: "Soft lighting to unwind and create atmosphere.",
    },
    {
      id: 904,
      name: "Ottoman Footrest",
      price: "2,800",
      image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80",
      desc: "Put your feet up and relax in style.",
    },
  ],
  "comfy-dream-zone": [
    {
      id: 1001,
      name: "Memory Foam Mattress",
      price: "15,999",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
      desc: "Sleep like a baby with pressure-relieving foam.",
    },
    {
      id: 1002,
      name: "Silk Pillowcase Pair",
      price: "1,500",
      image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80",
      desc: "Good for skin and hair with luxurious silk.",
    },
    {
      id: 1003,
      name: "Weighted Blanket",
      price: "4,200",
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
      desc: "Deep pressure stimulation for anxiety relief.",
    },
    {
      id: 1004,
      name: "Bedside Reading Lamp",
      price: "999",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
      desc: "Perfect for late-night reading with adjustable brightness.",
    },
  ],
};

// ----------------------------------------------------------------------
// 2. Main Page Data (used in ShopMain.tsx)
// ----------------------------------------------------------------------

export const popularBrands = [
  "Herman Miller",
  "Vitra",
  "Knoll",
  "Poltrona Frau",
  "Minotti",
  "B&B Italia",
  "Cassina",
  "Moroso",
  "Kartell",
  "Roche Bobois",
  "Fendi Casa",
  "Bentley Home",
];

export const freshFinds = [
  { title: "Swivel Chairs", options: "70+", price: "4,949" },
  { title: "Curated Coffee Tables", options: "130+", price: "15,920" },
  { title: "Kids Bedroom", options: "600+", price: "599" },
];

export const curatedDesigns = [
  {
    title: "Victorian Charm",
    options: "120+",
    price: "3,999",
    image: victorianImg,
  },
  {
    title: "Industrial Edge",
    options: "2000+",
    price: "9,999",
    image: industrialImg,
  },
  { title: "Retro Curves", options: "360+", price: "6,239", image: retroImg },
  {
    title: "Modern Minimalism",
    options: "400+",
    price: "420",
    image: minimalImg,
  },
];

export const lifeMoments = [
  {
    title: "The First Cup Moment",
    options: "500+",
    price: "1,299",
    image: coffeeImg,
  },
  { title: "WFH Hustle", options: "280+", price: "999", image: wfhImg },
  {
    title: "The Balcony Escape",
    options: "110+",
    price: "1,199",
    image: balconyImg,
  },
  {
    title: "The Movie Night",
    options: "35+",
    price: "32,221",
    image: shopHero,
  },
  {
    title: 'The "I\'M FINALLY HOME" Moment',
    options: "70+",
    price: "13,352",
    image: industrialImg,
  },
  {
    title: "Comfy Dream Zone",
    options: "85+",
    price: "10,899",
    image: retroImg,
  },
];

/**
 * Helper to find a product by ID across all categories
 */
export const findProductById = (id: string | number) => {
  // Check default products
  let found = defaultProducts.find((p) => p.id.toString() === id.toString());
  if (found)
    return { product: found, categorySlug: "default", categoryName: "General" };

  // Check categorized products
  for (const [slug, items] of Object.entries(categoryData)) {
    found = items.find((p) => p.id.toString() === id.toString());
    if (found) {
      return {
        product: found,
        categorySlug: slug,
        categoryName: slug
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()), // basic title case
      };
    }
  }
  return null;
};
