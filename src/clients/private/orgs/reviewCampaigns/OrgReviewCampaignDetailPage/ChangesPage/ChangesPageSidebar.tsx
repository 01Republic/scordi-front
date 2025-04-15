import {useEffect, useState} from 'react';
import {ReviewCampaignDto} from '^models/ReviewCampaign/type';
import {cn} from '^public/lib/utils';

interface ChangesPageSidebarProps {
    reviewCampaign?: ReviewCampaignDto;
    toggleExpand: (id: string, value?: boolean) => void;
}

export default function ChangesPageSidebar(props: ChangesPageSidebarProps) {
    const {reviewCampaign, toggleExpand} = props;
    const [activeId, setActiveId] = useState<string | null>(null);

    const scrollToSection = (subscriptionId: string) => {
        const element = document.getElementById(`sub-${subscriptionId}`);
        if (element) {
            console.log('Scrolling to section:', `sub-${subscriptionId}`);
            setActiveId(`sub-${subscriptionId}`);
            toggleExpand(subscriptionId, true);
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        if (reviewCampaign?.subscriptions?.length) {
            setActiveId(`sub-${reviewCampaign.subscriptions[0].subscriptionId}`);
        }
    }, [reviewCampaign]);

    return (
        <div className="w-[240px] sticky top-4">
            <div className="space-y-2 text-sm">
                {reviewCampaign?.subscriptions?.map((sub) => (
                    <div
                        key={sub.subscriptionId}
                        onClick={() => scrollToSection(sub.subscriptionId.toString())}
                        className={cn(
                            'relative flex items-center space-x-2 rounded-md px-2 py-1.5 cursor-pointer transition-colors hover:bg-gray-200 text-gray-700',
                            activeId === `sub-${sub.subscriptionId}` && 'bg-scordi-light-100 text-scordi font-medium',
                        )}
                    >
                        {activeId === `sub-${sub.subscriptionId}` && (
                            <div className="absolute left-0 inset-y-1 w-1 bg-scordi rounded-full" />
                        )}
                        <span>
                            {sub.productName}
                            {sub.subscriptionName ? ` - ${sub.subscriptionName}` : ''}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
