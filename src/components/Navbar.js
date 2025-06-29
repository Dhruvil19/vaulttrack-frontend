import React from 'react';

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <nav className="bg-gray-800 text-white flex justify-between px-6 py-3">
      <h1 className="text-xl font-bold">VaultTrack 🔐</h1>
      <button onClick={handleLogout} className="bg-red-500 px-4 py-1 rounded">Logout</button>
    </nav>
  );
};

export default Navbar;