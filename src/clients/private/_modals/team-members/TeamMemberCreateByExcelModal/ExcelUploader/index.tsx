import {memo, useCallback, useState} from 'react';
import {DropEvent, ErrorCode, FileRejection, useDropzone} from 'react-dropzone';
import {toast} from 'react-hot-toast';
import {FileItem} from './FileItem';

interface ExcelUploaderProps {
    onChange?: (file?: File) => any;
    onReset?: () => any;
    isLoading?: boolean;
    errorMsg?: string;
}

export const ExcelUploader = memo((props: ExcelUploaderProps) => {
    const {onChange, onReset, isLoading = false, errorMsg} = props;
    const [file, setFile] = useState<File>();

    const fileAdd = (file: File) => {
        setFile(file);
        onChange && onChange(file);
    };

    const fileRemove = () => {
        setFile(undefined);
        onChange && onChange(undefined);
        onReset && onReset();
    };

    const onDrop = useCallback(
        ([acceptedFile]: File[], [rejectedFile]: FileRejection[], event: DropEvent) => {
            if (rejectedFile) {
                console.log('rejectedFile', rejectedFile);
                const [error] = rejectedFile.errors;
                switch (error.code) {
                    case ErrorCode.FileInvalidType:
                        if (acceptedFile) {
                            toast.error(`${rejectedFile.file.name}\n\n이 파일은 올바른 파일 형식이 아닙니다.`);
                        } else {
                            toast.error('파일 형식을 확인해주세요.');
                        }
                        break;
                    default:
                        break;
                }
            }

            if (acceptedFile) fileAdd(acceptedFile);
        },
        [onChange],
    );

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        maxFiles: 1,
        accept: {
            'application/vnd.ms-excel': [],
            'application/vnd.ms-excel.addin.macroEnabled.12': [],
            'application/vnd.ms-excel.sheet.binary.macroEnabled.12': [],
            'application/vnd.google-apps.spreadsheet': [],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml': [],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml': [],
        },
    });

    return (
        <div>
            {/*<div>ExcelUploader</div>*/}

            {!file && (
                <div {...getRootProps()}>
                    <input {...getInputProps()} />

                    <div
                        className={`w-full mb-4 min-h-[12rem] flex items-center justify-center border border-dashed border-scordi-200 rounded-xl text-14 ${
                            isDragActive ? 'bg-indigo-400/50' : ''
                        }`}
                    >
                        {isDragActive ? (
                            <div className="font-semibold text-xl">여기에 파일을 놓아주세요</div>
                        ) : (
                            <div className="flex flex-col gap-3 items-center text-13 text-gray-400">
                                <div>엑셀 파일을 해당 영역에 드래그 앤 드롭 해주세요.</div>
                                <div>또는,</div>
                                <div className="pt-2">
                                    <div
                                        className={`btn ${
                                            isDragActive ? 'bg-gray-200 border-gray-200 text-gray-500' : 'btn-scordi'
                                        } no-animation btn-animation`}
                                    >
                                        파일 선택하기
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {file && <FileItem file={file} remove={() => fileRemove()} isLoading={isLoading} errorMsg={errorMsg} />}
        </div>
    );
});
ExcelUploader.displayName = 'ExcelUploader';
