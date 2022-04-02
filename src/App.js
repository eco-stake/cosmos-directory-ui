import { useEffect } from "react";

import AppSidebar from "./components/AppSidebar";
import AppHeader from "./components/AppHeader";
import AppContent from "./components/AppContent";
import AppFooter from "./components/AppFooter";

import './scss/style.scss'

export function App() {
  useEffect(() => {
    console.log('rendered');
  });

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  );
}
