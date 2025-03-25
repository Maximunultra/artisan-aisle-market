
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = React.useState<'email' | 'verification' | 'newPassword'>('email');
  
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmitEmail = (values: ForgotPasswordValues) => {
    console.log(values);
    toast({
      title: "Verification code sent",
      description: "Please check your email for a verification code.",
    });
    
    // In a real app, this would trigger an API call to send the verification code
    // For this demo, we'll just move to the next step
    setStep('verification');
  };

  const onSubmitVerification = (values: string) => {
    console.log("Verification code:", values);
    
    toast({
      title: "Code verified",
      description: "You can now create a new password.",
    });
    
    // In a real app, this would verify the code with an API
    // For this demo, we'll just move to the next step
    setStep('newPassword');
  };

  const onSubmitNewPassword = (values: { password: string, confirmPassword: string }) => {
    console.log("New password:", values);
    
    toast({
      title: "Password reset successful",
      description: "Your password has been reset. You can now sign in with your new password.",
    });
    
    // In a real app, this would update the password via an API
    // For this demo, we'll just redirect to sign in
    setTimeout(() => {
      navigate('/signin');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 pb-12">
        <div className="max-w-md mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold mb-2">Reset Your Password</h1>
            <p className="text-muted-foreground">
              {step === 'email' && "Enter your email to receive a verification code"}
              {step === 'verification' && "Enter the verification code sent to your email"}
              {step === 'newPassword' && "Create a new password for your account"}
            </p>
          </div>

          <div className="bg-white shadow-sm rounded-lg p-6 border border-artisan-sand/50">
            {step === 'email' && (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitEmail)} className="space-y-4">
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
                  
                  <div className="pt-2">
                    <Button type="submit" className="w-full bg-artisan-stone hover:bg-artisan-forest">
                      Send Reset Code
                    </Button>
                  </div>
                  
                  <div className="text-center mt-4 text-sm">
                    Remember your password?{" "}
                    <Link to="/signin" className="text-artisan-accent hover:underline font-medium">
                      Sign In
                    </Link>
                  </div>
                </form>
              </Form>
            )}
            
            {step === 'verification' && (
              <div className="space-y-4">
                <div className="mb-6">
                  <FormLabel className="block mb-2">Verification Code</FormLabel>
                  <InputOTP maxLength={6} onComplete={onSubmitVerification}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  <p className="text-sm text-muted-foreground mt-2">
                    Enter the 6-digit code sent to your email
                  </p>
                </div>
                
                <div className="text-center">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-artisan-clay"
                    onClick={() => setStep('email')}
                  >
                    Back to Email
                  </Button>
                </div>
              </div>
            )}
            
            {step === 'newPassword' && (
              <form 
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const password = formData.get('password') as string;
                  const confirmPassword = formData.get('confirmPassword') as string;
                  onSubmitNewPassword({ password, confirmPassword });
                }}
              >
                <div>
                  <FormLabel htmlFor="password" className="block mb-2">New Password</FormLabel>
                  <Input 
                    id="password" 
                    name="password"
                    type="password" 
                    placeholder="Create a new password" 
                    className="w-full"
                    required
                    minLength={8}
                  />
                </div>
                
                <div>
                  <FormLabel htmlFor="confirmPassword" className="block mb-2">Confirm Password</FormLabel>
                  <Input 
                    id="confirmPassword" 
                    name="confirmPassword"
                    type="password" 
                    placeholder="Confirm your new password" 
                    className="w-full"
                    required
                    minLength={8}
                  />
                </div>
                
                <div className="pt-2">
                  <Button type="submit" className="w-full bg-artisan-stone hover:bg-artisan-forest">
                    Reset Password
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
