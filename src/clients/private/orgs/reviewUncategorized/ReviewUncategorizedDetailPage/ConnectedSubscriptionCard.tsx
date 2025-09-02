import {memo} from 'react';
import {PanelRight} from 'lucide-react';
import {NextImage} from '^components/NextImage';
import {Card} from '^public/components/ui/card';

interface ConnectedSubscriptionCardProps {
    item: {
        name: string;
        price: string;
        imageUrl: string;
    };
    onClick?: () => void;
}

export const ConnectedSubscriptionCard = memo((props: ConnectedSubscriptionCardProps) => {
    const {item, onClick} = props;

    return (
        <Card
            className="py-3 px-4 flex justify-between items-center gap-2 w-[240px] bg-white hover:shadow-lg cursor-pointer"
            onClick={onClick}
        >
            <div className="flex items-center gap-2">
                <NextImage
                    src={item.imageUrl}
                    alt={item.name}
                    width={24}
                    height={24}
                    loading="lazy"
                    draggable={false}
                    className={`rounded-full`}
                />
                <div>
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-xs">{item.price}</div>
                </div>
            </div>
            <PanelRight className="w-5 h-5 text-gray-400" />
        </Card>
    );
});
