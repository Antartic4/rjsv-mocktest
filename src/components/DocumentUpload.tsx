import React, { useState, ChangeEvent } from 'react';
import ClientTypeSelector from './formParts/ClientTypeSelector';
import FileUploadArea from './formParts/FileUploadArea';
import SocialDistancingSchedule from './formParts/SocialDistanceSelector';
import LocationChecking from './formParts/LocationChecking';

interface FileData {
  name: string;
  size: number;
}

const importOptions = [
  {
    id: 1,
    label: 'Import Name #1',
  },
];

const DocumentUploadModal: React.FC = () => {
  const [fileProgress, setFileProgress] = useState<number>(0);
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [clientType, setClientType] = useState<'single' | 'multiple'>('single');
  const [formData, setFormData] = useState(new FormData());

  // handlers

  // Shortens name in case it is too long.
  const formatFileName = (name: string): string => {
    const maxLength = 30;
    const extension = name.split('.').pop()?.toLowerCase() || '';
    let shortName = name.split('.').slice(0, -1).join('.');
    if (shortName.length > maxLength) {
      shortName = shortName.substring(0, maxLength) + '...';
    }
    return `${shortName}.${extension}`;
  };

  // handle client type change
  const handleClientTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('handleClientTypeChange');
    setClientType(event.target.value as 'single' | 'multiple');
  };

  // handle progress bar
  const handleProgress = (progress: number) => {
    setFileProgress(progress);
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
              {importOptions.map((item) => (
                <option key={item.id} value={item.label}>
                  {item.label}
                </option>
              ))}
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
              </svg>
            </div>
          </div>
        </div>
      );
    }
    return tempBuild;
  };

  const handleFileSelect = (file: File, fileData: FileData) => {
    setFileData(fileData);
    const newFormData = new FormData();
    newFormData.append('file', file);
    setFormData(newFormData);
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
                <div className="w-3/5 border-t border-b"></div>
                <div className="text-left">
                  <label className="text-xs font-bold text-[#1f3f6c]">
                    Select a manifest that you'd like to import
                  </label>
                  <div className="py-1.5">
                    <FileUploadArea
                      onFileSelect={handleFileSelect}
                      onProgress={handleProgress}
                    />
                  </div>
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
            </div>
            <div className="xs:col-span-1 md:hidden"></div>
            <div className="xs:col-span-1 md:hidden"></div>
            <div className="md:col-span-4 xs:col-span-10">
              <div
                className="xs:px-0 md:px-4 xs:pt-3 md:pt-0"
                style={{ overflowX: 'visible', whiteSpace: 'nowrap' }}
              >
                <div className="text-left border-gray-300">
                  <SocialDistancingSchedule />
                  <LocationChecking />
                  <div className="pb-4 text-left border-t border-gray-300">
                    <h1 className="pt-4 text-sm font-extrabold text-[#1f3f6c]">
                      Client:
                    </h1>
                    <div className="flex items-center justify-start gap-2 ">
                      <ClientTypeSelector
                        clientType={clientType}
                        onClientTypeChange={handleClientTypeChange}
                      />
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
