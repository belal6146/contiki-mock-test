
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// Import slick carousel CSS
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

createRoot(document.getElementById("root")!).render(<App />);
