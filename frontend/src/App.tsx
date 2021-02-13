import React from "react";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <div className="p-3 sm:p-7 bg-gray-900 flex flex-col min-h-screen">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
