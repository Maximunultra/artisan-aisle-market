
import React from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import ProductContactOptions from '@/components/ProductContactOptions';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose
} from "@/components/ui/drawer";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  artisan: string;
  featured: boolean;
  isEcoFriendly?: boolean;
}

interface ProductDetailsDrawerProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  selectedProduct: Product | null;
  onAddToCart: (product: Product) => void;
  onProceedToCheckout: () => void;
}

const ProductDetailsDrawer: React.FC<ProductDetailsDrawerProps> = ({
  isOpen,
  onOpenChange,
  selectedProduct,
  onAddToCart,
  onProceedToCheckout
}) => {
  if (!selectedProduct) return null;

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh] overflow-auto">
        <DrawerHeader className="border-b">
          <DrawerTitle className="text-2xl font-serif">{selectedProduct.name}</DrawerTitle>
          <DrawerDescription>By {selectedProduct.artisan}</DrawerDescription>
          <DrawerClose className="absolute right-4 top-4">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DrawerClose>
        </DrawerHeader>
        
        <div className="px-4 py-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Image */}
            <div className="md:w-1/2">
              <div className="rounded-lg overflow-hidden">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-full h-auto object-cover" 
                />
              </div>
              
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mt-4">
                <div className="bg-artisan-sand/50 text-artisan-stone px-3 py-1 rounded-full text-sm">
                  {selectedProduct.category}
                </div>
                {selectedProduct.isEcoFriendly && (
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Eco-Friendly
                  </div>
                )}
                {selectedProduct.featured && (
                  <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                    Featured
                  </div>
                )}
              </div>
            </div>
            
            {/* Product Details */}
            <div className="md:w-1/2">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">About this product</h3>
                  <p className="mt-2 text-muted-foreground">
                    This beautiful piece is handcrafted by {selectedProduct.artisan}, 
                    showcasing traditional Filipino craftsmanship and artistry. 
                    Each item is uniquely made with attention to detail and quality.
                  </p>
                </div>
                
                <div className="border-t border-b py-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Price</span>
                    <span className="text-2xl font-semibold text-artisan-accent">
                      ₱{selectedProduct.price.toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Key Features</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>Handcrafted with care and attention to detail</li>
                    <li>Made using traditional techniques</li>
                    <li>Supports local Filipino artisans</li>
                    {selectedProduct.isEcoFriendly && (
                      <li>Made with sustainable and eco-friendly materials</li>
                    )}
                  </ul>
                </div>
                
                {/* Contact Options */}
                <ProductContactOptions 
                  productName={selectedProduct.name}
                  artisanName={selectedProduct.artisan}
                />
              </div>
            </div>
          </div>
        </div>
        
        <DrawerFooter className="border-t pt-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              className="flex-1 bg-artisan-stone hover:bg-artisan-forest"
              onClick={() => {
                onAddToCart(selectedProduct);
                onOpenChange(false);
              }}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 border-artisan-accent text-artisan-accent hover:bg-artisan-accent hover:text-white"
              onClick={onProceedToCheckout}
            >
              Proceed to Checkout
            </Button>
          </div>
          
          <div className="mt-3">
            <Link to="/contact" className="w-full">
              <Button variant="ghost" className="w-full text-muted-foreground">
                Contact Us For More Information
              </Button>
            </Link>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ProductDetailsDrawer;
