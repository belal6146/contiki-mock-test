
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { trackPageView, trackError } from "@/lib/analytics";
import { Helmet } from "react-helmet";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
    trackError(
      "NotFound",
      `404 Error: User attempted to access non-existent route: ${location.pathname}`,
      { path: location.pathname }
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Helmet>
        <title>Page Not Found | Contiki</title>
        <meta name="description" content="The page you're looking for cannot be found. Please check the URL or navigate back to the homepage." />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Page Not Found | Contiki" />
        <meta property="og:description" content="The page you're looking for cannot be found." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
