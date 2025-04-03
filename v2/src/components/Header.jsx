import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed w-full bg-primary/90 backdrop-blur-sm z-50"
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="text-secondary font-mono text-xl"
          >
            CK
          </motion.div>
          <div className="hidden md:flex space-x-8">
            {['About', 'Experience', 'Projects', 'Contact'].map((item) => (
              <motion.a
                key={item}
                whileHover={{ y: -2 }}
                className="text-textPrimary hover:text-secondary transition-colors"
                href={`#${item.toLowerCase()}`}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
