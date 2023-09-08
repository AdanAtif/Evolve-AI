import React from "react";
import Menuitem from "./Menuitem";
const Footer = () => {
  return (
    <footer className="mt-8 bg-gradient-to-r from-teal-600 to-cyan-800 dark:from-slate-800 dark:to-slate-600 text-slate-50 dark:text-cyan-300">
      <Menuitem />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10  text-center pt-2 dark:text-gray-400 text-cyan-950 text-sm pb-8" >
        <span>© 2020 Appy. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
      </div>
    </footer>
  );
};

export default Footer;