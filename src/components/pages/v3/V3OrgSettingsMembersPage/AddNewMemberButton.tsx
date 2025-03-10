import React, {memo} from 'react';
import {Plus} from 'lucide-react';

export const AddNewMemberButton = memo(() => {
    return (
        <button className="btn btn-scordi">
            <span>등록하기</span>
            <span className="ml-2">
                <Plus />
            </span>
        </button>
    );
});
