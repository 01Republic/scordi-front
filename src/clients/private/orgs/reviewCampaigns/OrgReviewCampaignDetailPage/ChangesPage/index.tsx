import {useIdParam} from '^atoms/common';
import {useReviewCampaign} from '^models/ReviewCampaign/hook';
import {memo, useEffect, useState} from 'react';
import {Progress} from '^public/components/ui/progress';
import {Checkbox} from '^public/components/ui/checkbox';
import {OrgReviewCampaignDetailLayout} from '../layout';
import ChangesItem from './ChangesItem';
import {ChangesPageSidebar} from '^clients/private/orgs/reviewCampaigns/OrgReviewCampaignDetailPage/ChangesPage/ChangesPageSidebar';

interface ApprovalItem {
    id: string;
    serviceName: string;
    isExpanded?: boolean;
    isConfirmed?: boolean;
}

export const OrgReviewCampaignDetailChangesPage = memo(() => {
    const orgId = useIdParam('id');
    const id = useIdParam('reviewCampaignId');
    const {data: reviewCampaign} = useReviewCampaign(orgId, id);

    const [approvalItems, setApprovalItems] = useState<ApprovalItem[]>([]);
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [totalSteps, setTotalSteps] = useState(0);

    useEffect(() => {
        if (!reviewCampaign) return;

        const {subscriptions} = reviewCampaign;
        if (!subscriptions || subscriptions.length === 0) {
            setApprovalItems([]);
            setTotalSteps(0);
            setProgress(0);
            return;
        }

        const mappedItems = subscriptions.map((sub) => {
            const subscriptionNamePart = sub.subscriptionName ? ` - ${sub.subscriptionName}` : '';
            return {
                id: String(sub.subscriptionId),
                serviceName: `${sub.productName}${subscriptionNamePart}`,
                isExpanded: false,
                isConfirmed: false,
            };
        });

        setApprovalItems(mappedItems);
        setTotalSteps(subscriptions.length);
        setCurrentStep(0);
        setProgress(0);
    }, [reviewCampaign]);

    const toggleExpand = (id: string) => {
        setApprovalItems((prev) =>
            prev.map((item) => (item.id === id ? {...item, isExpanded: !item.isExpanded} : item)),
        );
    };

    const toggleConfirm = (id: string, value: boolean) => {
        setApprovalItems((prev) => {
            const updated = prev.map((item) => (item.id === id ? {...item, isConfirmed: value} : item));
            const confirmedCount = updated.filter((item) => item.isConfirmed).length;
            const newProgress = totalSteps > 0 ? Math.round((confirmedCount / totalSteps) * 100) : 0;

            setCurrentStep(confirmedCount);
            setProgress(newProgress);

            return updated;
        });
    };

    const handleConfirmAll = (checked: boolean) => {
        setApprovalItems((prev) => {
            const updated = prev.map((item) => ({...item, isConfirmed: checked}));
            const confirmedCount = checked ? updated.length : 0;
            const newProgress = totalSteps > 0 ? Math.round((confirmedCount / totalSteps) * 100) : 0;

            setCurrentStep(confirmedCount);
            setProgress(newProgress);

            return updated;
        });
    };

    return (
        <OrgReviewCampaignDetailLayout containerFluid>
            <div className="flex mt-6 gap-8">
                {/* Sidebar */}
                <ChangesPageSidebar reviewCampaign={reviewCampaign} />

                <div className="flex-1">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">승인 대기중 ({totalSteps - currentStep})</h2>
                        <div className="flex items-center space-x-4">
                            <div className="flex flex-col items-center">
                                <span className="text-xs text-gray-700">
                                    {currentStep} / {totalSteps} 확인 완료
                                </span>
                                <Progress
                                    value={progress}
                                    className="w-32 h-2 mt-1.5 bg-neutral-100"
                                    indicatorClassName="bg-primaryColor-900"
                                />
                            </div>
                            <label
                                htmlFor="confirm-all"
                                className="cursor-pointer text-sm border border-gray-300 bg-gray-50 rounded-lg py-1 px-2 space-x-2 flex items-center
                                    has-[:checked]:text-primaryColor-900 has-[:checked]:border-primaryColor-900"
                            >
                                <Checkbox
                                    id="confirm-all"
                                    checked={currentStep === totalSteps && totalSteps > 0}
                                    onCheckedChange={(checked) => handleConfirmAll(Boolean(checked))}
                                />
                                <span className="text-gray-700 font-medium">전체 확인 완료</span>
                            </label>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {approvalItems.map((item) => (
                            <ChangesItem
                                key={item.id}
                                approvalItem={item}
                                toggleExpand={toggleExpand}
                                toggleConfirm={toggleConfirm}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </OrgReviewCampaignDetailLayout>
    );
});
