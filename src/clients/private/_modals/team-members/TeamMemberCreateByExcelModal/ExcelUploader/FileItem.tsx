import {memo} from 'react';
import {ExcelIcon} from '^components/react-icons';
import {IoMdClose} from '@react-icons/all-files/io/IoMdClose';
import {FaRegTrashAlt} from '@react-icons/all-files/fa/FaRegTrashAlt';
import {confirm2, confirmed} from '^components/util/dialog';
import {parseFileSizeText} from '^utils/file';

interface FileItemProps {
    file: File;
    remove: () => any;
}

export const FileItem = memo((props: FileItemProps) => {
    const {file, remove} = props;

    const removeHandler = () => {
        confirmed(confirm2('이 파일을 제거할까요?')).then(remove).catch(console.log);
    };

    return (
        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4">
                <ExcelIcon fontSize={24} />
            </div>

            <div className="flex-1 pl-4">
                <div>{file.name}</div>
                <div className="text-13 text-gray-500">{parseFileSizeText(file.size)}</div>
            </div>

            <div
                onClick={removeHandler}
                className="p-4 flex items-center text-gray-500 hover:text-black transition-all cursor-pointer"
            >
                <FaRegTrashAlt fontSize={14} className="" />
            </div>
        </div>
    );
});
FileItem.displayName = 'FileItem';
