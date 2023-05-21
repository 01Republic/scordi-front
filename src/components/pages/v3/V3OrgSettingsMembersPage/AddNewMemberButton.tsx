import React, {memo} from 'react';
import {AiOutlinePlus} from '@react-icons/all-files/ai/AiOutlinePlus';

export const AddNewMemberButton = memo(() => {
    return (
        <button className="btn btn-scordi">
            <span>등록하기</span>
            <span className="ml-2">
                <AiOutlinePlus />
            </span>
        </button>
    );
});
