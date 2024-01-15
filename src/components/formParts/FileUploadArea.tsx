import React, { useState, ChangeEvent, DragEvent } from 'react';

interface FileData {
  name: string;
  size: number;
}

interface FileUploadAreaProps {
  onFileSelect: (file: File, fileData: FileData) => void;
  onProgress: (percentage: number) => void;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  onFileSelect,
  onProgress,
}) => {
  const [dragging, setDragging] = useState<boolean>(false);

  const handleDrag = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragIn = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };

  const handleDragOut = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      processFile(event.dataTransfer.files[0]);
      event.dataTransfer.clearData();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadstart = () => onProgress(0);
    reader.onprogress = (event: ProgressEvent<FileReader>) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        onProgress(progress);
      }
    };
    reader.readAsDataURL(file);

    onFileSelect(file, {
      name: file.name,
      size: file.size / (1024 * 1024),
    });
  };

  const openFileDialog = () => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  };

  return (
    <div className="w-full p-4 border-2 border-gray-300 rounded-2xl">
      <div
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onChange={handleFileChange}
        onDrop={handleDrop}
        onClick={openFileDialog}
        className={`flex flex-col items-center z-50 justify-center w-full p-4 border-2 border-dashed rounded-lg hover:bg-gray-100 hover:border-gray-300 ${
          dragging ? 'drag-active-class' : ''
        }`}
      >
        <input
          id="fileInput"
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <div className="-pb-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="40px"
            viewBox="0 0 100 120"
            fill="none"
            style={{ display: 'block', margin: 'auto' }}
          >
            <rect x="10" y="10" width="80" height="100" fill="#F59E0B" />

            <polygon points="70,10 90,10 90,30" fill="white" />

            <rect x="30.0" y="70" width="40" height="6" fill="#FFFFFF" />
            <rect x="30.0" y="85" width="40" height="6" fill="#FFFFFF" />
          </svg>
          <div className="z-0 flex items-center justify-center gap-1 text-xs">
            <span className="font-semibold text-[#1f3f6c]">
              Drag & Drop Here Or
            </span>
            <span className="font-extrabold text-[#1f3f6c]">Browse</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mt-4">
        <button className="w-1/2 px-4 py-1 text-sm font-extrabold text-gray-300 rounded-md bg-[#1f3f6c] hover:bg-blue-900">
          Upload Manifest
        </button>
      </div>
    </div>
  );
};

export default FileUploadArea;
