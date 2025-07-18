import React from 'react';
import Hero from '../components/Hero';
import DynamicShowcase from '../components/DynamicShowcase';
import Features from '../components/Features';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <DynamicShowcase />
      <Features />
    </div>
  );
};

export default Home; 