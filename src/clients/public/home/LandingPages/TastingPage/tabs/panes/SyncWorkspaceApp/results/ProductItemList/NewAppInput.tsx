import React, {memo, useEffect, useRef} from 'react';
import {useSetRecoilState} from 'recoil';
import {Avatar} from '^components/Avatar';
import {useReportInDemo} from '../../atom';
import {isAddingModeState} from './atom';
import {Plus} from 'lucide-react';

type InputElem = EventTarget & HTMLInputElement;

export const NewAppInput = memo(function NewAppInput() {
    const {productHandler} = useReportInDemo();
    const setAddingMode = useSetRecoilState(isAddingModeState);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.value = '';
        }
    }, []);

    const exitAddingMode = () => setAddingMode(false);

    const upendAppAndContinueAddingMode = (target: InputElem) => {
        if (!target.value) return;
        productHandler.add(target.value);
        target.value = '';
    };

    const onEnter = (target: InputElem) => (target.value ? upendAppAndContinueAddingMode(target) : exitAddingMode());

    return (
        <div className="card p-4 bg-base-100 shadow-md hover:shadow-lg flex flex-row gap-2 items-start cursor-pointer">
            <div>
                <Avatar className="w-8">
                    <Plus size={24} className="text-gray-400 h-full w-full p-[6px]" />
                </Avatar>
            </div>
            <div className="flex-1 h-full flex flex-col items-end gap-2">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="서비스명 입력 후 엔터"
                    className="input input-sm relative mt-[-8px] text-15 font-semibold text-right w-[90%] !outline-0 px-0 border-0 rounded-none border-b border-gray-300 focus:border-primary"
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') onEnter(e.target);
                    }}
                />

                <div>
                    <button
                        type="button"
                        onClick={() => inputRef.current && onEnter(inputRef.current)}
                        className="btn btn-xs btn-scordi"
                    >
                        추가
                    </button>
                </div>
            </div>
        </div>
    );
});
