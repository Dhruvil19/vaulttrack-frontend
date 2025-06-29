// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UploadForm from '../components/UploadForm';

const Dashboard = () => {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/upload', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFiles(res.data);
    } catch (err) {
      console.error('Fetch error', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/upload/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchFiles();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const handleDownload = (id) => {
    const token = localStorage.getItem('token');
    window.open(`http://localhost:5000/api/upload/${id}/download?token=${token}`);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-5 shadow-md">
        <h1 className="text-xl font-bold text-blue-700 mb-6">VaultTrack 🔐</h1>
        <nav className="flex flex-col space-y-4">
          <a href="/" className="flex items-center text-gray-700 hover:text-blue-600">
            🏠 Home
          </a>
          <a href="/upload" className="flex items-center text-gray-700 hover:text-blue-600">
            ⬆ Upload
          </a>
          <a href="/dashboard" className="flex items-center text-blue-600 font-semibold">
            📄 My Files
          </a>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
            className="text-red-500 hover:underline text-left"
          >
            🚪 Logout
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-white overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">My Drive</h2>
          <UploadForm onUploadSuccess={fetchFiles} />
        </div>

        <table className="w-full text-left border-t border-gray-200">
          <thead>
            <tr className="text-gray-500 text-sm uppercase">
              <th className="py-2">File Name</th>
              <th className="py-2">Size</th>
              <th className="py-2">Date</th>
              <th className="py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file._id} className="hover:bg-gray-50 border-b">
                <td className="py-2">📄 {file.originalname}</td>
                <td className="py-2">{(file.size / 1024).toFixed(1)} KB</td>
                <td className="py-2">{new Date(file.uploadDate).toLocaleDateString()}</td>
                <td className="py-2 text-right space-x-2">
                  <button
                    onClick={() => handleDownload(file._id)}
                    className="text-green-600 hover:underline"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => handleDelete(file._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Dashboard;
