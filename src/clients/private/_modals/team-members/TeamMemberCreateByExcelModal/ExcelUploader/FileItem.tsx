import React, {memo} from 'react';
import {confirm2, confirmed} from '^components/util/dialog';
import excelIcon from 'src/images/icon/excelIcon.png';
import {parseFileSizeText} from '^utils/file';
import {FileSpreadsheet, Trash2, X} from 'lucide-react';
import Image from 'next/image';

interface FileItemProps {
    file: File;
    remove: () => any;
    isLoading?: boolean;
    errorMsg?: string;
}

export const FileItem = memo((props: FileItemProps) => {
    const {file, remove, isLoading = false, errorMsg} = props;

    const removeHandler = () => {
        // confirmed(confirm2('이 파일을 제거할까요?')).then(remove).catch(console.log);
        remove();
    };

    return (
        <div
            className={`flex ${isLoading ? 'pointer-events-none opacity-40' : ''} items-center border ${
                isLoading || !errorMsg ? 'border-gray-200' : 'border-red-500'
            } rounded-lg overflow-hidden`}
        >
            <div className="bg-gray-50 p-4">
                <Image src={excelIcon} alt="excelIcon" width={24} height={24} priority />
            </div>

            <div className="flex-1 pl-4">
                <div className="font-semibold text-14">{file.name}</div>

                {!errorMsg ? (
                    <div className="text-13 text-gray-500">{parseFileSizeText(file.size)}</div>
                ) : isLoading ? (
                    <div className="text-13 text-gray-500">업로드중...</div>
                ) : (
                    <div className="text-13 text-red-500">{errorMsg}</div>
                )}
            </div>

            <div
                onClick={removeHandler}
                className={`p-4 flex items-center ${
                    isLoading || !errorMsg ? 'text-gray-500 hover:text-black' : 'text-red-500 hover:text-red-700'
                } transition-all cursor-pointer`}
            >
                <Trash2 fontSize={16} className="" />
            </div>
        </div>
    );
});
FileItem.displayName = 'FileItem';
