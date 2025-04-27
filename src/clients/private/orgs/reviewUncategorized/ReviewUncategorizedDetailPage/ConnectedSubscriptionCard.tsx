import {Card} from '^public/components/ui/card';
import {PanelRight} from 'lucide-react';
import Image from 'next/image';
import {memo} from 'react';

interface ConnectedSubscriptionCardProps {
    item: {
        name: string;
        price: string;
        imageUrl: string;
    };
    onClick?: () => void;
}

export const ConnectedSubscriptionCard = memo(({item, onClick}: ConnectedSubscriptionCardProps) => {
    return (
        <Card
            className="py-3 px-4 flex justify-between items-center gap-2 w-[240px] bg-white hover:shadow-lg cursor-pointer"
            onClick={onClick}
        >
            <div className="flex items-center gap-2">
                <Image
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
            <PanelRight className="w-4 h-4 text-gray-400" />
        </Card>
    );
});
