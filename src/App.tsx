import React from 'react';
import './App.css';
import DocumentUploadModal from './components/DocumentUpload';

const App: React.FC = () => {
  return (
    <html className="App bg-[#9c9c9c] ">
      {/* Note: The head tags should typically be in the index.html file of a React app */}
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <title>RJSV</title>
      </head>
      <div
        className="flex items-center justify-center h-screen"
        style={{ backgroundColor: '#9c9c9c' }}
      >
        <DocumentUploadModal />
      </div>
    </html>
  );
};

export default App;
