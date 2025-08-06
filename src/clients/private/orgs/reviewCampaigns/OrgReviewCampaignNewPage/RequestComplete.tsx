import {NextImage} from '^components/NextImage';
import ClappingHands from '^images/clappingHands.png';
import {ButtonLink} from '^public/components/ui/button';
import {useTranslation} from 'next-i18next';

interface RequestCompleteProps {
    href: string;
}

export const RequestComplete = ({href}: RequestCompleteProps) => {
    const {t} = useTranslation('reviewCampaigns');

    return (
        <div className="flex flex-col items-center py-20 space-y-8">
            <NextImage src={ClappingHands} alt="clapping hands" width={60} height={60} />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('complete.title')}</h2>
            <ButtonLink size={'xxl'} variant={'scordi'} href={href} className="w-[280px]">
                {t('complete.confirmButton')}
            </ButtonLink>
        </div>
    );
};
