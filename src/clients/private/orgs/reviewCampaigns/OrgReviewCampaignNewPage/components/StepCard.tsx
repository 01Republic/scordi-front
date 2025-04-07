import React, {memo} from 'react';
import {ChevronDown} from 'lucide-react';
import {ReactNodeElement, WithChildren} from '^types/global.type';
import {Card} from '^public/components/ui/card';
import {FadeUp} from '^components/FadeUp';

interface StepCardProps extends WithChildren {
    title: ReactNodeElement;
    isHidden: boolean;
    isCurrent: boolean;
    isFolded: boolean;
    setIsFolded: (isFolded: boolean) => any;
}

export const StepCard = memo((props: StepCardProps) => {
    const {title, isHidden = true, isCurrent = false, isFolded, setIsFolded, children} = props;

    return (
        <FadeUp show={!isHidden} delay="delay-[50ms]" leaveDuration="duration-0" leaveNoEffect>
            <Card className="bg-white mb-4">
                <div
                    className={'px-4 py-4 flex items-center gap-4 text-16 font-semibold text-gray-900 cursor-pointer'}
                    onClick={() => {
                        if (isCurrent) return;
                        setIsFolded(!isFolded);
                    }}
                >
                    <ChevronDown className={`transition-all ${isFolded ? '-rotate-90' : ''}`} />

                    <div>{title}</div>
                </div>

                {!isFolded && children}
            </Card>
        </FadeUp>
    );
});
StepCard.displayName = 'StepCard';

export const StepCardBody = ({children}: WithChildren) => <div className={'p-9 space-y-10 border-t'}>{children}</div>;
