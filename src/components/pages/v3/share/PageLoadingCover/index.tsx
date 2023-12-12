import {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';
import {progressTimeline} from './progressTimeline';

export const PageLoadingCover = memo(function PageLoadingCover() {
    const currentOrg = useRecoilValue(currentOrgAtom);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [progressValue, setProgress] = useState(0);

    useEffect(() => {
        if (isPageLoading) progressTimeline(setProgress);
    }, [isPageLoading]);

    useEffect(() => {
        if (currentOrg) {
            setProgress(100);
            if (typeof window !== 'undefined') {
                window.document.body.classList.remove('modal-opened');
            }
            setIsPageLoading(false);
        }
    }, [currentOrg]);

    if (!isPageLoading) return <></>;

    return (
        <div className={`modal modal-open`}>
            <div className="modal-box h-full min-w-full max-h-full rounded-none p-0">
                <div className="h-full w-full flex items-center">
                    <div className="container max-w-lg">
                        <p className="text-center">Loading ...</p>
                        <progress
                            className="progress progress-primary w-full bg-gray-200"
                            value={progressValue}
                            max="100"
                            style={{
                                transition: 'width 200ms ease',
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});
