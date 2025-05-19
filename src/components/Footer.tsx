
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Search } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const subscribeSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type SubscribeFormValues = z.infer<typeof subscribeSchema>;

const Footer = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  useEffect(() => {
    console.debug('[Footer] mounted');
  }, []);
  
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
    <footer className="bg-black text-white pt-12 pb-8 font-montserrat">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 px-4">
          <div>
            <h3 className="text-xl font-bold mb-6">About</h3>
            <ul className="space-y-3">
              <li><Link to="/about-us" className="text-white hover:text-[#CCFF00] transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-white hover:text-[#CCFF00] transition-colors">Careers</Link></li>
              <li><Link to="/contact-us" className="text-white hover:text-[#CCFF00] transition-colors">Contact Us</Link></li>
              <li><Link to="/sustainability" className="text-white hover:text-[#CCFF00] transition-colors">Sustainability</Link></li>
              <li><Link to="/travel-alerts" className="text-white hover:text-[#CCFF00] transition-colors">Travel Alerts</Link></li>
              <li><Link to="/why-contiki" className="text-white hover:text-[#CCFF00] transition-colors">Why Contiki?</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Help</h3>
            <ul className="space-y-3">
              <li><Link to="/help/manage-booking" className="text-white hover:text-[#CCFF00] transition-colors">Manage My Booking</Link></li>
              <li><Link to="/help/faqs" className="text-white hover:text-[#CCFF00] transition-colors">FAQs</Link></li>
              <li><Link to="/terms-conditions" className="text-white hover:text-[#CCFF00] transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy-policy" className="text-white hover:text-[#CCFF00] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/cookie-policy" className="text-white hover:text-[#CCFF00] transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/brochures" className="text-white hover:text-[#CCFF00] transition-colors">Brochures</Link></li>
              <li><Link to="/360-travel-updates" className="text-white hover:text-[#CCFF00] transition-colors">360° Travel Updates</Link></li>
              <li><Link to="/travel-insurance" className="text-white hover:text-[#CCFF00] transition-colors">Travel Insurance</Link></li>
              <li><Link to="/events" className="text-white hover:text-[#CCFF00] transition-colors">Events</Link></li>
              <li><Link to="/blog" className="text-white hover:text-[#CCFF00] transition-colors">Blog</Link></li>
              <li><Link to="/travel-checklist" className="text-white hover:text-[#CCFF00] transition-colors">Travel Checklist</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Newsletter</h3>
            <p className="mb-4">Sign up to receive deals, trip inspo and FOMO-inducing travel news straight to your inbox.</p>
            
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
                              className="pr-14 bg-white text-black" 
                              {...field} 
                            />
                            <Button 
                              type="submit" 
                              size="sm"
                              className="absolute right-1 top-1 bottom-1 bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90"
                              aria-label="Subscribe"
                            >
                              <Search size={16} />
                            </Button>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            )}
            
            <div className="mt-8">
              <h4 className="font-medium mb-4">Connect with us</h4>
              <div className="flex space-x-4">
                <a href="https://facebook.com/contiki" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#CCFF00]" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
                <a href="https://instagram.com/contiki" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#CCFF00]" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="https://twitter.com/contiki" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#CCFF00]" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
                <a href="https://youtube.com/user/contiki" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#CCFF00]" aria-label="Youtube">
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="px-4">
          <Separator className="bg-white/20" />
        </div>
        
        <div className="px-4 pt-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div className="mb-6 md:mb-0">
              <h4 className="font-medium mb-4">We're proud members of</h4>
              <div className="flex items-center space-x-6">
                <div className="bg-white p-2 rounded-md">
                  <img src="https://www.contiki.com/assets/images/footer/abta_logo.svg" alt="ABTA" className="h-8" />
                </div>
                <div>
                  <img src="https://www.contiki.com/assets/images/footer/tripadvisor.svg" alt="TripAdvisor" className="h-10" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Payment options</h4>
              <div className="flex flex-wrap gap-2">
                <img src="https://www.contiki.com/assets/images/footer/visa.svg" alt="Visa" className="h-8" />
                <img src="https://www.contiki.com/assets/images/footer/mastercard.svg" alt="Mastercard" className="h-8" />
                <img src="https://www.contiki.com/assets/images/footer/paypal.svg" alt="PayPal" className="h-8" />
              </div>
            </div>
          </div>
          
          <div className="text-xs text-white/70">
            <p className="mb-4">
              Copyright © {new Date().getFullYear()} Contiki. All Rights Reserved. Contiki is part of The Travel Corporation family of companies.
            </p>
            <p>
              Travel is an exciting and important part of people's lives. It connects us to new places, experiences and people. It's magical when it all comes together, but we know that the realities of travel can sometimes be complicated. That's why we are here to help. By partnering with us, you are trusting us to make sure your holiday plans go smoothly. We want you to have a fantastic time, and to ensure this happens we want to make sure that the way we work is clear and fair.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
