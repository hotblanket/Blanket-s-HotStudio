
import React from 'react';

export const Footer: React.FC<{ siteName: string }> = ({ siteName }) => {
  return (
    <footer className="py-12 border-t border-white/5 bg-black">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <span className="text-xl font-black"><span className="text-brand">BLANKET'S</span> HOTSTUDIO</span>
            <p className="text-gray-500 text-sm mt-2">© 2024 Blanket's Hotstudio. All rights reserved.</p>
          </div>
          
          <div className="flex gap-8">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Twitter</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Youtube</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Roblox</a>
            <a href="#/admin" className="text-gray-800 hover:text-brand transition-colors text-xs font-bold uppercase tracking-widest">Admin Dashboard</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
