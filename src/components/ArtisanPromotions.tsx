
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Search, PlusCircle, Edit, Trash2, Megaphone, Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Sample promotions data
const initialPromotions = [
  {
    id: 1,
    title: "Summer Sale",
    description: "20% off on all handwoven bags for the summer season.",
    budget: 1000,
    startDate: "2023-06-01",
    endDate: "2023-06-30",
    status: "Active",
    audience: "All customers",
  },
  {
    id: 2,
    title: "Holiday Special Bundle",
    description: "Buy one ceramic vase and get a small decoration piece free.",
    budget: 1500,
    startDate: "2023-12-01",
    endDate: "2023-12-25",
    status: "Scheduled",
    audience: "Previous customers",
  }
];

const ArtisanPromotions = () => {
  const [promotions, setPromotions] = useState(initialPromotions);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPromotion, setCurrentPromotion] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    startDate: '',
    endDate: '',
    audience: '',
  });
  
  const { toast } = useToast();
  
  const filteredPromotions = promotions.filter(promo => 
    promo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    promo.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      budget: '',
      startDate: '',
      endDate: '',
      audience: '',
    });
  };
  
  const openAddDialog = () => {
    resetForm();
    setIsAddOpen(true);
  };
  
  const openEditDialog = (promotion: any) => {
    setCurrentPromotion(promotion);
    setFormData({
      title: promotion.title,
      description: promotion.description,
      budget: promotion.budget.toString(),
      startDate: promotion.startDate,
      endDate: promotion.endDate,
      audience: promotion.audience,
    });
    setIsEditOpen(true);
  };
  
  const handleAddPromotion = () => {
    const newPromotion = {
      id: promotions.length > 0 ? Math.max(...promotions.map(p => p.id)) + 1 : 1,
      title: formData.title,
      description: formData.description,
      budget: parseFloat(formData.budget),
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: new Date(formData.startDate) > new Date() ? "Scheduled" : "Active",
      audience: formData.audience,
    };
    
    setPromotions([...promotions, newPromotion]);
    setIsAddOpen(false);
    resetForm();
    
    toast({
      title: "Promotion Created",
      description: "Your promotional campaign has been created successfully.",
    });
  };
  
  const handleUpdatePromotion = () => {
    if (!currentPromotion) return;
    
    const updatedPromotions = promotions.map(promo => {
      if (promo.id === currentPromotion.id) {
        return {
          ...promo,
          title: formData.title,
          description: formData.description,
          budget: parseFloat(formData.budget),
          startDate: formData.startDate,
          endDate: formData.endDate,
          status: new Date(formData.startDate) > new Date() ? "Scheduled" : "Active",
          audience: formData.audience,
        };
      }
      return promo;
    });
    
    setPromotions(updatedPromotions);
    setIsEditOpen(false);
    
    toast({
      title: "Promotion Updated",
      description: "Your promotional campaign has been updated successfully.",
    });
  };
  
  const handleDeletePromotion = (id: number) => {
    const updatedPromotions = promotions.filter(promo => promo.id !== id);
    setPromotions(updatedPromotions);
    
    toast({
      title: "Promotion Deleted",
      description: "Your promotional campaign has been deleted.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-medium">Your Promotional Campaigns</h2>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Search campaigns..." 
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
          
          <Button className="bg-artisan-stone hover:bg-artisan-forest" onClick={openAddDialog}>
            <PlusCircle size={16} className="mr-2" />
            Create Campaign
          </Button>
        </div>
      </div>
      
      {filteredPromotions.length > 0 ? (
        <div className="space-y-4">
          {filteredPromotions.map(promotion => (
            <div key={promotion.id} className="bg-white rounded-lg shadow-sm p-5">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Megaphone size={20} className="text-artisan-accent" />
                    <h3 className="text-lg font-medium">{promotion.title}</h3>
                    <span 
                      className={`ml-2 text-xs px-2 py-1 rounded-full ${
                        promotion.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {promotion.status}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground">{promotion.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} className="text-muted-foreground" />
                      <span>{new Date(promotion.startDate).toLocaleDateString()} - {new Date(promotion.endDate).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="font-medium">Budget:</span> ₱{promotion.budget.toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">Target:</span> {promotion.audience}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 md:flex-shrink-0">
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(promotion)}>
                    <Edit size={14} className="mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleDeletePromotion(promotion.id)}>
                    <Trash2 size={14} className="mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <div className="flex justify-center mb-4">
            <Megaphone size={64} className="text-artisan-sand" />
          </div>
          <h3 className="text-xl font-medium mb-2">No promotions found</h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery 
              ? "No promotional campaigns match your search criteria." 
              : "You haven't created any promotional campaigns yet."}
          </p>
          <Button className="bg-artisan-stone hover:bg-artisan-forest" onClick={openAddDialog}>
            <PlusCircle size={16} className="mr-2" />
            Create Your First Campaign
          </Button>
        </div>
      )}
      
      {/* Add Promotion Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Create Promotional Campaign</DialogTitle>
            <DialogDescription>
              Set up a new promotional campaign for your products.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Campaign Title</Label>
              <Input 
                id="title" 
                name="title" 
                value={formData.title} 
                onChange={handleInputChange} 
                placeholder="Summer Sale, Holiday Special, etc."
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={formData.description} 
                onChange={handleInputChange} 
                placeholder="Describe what you're offering..."
                rows={3}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="budget">Budget (₱)</Label>
              <Input 
                id="budget" 
                name="budget" 
                type="number" 
                value={formData.budget} 
                onChange={handleInputChange} 
                placeholder="1000"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input 
                  id="startDate" 
                  name="startDate" 
                  type="date" 
                  value={formData.startDate} 
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input 
                  id="endDate" 
                  name="endDate" 
                  type="date" 
                  value={formData.endDate} 
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="audience">Target Audience</Label>
              <Input 
                id="audience" 
                name="audience" 
                value={formData.audience} 
                onChange={handleInputChange} 
                placeholder="All customers, Previous customers, etc."
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button className="bg-artisan-stone hover:bg-artisan-forest" onClick={handleAddPromotion}>
              Create Campaign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Promotion Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Edit Promotional Campaign</DialogTitle>
            <DialogDescription>
              Update your promotional campaign details.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Campaign Title</Label>
              <Input 
                id="edit-title" 
                name="title" 
                value={formData.title} 
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
            
            <div className="grid gap-2">
              <Label htmlFor="edit-budget">Budget (₱)</Label>
              <Input 
                id="edit-budget" 
                name="budget" 
                type="number" 
                value={formData.budget} 
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-startDate">Start Date</Label>
                <Input 
                  id="edit-startDate" 
                  name="startDate" 
                  type="date" 
                  value={formData.startDate} 
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-endDate">End Date</Label>
                <Input 
                  id="edit-endDate" 
                  name="endDate" 
                  type="date" 
                  value={formData.endDate} 
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-audience">Target Audience</Label>
              <Input 
                id="edit-audience" 
                name="audience" 
                value={formData.audience} 
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button className="bg-artisan-stone hover:bg-artisan-forest" onClick={handleUpdatePromotion}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArtisanPromotions;
