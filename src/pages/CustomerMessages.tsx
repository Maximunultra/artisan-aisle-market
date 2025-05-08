
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomerMessages from '../components/CustomerMessages';

const CustomerMessagesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20 pb-8 md:pb-12">
        <div className="artisan-container px-3 md:px-4">
          <div className="my-6 md:my-12">
            <h1 className="text-3xl md:text-5xl font-serif mb-2 md:mb-4">My Messages</h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
              Communicate with artisans about their products and your orders
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-3 md:p-6">
            <CustomerMessages />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomerMessagesPage;
