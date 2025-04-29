import {memo} from 'react';
import {CircleHelp} from 'lucide-react';
import {NextImage} from '^components/NextImage';

interface SubscriptionItemProps {
    logo: string;
    title: string;
}

export const SubscriptionItem = memo((props: SubscriptionItemProps) => {
    const {logo, title} = props;
    return (
        <section className="card card-body bg-white p-5 transition box-border no-selectable shadow-xl ">
            <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                    {logo ? (
                        <NextImage src={logo} alt={title} width={40} height={40} />
                    ) : (
                        <CircleHelp className="size-10 text-grayColor-600" />
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-neutral-900 text-16 font-semibold whitespace-nowrap">{title}</span>
                </div>
            </div>
        </section>
    );
});
