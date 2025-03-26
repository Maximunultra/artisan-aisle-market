
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
import { Label } from "@/components/ui/label";

const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

// Schema for the new password step
const newPasswordSchema = z.object({
  password: z.string().min(8, { 
    message: "Password must be at least 8 characters." 
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type NewPasswordValues = z.infer<typeof newPasswordSchema>;

const ForgotPassword = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = React.useState<'email' | 'verification' | 'newPassword'>('email');
  
  const emailForm = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const passwordForm = useForm<NewPasswordValues>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
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

  const onSubmitNewPassword = (values: NewPasswordValues) => {
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
              <Form {...emailForm}>
                <form onSubmit={emailForm.handleSubmit(onSubmitEmail)} className="space-y-4">
                  <FormField
                    control={emailForm.control}
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
                  <Label className="block mb-2">Verification Code</Label>
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
              <Form {...passwordForm}>
                <form 
                  onSubmit={passwordForm.handleSubmit(onSubmitNewPassword)}
                  className="space-y-4"
                >
                  <FormField
                    control={passwordForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="Create a new password" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="Confirm your new password" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-2">
                    <Button type="submit" className="w-full bg-artisan-stone hover:bg-artisan-forest">
                      Reset Password
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
