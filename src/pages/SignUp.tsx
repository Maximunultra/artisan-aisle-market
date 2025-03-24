
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const userFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string(),
  phoneNumber: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  address: z.string().min(5, {
    message: "Address is required.",
  }),
  userType: z.enum(["buyer", "artisan"]),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type UserFormValues = z.infer<typeof userFormSchema>;

const SignUp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      address: "",
      userType: "buyer",
    },
  });

  const onSubmit = (values: UserFormValues) => {
    console.log(values);
    toast({
      title: "Account created successfully!",
      description: "Welcome to Artisans Marketplace.",
    });
    
    // In a real app, this would handle registration with a backend
    // For now we'll just navigate to login
    setTimeout(() => {
      navigate('/signin');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 pb-12">
        <div className="max-w-lg mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold mb-2">Create Account</h1>
            <p className="text-muted-foreground">
              Join our community of artisans and buyers in Legazpi City
            </p>
          </div>

          <Tabs defaultValue="buyer" className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="buyer">Buyer</TabsTrigger>
              <TabsTrigger value="artisan">Artisan</TabsTrigger>
            </TabsList>
            <TabsContent value="buyer" className="mt-4">
              <div className="bg-artisan-cream/20 p-4 rounded-lg mb-6">
                <h3 className="font-medium mb-2">Buyer Account Benefits</h3>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  <li>Browse and purchase unique handmade products</li>
                  <li>Track your orders and delivery status</li>
                  <li>Communicate directly with artisans</li>
                  <li>Get personalized recommendations</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="artisan" className="mt-4">
              <div className="bg-artisan-cream/20 p-4 rounded-lg mb-6">
                <h3 className="font-medium mb-2">Artisan Account Benefits</h3>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  <li>Showcase and sell your handmade products</li>
                  <li>Connect with customers in Legazpi City</li>
                  <li>Manage your inventory and product listings</li>
                  <li>Access sales analytics and customer insights</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>

          <div className="bg-white shadow-sm rounded-lg p-6 border border-artisan-sand/50">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
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
                        <Input placeholder="you@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input placeholder="Create a password" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input placeholder="Confirm your password" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="phoneNumber"
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
                      <FormLabel>Address (in Legazpi City)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="userType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>I want to register as</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="buyer" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Buyer
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="artisan" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Artisan
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="pt-2">
                  <Button type="submit" className="w-full bg-artisan-stone hover:bg-artisan-forest">
                    Create Account
                  </Button>
                </div>
                
                <div className="text-center mt-4 text-sm">
                  Already have an account?{" "}
                  <Link to="/signin" className="text-artisan-accent hover:underline font-medium">
                    Sign In
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;
