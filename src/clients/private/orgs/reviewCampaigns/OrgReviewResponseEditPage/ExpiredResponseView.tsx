import {TriangleAlert} from 'lucide-react';
import {useTranslation} from 'next-i18next';

export const ExpiredResponseView = () => {
    const {t} = useTranslation('reviewCampaigns');

    return (
        <div className="space-y-2 min-h-lvh max-w-screen-sm mx-auto py-20 flex flex-col items-center justify-center bg-gray-50">
            <div className="flex items-center justify-center gap-2 text-white w-14 h-14 bg-[#FB923C] rounded-full text-24 mb-3">
                <TriangleAlert />
            </div>
            <div className="text-24 font-medium text-gray-800">{t('response.expired.title')}</div>
            <div className="text-18 text-gray-800">{t('response.expired.message')}</div>
        </div>
    );
};
