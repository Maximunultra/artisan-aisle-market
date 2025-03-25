
import React, { useState } from 'react';
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
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, User, Phone, MapPin, Lock } from 'lucide-react';
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
  }).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message: "Password must include uppercase, lowercase, number and special character.",
    }
  ),
  confirmPassword: z.string(),
  phoneNumber: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  address: z.string().min(5, {
    message: "Address is required.",
  }),
  userType: z.enum(["buyer", "artisan"]),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions." }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type UserFormValues = z.infer<typeof userFormSchema>;

const SignUp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState<"buyer" | "artisan">("buyer");
  
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
      termsAccepted: false,
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

  const handleTabChange = (value: string) => {
    if (value === "buyer" || value === "artisan") {
      setUserType(value);
      form.setValue("userType", value);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 pb-12 bg-[#FCFAF7]">
        <div className="max-w-lg mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold mb-2">Create Account</h1>
            <p className="text-muted-foreground">
              Join our community of artisans and buyers in Legazpi City
            </p>
          </div>

          <Tabs 
            defaultValue="buyer" 
            className="w-full mb-6"
            onValueChange={handleTabChange}
          >
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

          <div className="bg-white shadow-md rounded-lg p-8 border border-artisan-sand/30">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <FormControl>
                          <Input placeholder="Enter your full name" className="pl-10" {...field} />
                        </FormControl>
                      </div>
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
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <FormControl>
                          <Input placeholder="you@example.com" type="email" className="pl-10" {...field} />
                        </FormControl>
                      </div>
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
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                          <FormControl>
                            <Input 
                              placeholder="Create a password" 
                              type={showPassword ? "text" : "password"} 
                              className="pl-10 pr-10" 
                              {...field} 
                            />
                          </FormControl>
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? 
                              <EyeOff className="h-4 w-4" /> : 
                              <Eye className="h-4 w-4" />
                            }
                          </button>
                        </div>
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
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                          <FormControl>
                            <Input 
                              placeholder="Confirm your password" 
                              type={showConfirmPassword ? "text" : "password"} 
                              className="pl-10 pr-10" 
                              {...field} 
                            />
                          </FormControl>
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? 
                              <EyeOff className="h-4 w-4" /> : 
                              <Eye className="h-4 w-4" />
                            }
                          </button>
                        </div>
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
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <FormControl>
                          <Input placeholder="Enter your phone number" className="pl-10" {...field} />
                        </FormControl>
                      </div>
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
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <FormControl>
                          <Input placeholder="Enter your address" className="pl-10" {...field} />
                        </FormControl>
                      </div>
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
                          value={field.value}
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
                
                <FormField
                  control={form.control}
                  name="termsAccepted"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          I agree to the{" "}
                          <Link to="#" className="text-artisan-accent hover:underline">
                            terms of service
                          </Link>
                          {" "}and{" "}
                          <Link to="#" className="text-artisan-accent hover:underline">
                            privacy policy
                          </Link>
                        </FormLabel>
                      </div>
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
