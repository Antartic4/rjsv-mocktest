import React from 'react';
import './App.css';
import DocumentUploadModal from './components/DocumentUpload';

const App: React.FC = () => {
  return (
    <div className="bg-[#9c9c9c] App">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <div
        className="h-screen xl:w-3/4"
        style={{ display: 'block', margin: 'auto' }}
      >
        <DocumentUploadModal />
      </div>
    </div>
  );
};

export default App;
