import React from "react";
import Content from "./components/layout/Content";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

function App() {
  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center min-h-screen w-full px-2 sm:px-8">
      <div className="w-full max-w-5xl">
        <Header />
        <Content />
        <Footer />
      </div>
    </div>
  );
}

export default App;
