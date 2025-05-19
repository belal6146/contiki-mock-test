
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Skeleton } from '@/components/ui/skeleton';

const TourDetailSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero image skeleton */}
      <div className="bg-gray-200 h-96 relative w-full animate-pulse" />
      
      {/* Breadcrumb skeleton */}
      <div className="container py-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-40" />
        </div>
      </div>
      
      {/* Price bar skeleton */}
      <div className="bg-gray-100 py-4">
        <div className="container">
          <div className="flex justify-between items-center">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-8 w-48" />
          </div>
        </div>
      </div>
      
      {/* Details grid skeleton */}
      <div className="container py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col">
              <Skeleton className="h-5 w-20 mb-1" />
              <Skeleton className="h-7 w-32" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Tabs skeleton */}
      <div className="container py-6">
        <div className="flex space-x-4 mb-6">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-8 w-24" />
          ))}
        </div>
        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
      
      <div className="flex-grow" />
      <Footer />
    </div>
  );
};

export default TourDetailSkeleton;
