import {memo, ReactNode} from 'react';
import {ArrowLeft} from 'lucide-react';

interface StatusHeaderProps {
    title: string;
    subTitle?: string;
    icon?: ReactNode;
    onClick: () => void;
}

export const StatusHeader = memo((props: StatusHeaderProps) => {
    const {title, subTitle, icon, onClick} = props;
    return (
        <article className="flex flex-col justify-start gap-20">
            <button
                className="flex gap-1 items-center cursor-pointer" //
                onClick={onClick}
            >
                <ArrowLeft className="size-6 text-neutral-600" />
                뒤로가기
            </button>
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
