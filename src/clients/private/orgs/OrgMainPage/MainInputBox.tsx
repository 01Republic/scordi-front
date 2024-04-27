import React, {memo} from 'react';
import {FaSearch} from 'react-icons/fa';

export const MainInputBox = memo(function MainInputBox() {
    return (
        <div className="max-w-md lg:max-w-sm mx-auto mb-10">
            <div className="w-full">
                <div className="relative w-full btn-animation">
                    <div className="absolute top-0 bottom-0 w-[50px] flex items-center justify-center">
                        <FaSearch size={16} className="text-gray-500 opacity-50" />
                    </div>

                    <input
                        type="text"
                        className="input shadow-md hover:shadow-lg cursor-pointer input-md rounded-box pl-[50px] w-full text-16 focus:outline-0 transition-all"
                        autoComplete="off"
                        spellCheck="false"
                        placeholder="우리 팀이 쓰는 앱을 찾아보세요"
                        readOnly
                    />
                </div>
            </div>
            {/*<div className="sm:col-span-1 md:col-span-2 lg:col-span-2"></div>*/}
        </div>
    );
});
