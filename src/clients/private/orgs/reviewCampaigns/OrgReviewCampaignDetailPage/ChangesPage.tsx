import {useState, useEffect} from 'react';
import {Checkbox} from '^public/components/ui/checkbox';
import {Progress} from '^public/components/ui/progress';
import {OrgReviewCampaignDetailLayout} from './layout';
import ChangesItem from './ChangesItem';
import {useReviewCampaign} from '^models/ReviewCampaign/hook';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {orgIdParamState, useIdParam} from '^atoms/common';

interface ApprovalItem {
    id: string;
    serviceName: string;
    isExpanded?: boolean;
    isConfirmed?: boolean;
}

export default function OrgReviewCampaignDetailChangesPage() {
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

    // if (!reviewCampaign) return <></>;

    return (
        <OrgReviewCampaignDetailLayout>
            <div className="flex mt-6">
                <div className="w-[240px] mr-5">
                    <div className="space-y-2 text-sm">
                        {reviewCampaign?.subscriptions?.map((sub) => {
                            const subscriptionNamePart = sub.subscriptionName ? ` - ${sub.subscriptionName}` : '';
                            return (
                                <div
                                    key={sub.subscriptionId}
                                    className="flex items-center space-x-2 rounded-md hover:bg-gray-200 px-2 py-1.5"
                                >
                                    <span className="font-medium text-gray-700">
                                        {sub.productName}
                                        {subscriptionNamePart}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="w-full">
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
}
