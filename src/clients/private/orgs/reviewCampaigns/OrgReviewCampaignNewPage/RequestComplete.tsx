import {NextImage} from '^components/NextImage';
import ClappingHands from '^images/clappingHands.png';
import {ButtonLink} from '^public/components/ui/button';

interface RequestCompleteProps {
    href: string;
}

export const RequestComplete = ({href}: RequestCompleteProps) => {
    return (
        <div className="flex flex-col items-center py-20 space-y-8">
            <NextImage src={ClappingHands} alt="clapping hands" width={60} height={60} />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">구성원에게 요청을 보냈어요</h2>
            <ButtonLink size={'xxl'} variant={'scordi'} href={href} className="w-[280px]">
                확인
            </ButtonLink>
        </div>
    );
};
