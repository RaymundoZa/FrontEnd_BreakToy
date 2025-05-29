// src/components/Header.tsx
import React from 'react';

interface HeaderProps {
  title?: string;
  logoUrl?: string; // URL de tu imagen o logo
}

const Header: React.FC<HeaderProps> = ({ title, logoUrl }) => (
  <header className="bg-white dark:bg-gray-800 shadow-md">
    <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
      <div className="flex items-center space-x-3">
        <img
          src={logoUrl || "Encora.png"}
          alt="Encora Logo"
          className="w-10 h-10 rounded-full object-cover"
        />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {title || "Breakable Toy I: Inventory Management"}
        </h1>
      </div>
      <nav className="space-x-4">
        <a href="#" className="text-gray-600 dark:text-gray-300 hover:underline">
          Home
        </a>
        <a href="#" className="text-gray-600 dark:text-gray-300 hover:underline">
          About
        </a>
        <a href="#" className="text-gray-600 dark:text-gray-300 hover:underline">
          Contact
        </a>
      </nav>
    </div>
  </header>
);

export default Header;
