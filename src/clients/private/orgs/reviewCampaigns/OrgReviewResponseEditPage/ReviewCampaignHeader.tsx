import {Card} from '^public/components/ui/card';

interface ReviewCampaignHeaderProps {
    title?: string;
    description?: string;
}

export const ReviewCampaignHeader = ({title, description}: ReviewCampaignHeaderProps) => (
    <Card className="bg-white pb-6 space-y-5 overflow-hidden">
        <div className="bg-scordi h-3" />
        <div className="px-7 space-y-5">
            <div className="text-3xl font-medium text-gray-900">{title}</div>
            <div className="text-16 text-gray-800">{description}</div>
            <div className="text-14 text-red-400">* 표시는 필수 질문입니다.</div>
        </div>
    </Card>
);
