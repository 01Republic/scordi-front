import React, { useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ContentPanelItem } from '^layouts/ContentLayout/ContentPanel';
import { AiOutlineCloudUpload } from '@react-icons/all-files/ai/AiOutlineCloudUpload';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  cursor: 'pointer',
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

export function InvoiceDropZone() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    getRootProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    multiple: true,
    disabled: isLoading,
    onDrop: (files) => {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    },
  });

  const style: any = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  // console.log(acceptedFiles[0]);

  return (
    <>
      <ContentPanelItem>
        <div {...getRootProps({ className: 'dropzone', style, disabled: true })}>
          {isLoading ? (
            <>
              <p><AiOutlineCloudUpload size={30} /></p>
              <em>업로드 중 ...</em>
            </>
          ) : (
            <>
              <p><AiOutlineCloudUpload size={30} /></p>
              <p>파일을 끌어다 여기에 놓으세요.</p>
            </>
          )}
        </div>
      </ContentPanelItem>

      {acceptedFiles.map((file, i) => (
        <ContentPanelItem key={i}>
          {isLoading ? (
            <p className="text-sm text-gray-500 italic">(분석중...) {file.name}</p>
          ) : (
            <p className="text-sm">{file.name}</p>
          )}
        </ContentPanelItem>
      ))}
    </>
  )
}
