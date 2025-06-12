import React, {memo, useEffect, useState} from 'react';
import {X} from 'lucide-react';
import Tippy from '@tippyjs/react';
import {LinkTo} from '^components/util/LinkTo';
import {PageFlashPortal} from '^components/util/TopLineBannerPortal';
import {CodefApiAccountItemDto} from '^models/CodefAccount/type/CodefApiAccountItemDto';
import {AccountCreateFailedDetailModal} from './AccountCreateFailedDetailModal';

interface AssetsConnectStepFlashHandlerProps {
    failures?: CodefApiAccountItemDto[];
}

export const AssetsConnectStepFlashHandler = memo((props: AssetsConnectStepFlashHandlerProps) => {
    const {failures = []} = props;
    const [isOpen, setIsOpen] = useState(failures.length > 0);
    const [isFailModalOpened, setIsFailModalOpened] = useState(false);
    const [waited, setWaited] = useState(false);

    useEffect(() => {
        setTimeout(() => setWaited(true), 1000);
    }, []);

    if (!isOpen || !waited) return <></>;

    return (
        <>
            <PageFlashPortal>
                <div className="mt-4 px-4 shadow rounded-lg w-full overflow-hidden transition-all h-[3rem] text-14 flex items-center justify-between bg-yellowColor-100 !text-yellowColor-400">
                    <div className="min-w-[48px] flex items-center justify-center">&nbsp;</div>
                    <div className="flex-1 text-center">
                        <span className="mr-8">⚠️ 불러오지 못한 금융기관이 있어요</span>
                        <LinkTo
                            className="btn-link underline-offset-2 cursor-pointer transition-all hover:text-blue-700"
                            onClick={() => setIsFailModalOpened(true)}
                        >
                            자세히 알아보기
                        </LinkTo>
                    </div>
                    <div className="min-w-[48px] flex items-center justify-center">
                        <X
                            size={14}
                            className="cursor-pointer text-gray-500 hover:text-black transition-all"
                            onClick={() => setIsOpen(false)}
                        />
                    </div>
                </div>
            </PageFlashPortal>

            <AccountCreateFailedDetailModal
                isOpened={isFailModalOpened}
                onClose={() => setIsFailModalOpened(false)}
                failures={failures}
            />
        </>
    );
});
