import React, {memo, useEffect, useState} from 'react';
import {ReportItemModalMemberList} from './MemberList';
import {AddNewMemberService} from './AddNewMemberService';

export const ReportItemModalMemberListContainer = memo(function ReportItemModalMemberListContainer() {
    const [maxHeight, setMaxHeight] = useState(0);
    const [paddingBottom, setPaddingBottom] = useState(0);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const container = window.document.querySelector('[data-component="ReportItemModalMemberListContainer"]');
        if (container) {
            const containerRect = container.getBoundingClientRect();
            setMaxHeight(window.innerHeight - containerRect.top);
        }

        const fixedBottomButton = window.document.querySelector('[data-component="ModalLikeBottomBar"]');
        if (fixedBottomButton) {
            const fixedBottomButtonRect = fixedBottomButton.getBoundingClientRect();
            setPaddingBottom(fixedBottomButtonRect.height);
        }
    }, []);

    return (
        <ul
            data-component="ReportItemModalMemberListContainer"
            className="menu menu-compact lg:menu-normal bg-base-100 block -mx-4 no-scrollbar"
            style={{
                maxHeight: maxHeight ? `calc(${maxHeight}px - 1rem)` : undefined,
                overflowY: 'auto',
                paddingBottom: paddingBottom ? `${paddingBottom}px` : undefined,
            }}
        >
            <ReportItemModalMemberList />
            <AddNewMemberService />
        </ul>
    );
});
