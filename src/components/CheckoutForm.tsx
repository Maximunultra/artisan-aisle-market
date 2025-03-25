
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Wallet, BanknoteIcon } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  address: z.string().min(10, { message: "Please enter your complete address." }),
  city: z.string().min(2, { message: "City is required." }),
  zipCode: z.string().min(4, { message: "Please enter a valid ZIP code." }),
  paymentMethod: z.enum(["card", "gcash", "maya", "bank", "cod"], {
    required_error: "Please select a payment method.",
  }),
});

interface CheckoutFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "Legazpi City",
      zipCode: "",
      paymentMethod: "card",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Delivery Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your city" {...field} />
                  </FormControl>
                  <FormDescription>
                    We currently only deliver within Legazpi City.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ZIP Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter ZIP code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="space-y-4 pt-4 border-t border-artisan-sand/50">
          <h3 className="text-lg font-medium">Payment Method</h3>
          
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 gap-3"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="card" id="card" />
                      </FormControl>
                      <FormLabel htmlFor="card" className="flex items-center gap-2 font-normal cursor-pointer">
                        <CreditCard size={20} className="text-artisan-stone" />
                        Credit/Debit Card
                      </FormLabel>
                    </FormItem>
                    
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="gcash" id="gcash" />
                      </FormControl>
                      <FormLabel htmlFor="gcash" className="flex items-center gap-2 font-normal cursor-pointer">
                        <Wallet size={20} className="text-blue-500" />
                        GCash
                      </FormLabel>
                    </FormItem>
                    
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="maya" id="maya" />
                      </FormControl>
                      <FormLabel htmlFor="maya" className="flex items-center gap-2 font-normal cursor-pointer">
                        <Wallet size={20} className="text-green-500" />
                        Maya
                      </FormLabel>
                    </FormItem>
                    
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="bank" id="bank" />
                      </FormControl>
                      <FormLabel htmlFor="bank" className="flex items-center gap-2 font-normal cursor-pointer">
                        <BanknoteIcon size={20} className="text-artisan-accent" />
                        Bank Transfer
                      </FormLabel>
                    </FormItem>
                    
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="cod" id="cod" />
                      </FormControl>
                      <FormLabel htmlFor="cod" className="flex items-center gap-2 font-normal cursor-pointer">
                        <BanknoteIcon size={20} />
                        Cash on Delivery
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button type="submit" className="w-full bg-artisan-stone hover:bg-artisan-forest">
          Complete Order
        </Button>
      </form>
    </Form>
  );
};

export default CheckoutForm;
