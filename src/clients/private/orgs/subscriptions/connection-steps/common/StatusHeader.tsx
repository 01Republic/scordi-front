import {memo} from 'react';
import {ArrowLeft} from 'lucide-react';
import {useRouter} from 'next/router';

interface StatusHeaderProps {
    title: string;
    subTitle: string;
    onClick: () => void;
}

export const StatusHeader = memo((props: StatusHeaderProps) => {
    const {title, subTitle, onClick} = props;
    return (
        <article className="flex flex-col justify-start gap-20">
            <button
                className="flex gap-1 items-center cursor-pointer" //
                onClick={onClick}
            >
                <ArrowLeft className="size-6 text-neutral-600" />
                뒤로가기
            </button>
            <section className="flex flex-col gap-5 text-neutral-900">
                <span className="text-2xl font-bold">{title}</span>
                <span className="text-base font-normal">{subTitle}</span>
            </section>
        </article>
    );
});
