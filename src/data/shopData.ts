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
    image: victorianImg,
    desc: "A timeless classic with deep button tufting.",
  },
  {
    id: 2,
    name: "Industrial Coffee Table",
    price: "12,499",
    image: industrialImg,
    desc: "Rugged metal frame with reclaimed wood top.",
  },
  {
    id: 3,
    name: "Retro Armchair",
    price: "8,299",
    image: retroImg,
    desc: "Mid-century modern design with tapered legs.",
  },
  {
    id: 4,
    name: "Minimalist Desk",
    price: "6,999",
    image: minimalImg,
    desc: "Clean lines and functional storage for modern workspaces.",
  },
];

export const categoryData: Record<string, Product[]> = {
  "victorian-charm": [
    {
      id: 101,
      name: "Victorian Velvet Sofa",
      price: "3,999",
      image: victorianImg,
      desc: "Elegant Victorian sofa with plush velvet.",
    },
    {
      id: 102,
      name: "Carved Wood Armchair",
      price: "5,499",
      image: victorianImg,
      desc: "Hand-carved wooden armchair with intricate details.",
    },
    {
      id: 103,
      name: "Antique Oak Coffee Table",
      price: "8,999",
      image: victorianImg,
      desc: "Solid oak table with a timeless antique finish.",
    },
    {
      id: 104,
      name: "Floral Tapestry Chaise",
      price: "12,500",
      image: victorianImg,
      desc: "Classic chaise lounge with floral tapestry upholstery.",
    },
  ],
  "industrial-edge": [
    {
      id: 201,
      name: "Metal Frame Bookshelf",
      price: "9,999",
      image: industrialImg,
      desc: "Sturdy metal bookshelf with open design.",
    },
    {
      id: 202,
      name: "Reclaimed Wood Desk",
      price: "14,999",
      image: industrialImg,
      desc: "Workspace desk made from authentic reclaimed wood.",
    },
    {
      id: 203,
      name: "Pipe Leg Side Table",
      price: "4,200",
      image: industrialImg,
      desc: "Unique side table featuring industrial pipe legs.",
    },
    {
      id: 204,
      name: "Concrete Top Dining Table",
      price: "22,000",
      image: industrialImg,
      desc: "Modern dining table with a durable concrete top.",
    },
  ],
  "retro-curves": [
    {
      id: 301,
      name: "Curved Back Sofa",
      price: "6,239",
      image: retroImg,
      desc: "Mid-century sofa with a distinctive curved back.",
    },
    {
      id: 302,
      name: "Egg Chair",
      price: "7,500",
      image: retroImg,
      desc: "Iconic egg chair design for ultimate comfort.",
    },
    {
      id: 303,
      name: "Teak Wood Coffee Table",
      price: "5,400",
      image: retroImg,
      desc: "Sleek teak wood table with retro styling.",
    },
    {
      id: 304,
      name: "Geometric Rug",
      price: "3,100",
      image: retroImg,
      desc: "Bold geometric rug to add retro flair to any room.",
    },
  ],
  "modern-minimalism": [
    {
      id: 401,
      name: "Sleek White Sofa",
      price: "420",
      image: minimalImg,
      desc: "Minimalist white sofa with clean lines.",
    },
    {
      id: 402,
      name: "Glass Top Coffee Table",
      price: "850",
      image: minimalImg,
      desc: "Transparent glass table that enhances space.",
    },
    {
      id: 403,
      name: "Monochrome Lounge Chair",
      price: "600",
      image: minimalImg,
      desc: "Comfortable lounge chair in monochrome shades.",
    },
    {
      id: 404,
      name: "Floating Wall Shelf",
      price: "150",
      image: minimalImg,
      desc: "Simple floating shelf for modern storage display.",
    },
  ],
  // Lifestyle Categories
  "the-first-cup-moment": [
    {
      id: 501,
      name: "Sunrise Coffee Table",
      price: "1,299",
      image: coffeeImg,
      desc: "Perfect for your morning brew.",
    },
    {
      id: 502,
      name: "Cozy Bean Bag",
      price: "2,499",
      image: coffeeImg,
      desc: "Sink in and enjoy the aroma.",
    },
    {
      id: 503,
      name: "Ceramic Mug Set",
      price: "899",
      image: coffeeImg,
      desc: "Artisan mugs for a perfect start.",
    },
    {
      id: 504,
      name: "Compact Side Table",
      price: "1,500",
      image: coffeeImg,
      desc: "Holds your cup right where you need it.",
    },
  ],
  "wfh-hustle": [
    {
      id: 601,
      name: "Ergonomic Office Chair",
      price: "9,999",
      image: wfhImg,
      desc: "Support for long hours of productivity.",
    },
    {
      id: 602,
      name: "Standing Desk Converter",
      price: "5,499",
      image: wfhImg,
      desc: "Switch between sitting and standing easily.",
    },
    {
      id: 603,
      name: "Monitor Arm Mount",
      price: "2,200",
      image: wfhImg,
      desc: "Clear desk space and improve posture.",
    },
    {
      id: 604,
      name: "Cable Management Box",
      price: "499",
      image: wfhImg,
      desc: "Keep your workspace clutter-free.",
    },
  ],
  "the-balcony-escape": [
    {
      id: 701,
      name: "Rattan Balcony Set",
      price: "12,999",
      image: balconyImg,
      desc: "Weather-resistant seating for outdoors.",
    },
    {
      id: 702,
      name: "Folding Bistro Table",
      price: "3,500",
      image: balconyImg,
      desc: "Space-saving table for small balconies.",
    },
    {
      id: 703,
      name: "Hanging Planter",
      price: "450",
      image: balconyImg,
      desc: "Add greenery to your view.",
    },
    {
      id: 704,
      name: "Outdoor Rug",
      price: "1,200",
      image: balconyImg,
      desc: "Define your outdoor living space.",
    },
  ],
  "the-movie-night": [
    {
      id: 801,
      name: "Home Theater Recliner",
      price: "32,221",
      image: shopHero,
      desc: "Ultimate comfort for movie marathons.",
    },
    {
      id: 802,
      name: "Popcorn Bowl Set",
      price: "599",
      image: shopHero,
      desc: "Essential for movie snacks.",
    },
    {
      id: 803,
      name: "Blackout Curtains",
      price: "1,800",
      image: shopHero,
      desc: "Set the mood with darkness.",
    },
    {
      id: 804,
      name: "TV Console Unit",
      price: "8,500",
      image: shopHero,
      desc: "Sleek storage for your media.",
    },
  ],
  'the-"i\'m-finally-home"-moment': [
    {
      id: 901,
      name: "Plush Sectional Sofa",
      price: "45,000",
      image: industrialImg,
      desc: "A giant hug after a long day.",
    },
    {
      id: 902,
      name: "Soft Throw Blanket",
      price: "1,200",
      image: industrialImg,
      desc: "Warmth and comfort instantly.",
    },
    {
      id: 903,
      name: "Ambient Floor Lamp",
      price: "3,500",
      image: industrialImg,
      desc: "Soft lighting to unwind.",
    },
    {
      id: 904,
      name: "Ottoman Footrest",
      price: "2,800",
      image: industrialImg,
      desc: "Put your feet up and relax.",
    },
  ],
  "comfy-dream-zone": [
    {
      id: 1001,
      name: "Memory Foam Mattress",
      price: "15,999",
      image: retroImg,
      desc: "Sleep like a baby.",
    },
    {
      id: 1002,
      name: "Silk Pillowcase Pair",
      price: "1,500",
      image: retroImg,
      desc: "Good for skin and hair.",
    },
    {
      id: 1003,
      name: "Weighted Blanket",
      price: "4,200",
      image: retroImg,
      desc: "Deep pressure stimulation for anxiety.",
    },
    {
      id: 1004,
      name: "Bedside Reading Lamp",
      price: "999",
      image: retroImg,
      desc: "Perfect for late-night reading.",
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
