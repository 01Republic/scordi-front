import {memo, ReactNode} from 'react';
import {ArrowLeft} from 'lucide-react';
import {LinkTo} from '^components/util/LinkTo';

interface StatusHeaderProps {
    title: string;
    subTitle?: string;
    icon?: ReactNode;
    onBack: () => void;
}

export const StatusHeader = memo((props: StatusHeaderProps) => {
    const {title, subTitle, icon, onBack} = props;
    return (
        <article className="flex flex-col justify-start gap-20">
            <LinkTo
                className="flex gap-1 items-center text-14 cursor-pointer text-gray-600 transition-all hover:text-gray-800 hover:font-semibold"
                onClick={onBack}
                displayLoading={false}
            >
                <ArrowLeft />
                뒤로가기
            </LinkTo>

            <section className="flex flex-col gap-5 text-neutral-900 font-normal">
                <div className="flex items-center gap-1">
                    {icon && icon}
                    <span className="text-2xl font-bold">{title}</span>
                </div>
                {subTitle && <span className="text-base font-normal">{subTitle}</span>}
            </section>
        </article>
    );
});
