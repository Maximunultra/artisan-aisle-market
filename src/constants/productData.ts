
// Sample product data
export const products = [
  {
    id: 1,
    name: "Hand-woven Abaca Bag",
    category: "Accessories",
    price: 1200,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=600&h=700",
    artisan: "Maria Santos",
    featured: true,
    isEcoFriendly: true
  },
  {
    id: 2,
    name: "Ceramic Vase with Bicol Patterns",
    category: "Home Decor",
    price: 1850,
    image: "https://images.unsplash.com/photo-1612196808214-b7e69439cdba?auto=format&fit=crop&q=80&w=600&h=700",
    artisan: "Pedro Reyes",
    featured: true,
    isEcoFriendly: false
  },
  {
    id: 3,
    name: "Handcrafted Wooden Serving Tray",
    category: "Kitchen",
    price: 1500,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=600&h=700",
    artisan: "Juan Mendoza",
    featured: true
  },
  {
    id: 4,
    name: "Hand-painted Mayon Silk Scarf",
    category: "Clothing",
    price: 2200,
    image: "https://images.unsplash.com/photo-1520299607509-dcd935f9a025?auto=format&fit=crop&q=80&w=600&h=700",
    artisan: "Elena Cruz",
    featured: true
  },
  {
    id: 5,
    name: "Bamboo Table Lamp",
    category: "Home Decor",
    price: 1700,
    image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&q=80&w=600&h=700",
    artisan: "Ramon Ignacio",
    featured: false
  },
  {
    id: 6,
    name: "Handwoven Placemats (Set of 4)",
    category: "Kitchen",
    price: 950,
    image: "https://images.unsplash.com/photo-1519974719765-e6559eac2575?auto=format&fit=crop&q=80&w=600&h=700",
    artisan: "Teresa Lim",
    featured: false
  },
  {
    id: 7,
    name: "Coconut Shell Candle Holder",
    category: "Home Decor",
    price: 750,
    image: "https://images.unsplash.com/photo-1606293924735-11aaaf8b5625?auto=format&fit=crop&q=80&w=600&h=700",
    artisan: "Carlos Santos",
    featured: false
  },
  {
    id: 8,
    name: "Abaca Rope Plant Hanger",
    category: "Home Decor",
    price: 850,
    image: "https://images.unsplash.com/photo-1611486212557-88be5ff6f941?auto=format&fit=crop&q=80&w=600&h=700",
    artisan: "Maria Santos",
    featured: false
  },
  {
    id: 9,
    name: "Hand-carved Wooden Spoon Set",
    category: "Kitchen",
    price: 1250,
    image: "https://images.unsplash.com/photo-1593853963555-013dcbeb8fc0?auto=format&fit=crop&q=80&w=600&h=700",
    artisan: "Juan Mendoza",
    featured: false
  },
  {
    id: 10,
    name: "Woven Rattan Basket",
    category: "Home Decor",
    price: 980,
    image: "https://images.unsplash.com/photo-1622402815427-58bfd4457095?auto=format&fit=crop&q=80&w=600&h=700",
    artisan: "Sofia Cruz",
    featured: false
  },
  {
    id: 11,
    name: "Handloom Cotton Table Runner",
    category: "Home Decor",
    price: 1150,
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=600&h=700",
    artisan: "Elena Cruz",
    featured: false
  },
  {
    id: 12,
    name: "Shell and Bead Necklace",
    category: "Accessories",
    price: 780,
    image: "https://images.unsplash.com/photo-1535632066274-65209aa3d82f?auto=format&fit=crop&q=80&w=600&h=700",
    artisan: "Teresa Lim",
    featured: false
  }
];

// Categories
export const categories = ["All", "Accessories", "Home Decor", "Kitchen", "Clothing"];

// Price ranges
export const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₱1,000", min: 0, max: 1000 },
  { label: "₱1,000 - ₱1,500", min: 1000, max: 1500 },
  { label: "₱1,500 - ₱2,000", min: 1500, max: 2000 },
  { label: "Over ₱2,000", min: 2000, max: Infinity }
];
