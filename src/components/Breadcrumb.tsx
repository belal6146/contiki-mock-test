
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbNavProps {
  title: string;
  destination?: string;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ title, destination }) => {
  useEffect(() => {
    console.debug('[Breadcrumb] mounted', { title, destination });
  }, [title, destination]);

  return (
    <div className="container py-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          
          <BreadcrumbSeparator />
          
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/tours">Tours</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          
          {destination && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/destinations/${destination.toLowerCase()}`}>{destination}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          
          <BreadcrumbSeparator />
          
          <BreadcrumbItem>
            <BreadcrumbPage>{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbNav;
