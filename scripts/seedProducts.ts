// scripts/seedProducts.ts
import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Database connection
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/furniture-db";

// Category Schema
const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    image: String,
  },
  { timestamps: true },
);

// User Schema
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["buyer", "seller", "admin"],
      default: "buyer",
    },
  },
  { timestamps: true },
);

// Product Schema
const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    images: [{ type: String }],
    stock: { type: Number, required: true, default: 0 },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);

// Sample products data from shopData.ts
const defaultProducts = [
  {
    name: "Velvet Chesterfield Sofa",
    price: 45999,
    category: "Living Room",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    ],
    description: "A timeless classic with deep button tufting.",
    stock: 10,
  },
  {
    name: "Industrial Coffee Table",
    price: 12499,
    category: "Living Room",
    images: [
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80",
    ],
    description: "Rugged metal frame with reclaimed wood top.",
    stock: 15,
  },
  {
    name: "Retro Armchair",
    price: 8299,
    category: "Living Room",
    images: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80",
    ],
    description: "Mid-century modern design with tapered legs.",
    stock: 8,
  },
  {
    name: "Minimalist Desk",
    price: 6999,
    category: "Office",
    images: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80",
    ],
    description: "Clean lines and functional storage for modern workspaces.",
    stock: 12,
  },
];

const categoryProducts = {
  "victorian-charm": [
    {
      name: "Victorian Velvet Sofa",
      price: 3999,
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      desc: "Elegant Victorian sofa with plush velvet upholstery and carved wooden legs.",
    },
    {
      name: "Carved Wood Armchair",
      price: 5499,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
      desc: "Hand-carved wooden armchair with intricate Victorian details and rich finish.",
    },
    {
      name: "Antique Oak Coffee Table",
      price: 8999,
      image:
        "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80",
      desc: "Solid oak table with a timeless antique finish and ornate carvings.",
    },
    {
      name: "Floral Tapestry Chaise",
      price: 12500,
      image:
        "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80",
      desc: "Classic chaise lounge with floral tapestry upholstery and tufted details.",
    },
    {
      name: "Victorian Dining Chair Set",
      price: 18999,
      image:
        "https://images.unsplash.com/photo-1503602642458-232111445657?w=800&q=80",
      desc: "Set of 4 elegant dining chairs with velvet cushions and carved backs.",
    },
    {
      name: "Ornate Mirror Frame",
      price: 6500,
      image:
        "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80",
      desc: "Gilded Victorian mirror with intricate baroque-style frame.",
    },
  ],
  "industrial-edge": [
    {
      name: "Industrial Marble Countertop",
      price: 9999,
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      desc: "Premium marble countertop with natural veining and industrial metal edge trim.",
    },
    {
      name: "Concrete Vessel Sink",
      price: 14999,
      image:
        "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80",
      desc: "Handcrafted concrete sink with raw industrial finish and modern design.",
    },
    {
      name: "Pipe Leg Side Table",
      price: 4200,
      image:
        "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80",
      desc: "Unique side table featuring industrial pipe legs and wood top.",
    },
    {
      name: "Concrete Top Dining Table",
      price: 22000,
      image:
        "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
      desc: "Modern dining table with a durable concrete top and steel base.",
    },
  ],
  "retro-curves": [
    {
      name: "Curved Back Sofa",
      price: 6239,
      image:
        "https://images.unsplash.com/photo-1550254478-ead40cc54513?w=800&q=80",
      desc: "Mid-century sofa with a distinctive curved back and tapered legs.",
    },
    {
      name: "Egg Chair",
      price: 7500,
      image:
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80",
      desc: "Iconic egg chair design for ultimate comfort and retro style.",
    },
    {
      name: "Teak Wood Coffee Table",
      price: 5400,
      image:
        "https://images.unsplash.com/photo-1565191999001-551c187427bb?w=800&q=80",
      desc: "Sleek teak wood table with retro styling and organic curves.",
    },
    {
      name: "Geometric Rug",
      price: 3100,
      image:
        "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80",
      desc: "Bold geometric rug to add retro flair to any room.",
    },
  ],
  "modern-minimalism": [
    {
      name: "Carrara Marble Vanity Top",
      price: 420,
      image:
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
      desc: "Elegant Carrara marble vanity top with subtle grey veining and polished finish.",
    },
    {
      name: "Minimalist Ceramic Sink",
      price: 850,
      image:
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
      desc: "Sleek white ceramic sink with clean lines and modern rectangular design.",
    },
    {
      name: "Monochrome Lounge Chair",
      price: 600,
      image:
        "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80",
      desc: "Comfortable lounge chair in monochrome shades with sleek design.",
    },
    {
      name: "Floating Wall Shelf",
      price: 150,
      image:
        "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80",
      desc: "Simple floating shelf for modern storage display.",
    },
  ],
  // Lifestyle Categories
  "the-first-cup-moment": [
    {
      name: "Sunrise Coffee Table",
      price: 1299,
      image:
        "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800&q=80",
      desc: "Perfect for your morning brew with warm wood tones.",
    },
    {
      name: "Cozy Bean Bag",
      price: 2499,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
      desc: "Sink in and enjoy the aroma in ultimate comfort.",
    },
    {
      name: "Ceramic Mug Set",
      price: 899,
      image:
        "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80",
      desc: "Artisan mugs for a perfect start to your day.",
    },
    {
      name: "Compact Side Table",
      price: 1500,
      image:
        "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80",
      desc: "Holds your cup right where you need it.",
    },
  ],
  "wfh-hustle": [
    {
      name: "Ergonomic Office Chair",
      price: 9999,
      image:
        "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80",
      desc: "Support for long hours of productivity with lumbar support.",
    },
    {
      name: "Standing Desk Converter",
      price: 5499,
      image:
        "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80",
      desc: "Switch between sitting and standing easily for better health.",
    },
    {
      name: "Monitor Arm Mount",
      price: 2200,
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80",
      desc: "Clear desk space and improve posture with adjustable mount.",
    },
    {
      name: "Cable Management Box",
      price: 499,
      image:
        "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80",
      desc: "Keep your workspace clutter-free and organized.",
    },
  ],
  "the-balcony-escape": [
    {
      name: "Rattan Balcony Set",
      price: 12999,
      image:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
      desc: "Weather-resistant seating for outdoors with cushions.",
    },
    {
      name: "Folding Bistro Table",
      price: 3500,
      image:
        "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
      desc: "Space-saving table for small balconies and patios.",
    },
    {
      name: "Hanging Planter",
      price: 450,
      image:
        "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80",
      desc: "Add greenery to your view with stylish planters.",
    },
    {
      name: "Outdoor Rug",
      price: 1200,
      image:
        "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80",
      desc: "Define your outdoor living space with weather-proof rug.",
    },
  ],
  "the-movie-night": [
    {
      name: "Home Theater Recliner",
      price: 32221,
      image:
        "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80",
      desc: "Ultimate comfort for movie marathons with cup holders.",
    },
    {
      name: "Popcorn Bowl Set",
      price: 599,
      image:
        "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80",
      desc: "Essential for movie snacks in stylish ceramic.",
    },
    {
      name: "Blackout Curtains",
      price: 1800,
      image:
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
      desc: "Set the mood with darkness for perfect viewing.",
    },
    {
      name: "TV Console Unit",
      price: 8500,
      image:
        "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80",
      desc: "Sleek storage for your media and entertainment.",
    },
  ],
  'the-"i\'m-finally-home"-moment': [
    {
      name: "Plush Sectional Sofa",
      price: 45000,
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      desc: "A giant hug after a long day with deep cushions.",
    },
    {
      name: "Soft Throw Blanket",
      price: 1200,
      image:
        "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80",
      desc: "Warmth and comfort instantly in soft fabric.",
    },
    {
      name: "Ambient Floor Lamp",
      price: 3500,
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
      desc: "Soft lighting to unwind and create atmosphere.",
    },
    {
      name: "Ottoman Footrest",
      price: 2800,
      image:
        "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80",
      desc: "Put your feet up and relax in style.",
    },
  ],
  "comfy-dream-zone": [
    {
      name: "Memory Foam Mattress",
      price: 15999,
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
      desc: "Sleep like a baby with pressure-relieving foam.",
    },
    {
      name: "Silk Pillowcase Pair",
      price: 1500,
      image:
        "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80",
      desc: "Good for skin and hair with luxurious silk.",
    },
    {
      name: "Weighted Blanket",
      price: 4200,
      image:
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
      desc: "Deep pressure stimulation for anxiety relief.",
    },
    {
      name: "Bedside Reading Lamp",
      price: 999,
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
      desc: "Perfect for late-night reading with adjustable brightness.",
    },
  ],
};

// Replaced by the definition below

const allProducts = [
  ...defaultProducts.map((p) => ({ ...p, categorySlug: "default" })),
  ...Object.entries(categoryProducts).flatMap(([slug, products]) =>
    products.map((p) => ({
      ...p,
      categorySlug: slug,
      category: "General",
      images: [p.image],
      description: p.desc,
      stock: 20,
    })),
  ),
];

async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Create or find seller user
    console.log("\nChecking for seller user...");
    let seller = await User.findOne({ email: "seller@gmail.com" }).select(
      "+password",
    );

    if (!seller) {
      console.log("Creating seller user...");
      const hashedPassword = await bcrypt.hash("seller@gmail.com", 10);
      seller = await User.create({
        name: "Seller Account",
        email: "seller@gmail.com",
        password: hashedPassword,
        role: "seller",
      });
      console.log("✓ Seller user created");
    } else {
      console.log("✓ Seller user already exists");
    }

    // Create Categories
    console.log("\nCreating categories...");
    const categoryMap = new Map();
    const categoriesToCreate = [
      ...new Set(allProducts.map((p) => p.categorySlug)),
    ];

    for (const slug of categoriesToCreate) {
      const name = slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      const category = await Category.findOneAndUpdate(
        { slug },
        {
          name,
          slug,
          description: `Products for ${name}`,
          image: "",
        },
        { upsert: true, new: true },
      );
      categoryMap.set(slug, category._id);
      console.log(`✓ Category: ${name}`);
    }

    // Create products
    console.log("\nCreating products...");
    for (const productData of allProducts) {
      const categoryId = categoryMap.get(productData.categorySlug || "default");

      const existing = await Product.findOne({
        name: productData.name,
        sellerId: seller._id,
      });

      if (!existing) {
        await Product.create({
          ...productData,
          categoryId: categoryId,
          sellerId: seller._id,
        });
        console.log(`✓ Created: ${productData.name}`);
      } else {
        // Always update to ensure images and other fields are synced
        existing.images = productData.images;
        existing.description = productData.description;
        existing.price = productData.price;
        existing.stock = productData.stock;
        existing.categoryId = categoryId;

        await existing.save();
        console.log(`✓ Updated (synced): ${productData.name}`);
      }
    }
    console.log(`\n✓ Seeding completed`);

    console.log("\n=== Seed Complete ===");
    console.log("Seller credentials:");
    console.log("  Email: seller@gmail.com");
    console.log("  Password: seller@gmail.com");

    await mongoose.connection.close();
    console.log("\nDatabase connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
