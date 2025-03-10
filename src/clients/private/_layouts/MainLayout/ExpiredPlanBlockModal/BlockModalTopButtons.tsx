import React, {memo} from 'react';
import {LinkTo} from '^components/util/LinkTo';
import {MainPageRoute} from '^pages/index';
import {useCurrentUser} from '^models/User/hook';
import {ArrowLeft} from 'lucide-react';

interface BlockModalTopButtonsProps {
    //
}

export const BlockModalTopButtons = memo((props: BlockModalTopButtonsProps) => {
    const {} = props;
    const {currentUser, logout} = useCurrentUser();

    return (
        <div className="w-full flex items-center relative -top-4">
            <div className="flex items-center gap-4">
                <LinkTo
                    href={MainPageRoute.path()}
                    displayLoading={false}
                    className="flex items-center gap-2 text-gray-400 hover:text-black transition"
                >
                    <ArrowLeft />
                    <span className="text-sm font-medium">홈으로</span>
                </LinkTo>
            </div>
            <div className="flex items-center gap-4 ml-auto">
                {currentUser && (
                    <button
                        className="flex items-center text-sm font-medium text-gray-400 hover:text-black transition"
                        onClick={() => logout()}
                    >
                        로그아웃
                    </button>
                )}
            </div>
        </div>
    );
});
BlockModalTopButtons.displayName = 'BlockModalTopButtons';
