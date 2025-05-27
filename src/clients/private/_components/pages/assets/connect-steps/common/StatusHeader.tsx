import React, {memo, ReactNode} from 'react';
import {ArrowLeft} from 'lucide-react';
import {LinkTo} from '^components/util/LinkTo';

interface StatusHeaderProps {
    title: string;
    subTitle?: string;
    icon?: ReactNode;
    onBack?: () => void;
    onMove?: () => void;
}

export const StatusHeader = memo((props: StatusHeaderProps) => {
    const {title, subTitle, icon, onBack, onMove} = props;
    return (
        <article className="flex flex-col justify-start gap-20">
            {onBack && (
                <LinkTo
                    className="flex gap-1 items-center text-14 cursor-pointer text-gray-600 transition-all hover:text-gray-800 hover:font-semibold"
                    onClick={onBack}
                    displayLoading={false}
                >
                    <ArrowLeft />
                    뒤로가기
                </LinkTo>
            )}
            {onMove && (
                <LinkTo
                    className="flex gap-1 items-center justify-end text-14 cursor-pointer text-gray-600 transition-all hover:text-gray-800 hover:font-semibold"
                    onClick={onMove}
                    displayLoading={true}
                >
                    추가자산 연동하기
                </LinkTo>
            )}
            <section className="flex flex-col gap-5 text-neutral-900 font-normal">
                <div className="flex items-center gap-1">
                    {icon && icon}
                    <span className="text-2xl font-bold">{title}</span>
                </div>
                {subTitle && <span className="text-base font-normal">{subTitle}</span>}
            </section>
            <div id="page-flash" className="relative" />
        </article>
    );
});
