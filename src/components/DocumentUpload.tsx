import React, { useState, ChangeEvent, DragEvent, useRef } from 'react';

interface FileData {
  name: string;
  size: number;
}

const DocumentUploadModal: React.FC = () => {
  const [fileProgress, setFileProgress] = useState<number>(0);
  const [dragging, setDragging] = useState<boolean>(false);
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [clientType, setClientType] = useState<'single' | 'multiple'>('single');
  const [formData, setFormData] = useState(new FormData());
  const [selectedTime, setSelectedTime] = useState('');
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const timeInputRef = useRef<HTMLInputElement>(null);

  const openTimePickerModal = () => {
    setIsTimePickerOpen(true);
  };

  const closeTimePickerModal = () => {
    setIsTimePickerOpen(false);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(event.target.value);
    closeTimePickerModal();
  };

  // handlers
  // file change
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();

      reader.onloadstart = () => {
        setFileProgress(0);
      };

      reader.onprogress = (event: ProgressEvent<FileReader>) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setFileProgress(progress);
        }
      };

      reader.readAsDataURL(file);

      setFileData({
        name: file.name,
        size: file.size / (1024 * 1024),
      });

      // Update formData
      const newFormData = new FormData();
      newFormData.append('file', file);
      newFormData.append('fileName', file.name);
      newFormData.append('fileSize', (file.size / (1024 * 1024)).toString());
      setFormData(newFormData);

      logFormData(newFormData);
    }
  };

  // Shortens name in case it's too long.
  const formatFileName = (name: string): string => {
    const maxLength = 30;
    const extension = name.split('.').pop()?.toLowerCase() || '';
    let shortName = name.split('.').slice(0, -1).join('.');
    if (shortName.length > maxLength) {
      shortName = shortName.substring(0, maxLength) + '...';
    }
    return `${shortName}.${extension}`;
  };

  // handle drag
  const handleDrag = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  // handle drag-in
  const handleDragIn = (event: DragEvent<HTMLDivElement>) => {
    console.log('HandleDragIn active');
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };

  const logFormData = (formData: FormData) => {
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  };

  // handle drag-out
  const handleDragOut = (event: DragEvent<HTMLDivElement>) => {
    console.log('handleDragOut active.');
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
  };

  // handle drop
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    console.log('handleDrop');
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      const reader = new FileReader();

      reader.onloadstart = () => {
        setFileProgress(0);
      };

      reader.onprogress = (event: ProgressEvent<FileReader>) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setFileProgress(progress);
        }
      };

      reader.readAsDataURL(file);

      setFileData({
        name: file.name,
        size: file.size / (1024 * 1024),
      });

      const newFormData = new FormData();
      newFormData.append('file', file);
      setFormData(newFormData);

      event.dataTransfer.clearData();
    }
  };
  // handle client type change
  const handleClientTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('handleClientTypeChange');
    setClientType(event.target.value as 'single' | 'multiple');
  };

  // rendering the Clients section on whether button was pressed
  // (well, made it a formula but I just use it with params 1 and 4.)

  const clientBox = (number: number): JSX.Element[] => {
    let tempBuild: JSX.Element[] = [];
    for (let i = 0; i < number; i++) {
      tempBuild.push(
        <div
          key={i}
          className="flex items-center justify-between py-2 text-[#1f3f6c]"
        >
          <h1 className="pr-3 text-xs font-medium whitespace-nowrap">
            Testing Center {i + 1}
          </h1>
          <div className="flex items-center">
            <select
              className="select-box-2"
              defaultValue=""
              aria-label="Select Client"
            >
              <option value="" disabled hidden>
                Select Client
              </option>
              <option className="p-2 text-base font-bold" value="Client-1">
                Client-1
              </option>
              <option className="p-2 text-base font-bold" value="Client-2">
                Client-2
              </option>
              <option className="p-2 text-base font-bold" value="Client-3">
                Client-3
              </option>
              <option className="p-2 text-base font-bold" value="Client-4">
                Client-4
              </option>
              <option className="p-2 text-base font-bold" value="Client-5">
                Client-5
              </option>
            </select>

            <div className="ml-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>{' '}
            </div>
          </div>
        </div>
      );
    }
    return tempBuild;
  };

  const openFileDialog = () => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  };

  return (
    <div className="p-5" id="my-modal">
      <div className="relative w-full pb-10 mx-auto bg-white border shadow-lg rounded-2xl">
        <div className="">
          <div className="pt-5 pl-5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1f3f6c]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="flex items-center justify-center w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          <span className="pb-3 text-2xl font-bold leading-6 border-b text-[#1f3f6c]">
            Document Upload
          </span>
          <div className="pt-5"></div>
          {/* 12 columns */}
          <div className="grid grid-cols-12 mt-4">
            {/* 1 space */}
            <div className="col-span-1"></div>
            {/* 6 spaces */}

            <div className="col-span-10 pr-6 md:col-span-6">
              <div className="space-y-4">
                <div>
                  <select
                    className="font-extrabold select-box"
                    defaultValue=""
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      color: '#1f3f6c',
                    }}
                  >
                    <option value="" disabled hidden>
                      Select Import Name:
                    </option>
                    <option value="import_name_1" className="text-lg">
                      Import name #1
                    </option>
                    <option value="import_name_2" className="text-lg">
                      Import name #2
                    </option>
                    <option value="import_name_3" className="text-lg">
                      Import name #3
                    </option>
                    <option value="import_name_4" className="text-lg">
                      Import name #4
                    </option>
                    <option value="import_name_5" className="text-lg">
                      Import name #5
                    </option>
                  </select>
                </div>
                <div className="w-1/2 border-t border-b"></div>
                <div className="text-left">
                  <label className="text-xs font-bold text-[#1f3f6c]">
                    Select a manifest that you'd like to import
                  </label>
                  <div className="py-1.5"></div>
                  <form className="w-full p-4 border-2 border-gray-300 rounded-2xl">
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
                          <rect
                            x="10"
                            y="10"
                            width="80"
                            height="100"
                            fill="#F59E0B"
                          />

                          <polygon points="70,10 90,10 90,30" fill="white" />

                          <rect
                            x="30.0"
                            y="70"
                            width="40"
                            height="6"
                            fill="#FFFFFF"
                          />
                          <rect
                            x="30.0"
                            y="85"
                            width="40"
                            height="6"
                            fill="#FFFFFF"
                          />
                        </svg>
                        <div className="z-0 flex items-center justify-center gap-1 text-xs">
                          <span className="font-semibold text-[#1f3f6c]">
                            Drag & Drop Here Or
                          </span>
                          <span className="font-extrabold text-[#1f3f6c]">
                            Browse
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center mt-4">
                      <button className="w-1/2 px-4 py-1 text-sm font-extrabold text-gray-300 rounded-md bg-[#1f3f6c] hover:bg-blue-900">
                        Upload Manifest
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div>
                {fileData && (
                  <div className="flex items-center justify-between mt-4 border-t border-b">
                    <div className="flex items-center flex-1 gap-4">
                      <span className="p-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30px"
                          height="50px"
                          viewBox="0 0 100 120"
                          fill="none"
                        >
                          <rect
                            x="10"
                            y="10"
                            width="80"
                            height="100"
                            fill="#F59E0B"
                          />

                          <polygon points="70,10 90,10 90,30" fill="white" />

                          <rect
                            x="30.0"
                            y="70"
                            width="40"
                            height="6"
                            fill="#FFFFFF"
                          />
                          <rect
                            x="30.0"
                            y="85"
                            width="40"
                            height="6"
                            fill="#FFFFFF"
                          />
                        </svg>
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="w-3/4 overflow-hidden text-sm text-gray-300 text-start whitespace-nowrap">
                            {formatFileName(fileData.name)}
                          </span>
                          <span className="text-xs font-bold text-gray-400">
                            {fileData.size.toFixed(2)} MB
                          </span>
                        </div>
                        {fileProgress > 0 && (
                          <div className="w-full h-2 mt-2 ">
                            <div
                              className="h-1/2 bg-[#F59E0B]"
                              style={{ width: `${fileProgress}%` }}
                            ></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="pb-4 text-left">
                <div className="w-1/2 pt-4 border-t border-b"></div>
                <h1 className="pt-2 text-sm font-extrabold text-[#1f3f6c]">
                  Elapse Data Checking:
                </h1>
                <h1 className="pt-2 text-sm font-semibold">
                  {fileProgress === 100 ? (
                    <span className="font-bold text-green-400">
                      No Elapsed Dates!
                    </span>
                  ) : (
                    <span className=""></span>
                  )}
                </h1>
              </div>
              <div className="w-1/2 border-t border-b"></div>
              <div className="pb-2 text-left">
                <h1 className="pt-2 text-sm font-extrabold text-[#1f3f6c]">
                  Tolerance Window:
                </h1>
                <div className="flex justify-start gap-3 pt-2">
                  <div>
                    <h1 className="text-base font-semibold">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          value=""
                          className="sr-only peer"
                          defaultChecked={isChecked}
                          onChange={(e) => setIsChecked(e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1f3f6c]"></div>
                        <span className="text-sm font-medium text-[#1f3f6c] ms-3 ">
                          {isChecked ? 'Toggle ON' : 'Toggle OFF'}
                        </span>
                      </label>
                    </h1>
                  </div>
                  <div className="border-l border-r border-gray-300"></div>
                  <div className="flex gap-1" onClick={openTimePickerModal}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <h1 className="text-[#1f3f6c] text-sm">
                      Select Tolerance Level
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="xs:col-span-1 md:hidden"></div>
            <div className="xs:col-span-1 md:hidden"></div>
            <div className="md:col-span-4 xs:col-span-10">
              <div
                className="xs:px-0 md:px-4 xs:pt-3 md:pt-0"
                style={{ overflowX: 'visible', whiteSpace: 'nowrap' }}
              >
                <div className="text-left border-gray-300">
                  <h1 className="pb-1 text-sm font-bold text-[#1f3f6c] ">
                    Split schedule using social distancing?
                  </h1>
                  <div className="flex items-center justify-start gap-2 pb-2">
                    <div className="flex items-center justify-center gap-2">
                      <input
                        id="bordered-radio-1"
                        type="radio"
                        value=""
                        name="bordered-radio"
                        className="w-10 h-10"
                      />
                      <label
                        htmlFor="bordered-radio-1"
                        className="w-full text-sm font-medium text-[#1f3f6c]"
                      >
                        Yes
                      </label>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <input
                        id="bordered-radio-1"
                        type="radio"
                        value=""
                        name="bordered-radio"
                        className="w-10 h-10"
                      />
                      <label
                        htmlFor="bordered-radio-1"
                        className="w-full text-sm font-medium text-[#1f3f6c]"
                      >
                        No
                      </label>
                    </div>
                  </div>
                  <div className="pb-4 text-left border-t border-gray-300">
                    <h1 className="pt-4 text-sm font-extrabold text-[#1f3f6c]">
                      Location Checking:
                    </h1>
                    <h1 className="pt-2 text-sm font-bold text-green-400">
                      All Available!
                    </h1>
                  </div>
                  <div className="pb-4 text-left border-t border-gray-300">
                    <h1 className="pt-4 text-sm font-extrabold text-[#1f3f6c]">
                      Client:
                    </h1>
                    <div className="flex items-center justify-start gap-2 ">
                      <div className="flex items-center justify-center gap-2">
                        <input
                          type="radio"
                          value="single"
                          name="clientType"
                          checked={clientType === 'single'}
                          onChange={handleClientTypeChange}
                          className="w-10 h-10"
                        />
                        <label
                          htmlFor="bordered-radio-1"
                          className="w-full text-sm font-medium text-[#1f3f6c]"
                        >
                          Single
                        </label>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <input
                          type="radio"
                          value="multiple"
                          name="clientType"
                          checked={clientType === 'multiple'}
                          onChange={handleClientTypeChange}
                          className="w-10 h-10"
                        />
                        <label
                          htmlFor="bordered-radio-1"
                          className="w-full text-sm font-medium text-[#1f3f6c]"
                        >
                          Multiple
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    {clientType === 'single' ? clientBox(1) : clientBox(4)}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-12 pt-4 text-center">
              <span className="pb-4 font-extrabold text-[#1f3f6c]">
                Data in the import file is correct. Please press Continue to
                import.
              </span>
              <div className="grid grid-cols-12 pt-4 text-base font-bold">
                <div className="col-span-3"></div>
                <button className="col-span-3 py-3 ml-10 mr-2 text-xs text-gray-300 rounded-lg bg-[#1f3f6c]">
                  Continue Import
                </button>
                <button className="col-span-3 py-3 ml-2 mr-10 text-xs text-yellow-500 bg-white border-2 border-yellow-500 rounded-lg">
                  Cancel
                </button>
                <div className="col-span-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadModal;
