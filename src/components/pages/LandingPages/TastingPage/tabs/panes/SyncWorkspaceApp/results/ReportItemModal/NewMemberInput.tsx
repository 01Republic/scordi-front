import React, {memo, useEffect, useRef} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {Avatar} from '^components/Avatar';
import {reportState, useReport, subjectReportProductItem} from '../../atom';
import {isAddingModeState} from './atom';

type InputElem = EventTarget & HTMLInputElement;

export const NewMemberInput = memo(function NewMemberInput() {
    const subjectItem = useRecoilValue(subjectReportProductItem);
    const setReport = useSetRecoilState(reportState);
    const {memberHandler} = useReport();
    const setAddingMode = useSetRecoilState(isAddingModeState);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.value = '';
        }
    }, []);

    const exitAddingMode = () => setAddingMode(false);

    const upendMemberAndContinueAddingMode = (target: InputElem) => {
        if (!subjectItem) return;
        memberHandler.add(subjectItem, target.value);
        target.value = '';
    };

    const onEnter = (target: InputElem) => (target.value ? upendMemberAndContinueAddingMode(target) : exitAddingMode());

    return (
        <div className="!w-auto gap-4 px-4 py-3 -mx-4 no-selectable hover:bg-white cursor-auto">
            <Avatar className="w-9 h-9 outline outline-offset-1 outline-slate-100" />
            <div className="flex-1">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="이메일 입력후 Enter(엔터)"
                    className="input input-lg sm:input-sm input-bordered font-semibold sm:text-sm"
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') onEnter(e.target);
                    }}
                />
            </div>
        </div>
    );
});
