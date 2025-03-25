
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Search, PlusCircle, Edit, Trash2, ShoppingBag } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

// Sample products data
const initialProducts = [
  {
    id: 1,
    name: "Hand-woven Abaca Bag",
    description: "A beautifully crafted abaca bag, perfect for everyday use or special occasions.",
    price: 1200,
    inventory: 5,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=600&h=700",
    category: "Accessories",
    isEcoFriendly: true,
  },
  {
    id: 2,
    name: "Ceramic Vase with Bicol Patterns",
    description: "Traditional Bicol patterns adorn this handcrafted ceramic vase, celebrating local culture.",
    price: 1850,
    inventory: 8,
    image: "https://images.unsplash.com/photo-1612196808214-b7e69439cdba?auto=format&fit=crop&q=80&w=600&h=700",
    category: "Home Decor",
    isEcoFriendly: false,
  }
];

const ArtisanProducts = () => {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    inventory: '',
    category: '',
    image: '',
    isEcoFriendly: 'false'
  });
  
  const { toast } = useToast();
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, isEcoFriendly: value }));
  };
  
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      inventory: '',
      category: '',
      image: '',
      isEcoFriendly: 'false'
    });
  };
  
  const openAddDialog = () => {
    resetForm();
    setIsAddDialogOpen(true);
  };
  
  const openEditDialog = (product: any) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      inventory: product.inventory.toString(),
      category: product.category,
      image: product.image,
      isEcoFriendly: product.isEcoFriendly ? 'true' : 'false'
    });
    setIsEditDialogOpen(true);
  };
  
  const handleAddProduct = () => {
    const newProduct = {
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      inventory: parseInt(formData.inventory),
      image: formData.image,
      category: formData.category,
      isEcoFriendly: formData.isEcoFriendly === 'true'
    };
    
    setProducts([...products, newProduct]);
    setIsAddDialogOpen(false);
    resetForm();
    
    toast({
      title: "Product Added",
      description: "Your product has been added successfully.",
    });
  };
  
  const handleUpdateProduct = () => {
    if (!currentProduct) return;
    
    const updatedProducts = products.map(product => {
      if (product.id === currentProduct.id) {
        return {
          ...product,
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          inventory: parseInt(formData.inventory),
          image: formData.image,
          category: formData.category,
          isEcoFriendly: formData.isEcoFriendly === 'true'
        };
      }
      return product;
    });
    
    setProducts(updatedProducts);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Product Updated",
      description: "Your product has been updated successfully.",
    });
  };
  
  const handleDeleteProduct = (id: number) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    
    toast({
      title: "Product Deleted",
      description: "Your product has been removed from your inventory.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-medium">Your Products</h2>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
          
          <Button className="bg-artisan-stone hover:bg-artisan-forest" onClick={openAddDialog}>
            <PlusCircle size={16} className="mr-2" />
            Add Product
          </Button>
        </div>
      </div>
      
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden flex">
              {/* Product Image */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Product Details */}
              <div className="p-4 flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium line-clamp-1">{product.name}</h3>
                    <p className="text-artisan-accent font-semibold mt-1">₱{product.price.toLocaleString()}</p>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => openEditDialog(product)}>
                        <Edit size={14} className="mr-1" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 text-xs text-destructive" onClick={() => handleDeleteProduct(product.id)}>
                        <Trash2 size={14} className="mr-1" />
                        Delete
                      </Button>
                    </div>
                    
                    {product.isEcoFriendly && (
                      <span className="text-xs py-0.5 px-1.5 bg-green-100 text-green-800 rounded-full mt-2">
                        Eco-Friendly
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Inventory:</span>{" "}
                    <span className="font-medium">{product.inventory} units</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Category:</span>{" "}
                    <span className="font-medium">{product.category}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <div className="flex justify-center mb-4">
            <Package size={64} className="text-artisan-sand" />
          </div>
          <h3 className="text-xl font-medium mb-2">No products found</h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery 
              ? "No products match your search criteria." 
              : "You haven't listed any products yet."}
          </p>
          <Button className="bg-artisan-stone hover:bg-artisan-forest" onClick={openAddDialog}>
            <PlusCircle size={16} className="mr-2" />
            Add Your First Product
          </Button>
        </div>
      )}
      
      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Add New Product</DialogTitle>
            <DialogDescription>
              Enter the details for your new product. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                placeholder="Hand-crafted Item"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={formData.description} 
                onChange={handleInputChange} 
                placeholder="Describe your product..."
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price (₱)</Label>
                <Input 
                  id="price" 
                  name="price" 
                  type="number" 
                  value={formData.price} 
                  onChange={handleInputChange} 
                  placeholder="1000"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="inventory">Inventory</Label>
                <Input 
                  id="inventory" 
                  name="inventory" 
                  type="number" 
                  value={formData.inventory} 
                  onChange={handleInputChange} 
                  placeholder="10"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input 
                id="category" 
                name="category" 
                value={formData.category} 
                onChange={handleInputChange} 
                placeholder="Accessories, Home Decor, etc."
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="image">Image URL</Label>
              <Input 
                id="image" 
                name="image" 
                value={formData.image} 
                onChange={handleInputChange} 
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Is this product eco-friendly?</Label>
              <RadioGroup value={formData.isEcoFriendly} onValueChange={handleRadioChange} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="eco-yes" />
                  <Label htmlFor="eco-yes" className="cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="eco-no" />
                  <Label htmlFor="eco-no" className="cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button className="bg-artisan-stone hover:bg-artisan-forest" onClick={handleAddProduct}>
              Add Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Edit Product</DialogTitle>
            <DialogDescription>
              Update the details for your product. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Product Name</Label>
              <Input 
                id="edit-name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea 
                id="edit-description" 
                name="description" 
                value={formData.description} 
                onChange={handleInputChange} 
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-price">Price (₱)</Label>
                <Input 
                  id="edit-price" 
                  name="price" 
                  type="number" 
                  value={formData.price} 
                  onChange={handleInputChange} 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-inventory">Inventory</Label>
                <Input 
                  id="edit-inventory" 
                  name="inventory" 
                  type="number" 
                  value={formData.inventory} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-category">Category</Label>
              <Input 
                id="edit-category" 
                name="category" 
                value={formData.category} 
                onChange={handleInputChange} 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-image">Image URL</Label>
              <Input 
                id="edit-image" 
                name="image" 
                value={formData.image} 
                onChange={handleInputChange} 
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Is this product eco-friendly?</Label>
              <RadioGroup value={formData.isEcoFriendly} onValueChange={handleRadioChange} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="edit-eco-yes" />
                  <Label htmlFor="edit-eco-yes" className="cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="edit-eco-no" />
                  <Label htmlFor="edit-eco-no" className="cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button className="bg-artisan-stone hover:bg-artisan-forest" onClick={handleUpdateProduct}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArtisanProducts;
