import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Header from "./Header.js";
import Footer from "./Footer.js";

// Lazy load components for performance
const Content = React.lazy(() => import("./Content.js"));
const About = React.lazy(() => import("./About.js"));
const Contact = React.lazy(() => import("./Contact.js"));
const Services = React.lazy(() => import("./Services.js"));
const Process = React.lazy(() => import("./Process.js"));
const Careers = React.lazy(() => import("./Careers.js"));
const Privacy = React.lazy(() => import("./Privacy.js"));
const Terms = React.lazy(() => import("./Terms.js"));
const Cookies = React.lazy(() => import("./Cookies.js"));
const Support = React.lazy(() => import("./Support.js"));

const Loading = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '50vh',
    color: 'var(--primary-color)' 
  }}>
    Loading...
  </div>
);

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <main className="main-content">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Content />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              <Route path="/process" element={<Process />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/support" element={<Support />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
