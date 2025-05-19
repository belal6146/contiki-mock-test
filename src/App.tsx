
import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import { BookingProvider } from "@/context/BookingContext";
import { trackPageView } from "@/lib/analytics";

// Import API setup to ensure interceptors are registered
import "@/lib/api";

import Index from "./pages/Index";
import Destinations from "./pages/Destinations";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Tours from "./pages/tours";
import TourDetail from "./pages/TourDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const App = () => {
  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ErrorBoundary>
            <BookingProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/destinations" element={<Destinations />} />
                <Route path="/tours" element={<Tours />} />
                <Route path="/tours/:slug" element={<TourDetail />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BookingProvider>
          </ErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
