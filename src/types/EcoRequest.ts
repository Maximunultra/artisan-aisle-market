
export interface EcoRequest {
  id: number;
  productName: string;
  artisanName: string;
  artisanId: number;
  materials: string;
  description: string;
  certifications: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  imageUrl: string;
  approvedDate?: string;
  rejectedDate?: string;
  rejectionReason?: string;
}

// Sample eco-friendly product requests
export const SAMPLE_ECO_REQUESTS: EcoRequest[] = [
  {
    id: 1,
    productName: "Hand-woven Abaca Bag",
    artisanName: "Maria Santos",
    artisanId: 1,
    materials: "Organic abaca fibers, natural dyes",
    description: "These bags are made from sustainably harvested abaca fibers. We use natural plant-based dyes and avoid synthetic materials in our production process.",
    certifications: "Local Eco-certification",
    status: "pending",
    submittedDate: "2023-05-01",
    imageUrl: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=600&h=700"
  },
  {
    id: 2,
    productName: "Bamboo Cutlery Set",
    artisanName: "Pedro Reyes",
    artisanId: 2,
    materials: "Locally sourced bamboo, organic beeswax finish",
    description: "Our bamboo cutlery sets are made from bamboo grown without pesticides. We use a food-safe beeswax finish and compostable packaging.",
    certifications: "None yet, seeking approval",
    status: "pending",
    submittedDate: "2023-05-05",
    imageUrl: "https://images.unsplash.com/photo-1589923188651-268a9765a432?auto=format&fit=crop&q=80&w=600&h=700"
  },
  {
    id: 3,
    productName: "Recycled Glass Vase",
    artisanName: "Elena Cruz",
    artisanId: 3,
    materials: "100% recycled glass",
    description: "These vases are created from glass bottles collected from local restaurants. They are melted down and hand-blown into new forms, reducing waste.",
    certifications: "Recycled Materials Certificate",
    status: "approved",
    submittedDate: "2023-04-10",
    approvedDate: "2023-04-15",
    imageUrl: "https://images.unsplash.com/photo-1612196808214-b7e69439cdba?auto=format&fit=crop&q=80&w=600&h=700"
  },
  {
    id: 4,
    productName: "Coconut Shell Bowls",
    artisanName: "Ricardo Lim",
    artisanId: 4,
    materials: "Coconut shells, organic lacquer",
    description: "We use discarded coconut shells that would otherwise be waste. Each bowl is hand-polished and finished with an organic, food-safe lacquer.",
    certifications: "None",
    status: "rejected",
    submittedDate: "2023-04-20",
    rejectedDate: "2023-04-25",
    rejectionReason: "Insufficient information about the lacquer's eco-friendly properties.",
    imageUrl: "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?auto=format&fit=crop&q=80&w=600&h=700"
  }
];
