
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

const subscribeSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type SubscribeFormValues = z.infer<typeof subscribeSchema>;

const NewsletterSignup: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm<SubscribeFormValues>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: SubscribeFormValues) {
    console.debug('Newsletter signup:', data);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  }

  return (
    <div>
      <h3 className="text-xl font-bold mb-6">Newsletter</h3>
      <p className="mb-4 text-sm">Sign up for travel tips, trip inspo and exclusive offers straight to your inbox</p>
      
      {isSubmitted ? (
        <div className="text-[#CCFF00] font-medium mb-4">
          Thanks for subscribing!
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="Your email address" 
                        className="pr-14 bg-white text-black rounded-full" 
                        {...field} 
                      />
                      <Button 
                        type="submit" 
                        size="sm"
                        className="absolute right-1 top-1 bottom-1 bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 rounded-full px-4"
                      >
                        Subscribe
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      )}
    </div>
  );
};

export default NewsletterSignup;
