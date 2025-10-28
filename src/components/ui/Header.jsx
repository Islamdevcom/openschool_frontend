import React from "react";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md rounded-xl">
      <div className="flex items-center gap-3">
        <img
          src="/logo.png"
          alt="OpenSchool Logo"
          className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
        />
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          OpenSchool.ai
        </h1>
      </div>
    </header>
  );
};

export default Header;
