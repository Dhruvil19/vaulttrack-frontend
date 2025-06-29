import React from 'react';

const Sidebar = () => {
  return (
    <aside className="bg-gray-100 h-full w-48 p-4">
      <ul className="space-y-3">
        <li className="font-semibold">📁 Home</li>
        <li className="font-semibold">⬆️ Upload</li>
        <li className="font-semibold">📄 My Files</li>
      </ul>
    </aside>
  );
};

export default Sidebar;