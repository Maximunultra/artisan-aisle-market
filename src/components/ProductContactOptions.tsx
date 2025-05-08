
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageSquare } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';

interface ProductContactOptionsProps {
  productName: string;
  artisanName: string;
}

const ProductContactOptions: React.FC<ProductContactOptionsProps> = ({ productName, artisanName }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, this would send the message to the backend
      console.log("Message to artisan:", { productName, artisanName, message, email });
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success toast and close dialog
      toast({
        title: "Message sent successfully!",
        description: `Your message has been sent to ${artisanName}.`,
      });
      
      setIsDialogOpen(false);
      setMessage('');
      setEmail('');
      
      // Ask if user wants to view their messages
      toast({
        title: "View your messages",
        description: "Would you like to view your conversation?",
        action: (
          <Button 
            variant="outline" 
            onClick={() => navigate('/customer-messages')}
            className="border-artisan-stone text-artisan-stone"
          >
            View Messages
          </Button>
        ),
      });
    } catch (error) {
      // Show error toast
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const goToMessaging = () => {
    navigate('/customer-messages');
  };
  
  return (
    <div className="space-y-4 mt-6">
      <h3 className="text-lg font-medium">Contact About This Product</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Direct Message Option */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full flex items-center justify-center gap-2 border-artisan-stone text-artisan-stone">
              <MessageSquare className="h-4 w-4" />
              <span>Direct Message</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Message to {artisanName}</DialogTitle>
              <DialogDescription>
                Regarding: {productName}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSendMessage} className="space-y-4 py-4">
              <div>
                <Label htmlFor="email">Your Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address" 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="message">Your Message</Label>
                <Textarea 
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`I'm interested in the ${productName}. Could you provide more information?`}
                  className="min-h-32"
                  required
                />
              </div>
              
              <DialogFooter className="sm:justify-start flex flex-wrap gap-2">
                <Button 
                  type="submit" 
                  className="bg-artisan-stone hover:bg-artisan-forest"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                
                <Button 
                  type="button"
                  variant="outline"
                  className="border-artisan-stone text-artisan-stone"
                  onClick={goToMessaging}
                >
                  Go to Messaging
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        
        {/* Phone Option */}
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 border-artisan-stone text-artisan-stone"
          onClick={() => {
            toast({
              title: "Contact by Phone",
              description: "Call our hotline at +63 945 123 4567 and mention the product name.",
            });
          }}
        >
          <Phone className="h-4 w-4" />
          <span>Call Hotline</span>
        </Button>
        
        {/* Email Option */}
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 border-artisan-stone text-artisan-stone"
          onClick={() => {
            window.location.href = `mailto:artisans@marketplace.ph?subject=Inquiry about ${productName}&body=I'm interested in the ${productName} by ${artisanName}.`;
          }}
        >
          <Mail className="h-4 w-4" />
          <span>Email</span>
        </Button>
      </div>
    </div>
  );
};

export default ProductContactOptions;
