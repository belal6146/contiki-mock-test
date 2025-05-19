
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Search, Tiktok } from 'lucide-react';
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
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  
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
            <h3 className="text-xl font-bold mb-6">Company</h3>
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
            <h3 className="text-xl font-bold mb-6">Destinations</h3>
            <ul className="space-y-3">
              <li><Link to="/destinations/europe" className="text-white hover:text-[#CCFF00] transition-colors">Europe</Link></li>
              <li><Link to="/destinations/asia" className="text-white hover:text-[#CCFF00] transition-colors">Asia</Link></li>
              <li><Link to="/destinations/latin-america" className="text-white hover:text-[#CCFF00] transition-colors">Latin America</Link></li>
              <li><Link to="/destinations/usa-canada" className="text-white hover:text-[#CCFF00] transition-colors">USA & Canada</Link></li>
              <li><Link to="/destinations/australia-new-zealand" className="text-white hover:text-[#CCFF00] transition-colors">Australia & New Zealand</Link></li>
              <li><Link to="/destinations/africa-middle-east" className="text-white hover:text-[#CCFF00] transition-colors">Africa & Middle East</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Help</h3>
            <ul className="space-y-3">
              <li><Link to="/help/manage-booking" className="text-white hover:text-[#CCFF00] transition-colors">Manage My Booking</Link></li>
              <li><Link to="/help/faqs" className="text-white hover:text-[#CCFF00] transition-colors">FAQs</Link></li>
              <li><Link to="/help/travel-documents" className="text-white hover:text-[#CCFF00] transition-colors">Travel Documents</Link></li>
              <li><Link to="/help/travel-insurance" className="text-white hover:text-[#CCFF00] transition-colors">Travel Insurance</Link></li>
              <li><Link to="/help/visas-passports" className="text-white hover:text-[#CCFF00] transition-colors">Visas & Passports</Link></li>
              <li><Link to="/brochures" className="text-white hover:text-[#CCFF00] transition-colors">Brochures</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/terms-conditions" className="text-white hover:text-[#CCFF00] transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy-policy" className="text-white hover:text-[#CCFF00] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/cookie-policy" className="text-white hover:text-[#CCFF00] transition-colors">Cookie Policy</Link></li>
              <li><Link to="/booking-conditions" className="text-white hover:text-[#CCFF00] transition-colors">Booking Conditions</Link></li>
            </ul>
            
            <h3 className="text-xl font-bold mt-8 mb-6">Newsletter</h3>
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
            
            <div className="mt-8">
              <h4 className="font-medium mb-4">Connect with us</h4>
              <div className="flex space-x-4">
                <a href="https://facebook.com/contiki" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="bg-white hover:bg-[#CCFF00] text-black p-2 rounded-full transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="https://instagram.com/contiki" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="bg-white hover:bg-[#CCFF00] text-black p-2 rounded-full transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="https://youtube.com/user/contiki" target="_blank" rel="noopener noreferrer" aria-label="Youtube" className="bg-white hover:bg-[#CCFF00] text-black p-2 rounded-full transition-colors">
                  <Youtube size={18} />
                </a>
                <a href="https://tiktok.com/@contiki" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="bg-white hover:bg-[#CCFF00] text-black p-2 rounded-full transition-colors">
                  <Tiktok size={18} />
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
              <h4 className="font-medium mb-4">We're part of</h4>
              <div className="flex items-center space-x-6">
                <div className="bg-white p-2 rounded-md">
                  <img src="https://www.contiki.com/assets/images/footer/ttc_logo.svg" alt="The Travel Corporation" className="h-8" />
                </div>
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
                <img src="https://www.contiki.com/assets/images/footer/amex.svg" alt="American Express" className="h-8" />
                <img src="https://www.contiki.com/assets/images/footer/paypal.svg" alt="PayPal" className="h-8" />
              </div>
            </div>
          </div>
          
          <div className="text-xs text-white/70">
            <p className="mb-4">
              Copyright © {new Date().getFullYear()} Contiki. All Rights Reserved. Contiki is part of The Travel Corporation family of companies.
            </p>
            <p>
              Travel is an exciting and important part of people's lives. It connects us to new places, experiences and people. When you book with Contiki, you're not just choosing a holiday, you're opening the door to new friendships, experiences, and perspectives that will stay with you for life. Our team is dedicated to ensuring your trip is hassle-free and unforgettable. With over 60 years of experience, we've mastered the art of social travel for 18-35 year olds.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
