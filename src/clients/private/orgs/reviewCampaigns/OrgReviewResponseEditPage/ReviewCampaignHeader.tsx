import {CardSection} from './CardSection';

interface ReviewCampaignHeaderProps {
    title?: string;
    description?: string;
}

export const ReviewCampaignHeader = ({title, description}: ReviewCampaignHeaderProps) => (
    <CardSection className="bg-white sm:py-6 space-y-5 border-scordi border-t-[12px] border-b-0 border-x-0">
        <div className="text-3xl font-semibold text-gray-900">{title}</div>
        <div className="text-16 text-gray-800 whitespace-pre-wrap">{description}</div>
        <div className="text-14 text-red-400">* 표시는 필수 질문입니다.</div>
    </CardSection>
);
