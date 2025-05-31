import React, {memo, ReactNode} from 'react';
import {ArrowLeft, Plus} from 'lucide-react';
import {LinkTo} from '^components/util/LinkTo';
import {cn} from '^public/lib/utils';

interface StatusHeaderProps {
    title: ReactNode;
    subTitle?: ReactNode;
    icon?: ReactNode;
    onBack?: () => void;
    onMove?: () => void;
    className?: string;
}

export const StatusHeader = memo((props: StatusHeaderProps) => {
    const {title, subTitle, icon, onBack, onMove, className = ''} = props;
    return (
        <article className={cn('flex flex-col justify-start gap-20', className)}>
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

            <div>
                <section className="flex items-start justify-between">
                    <div className="flex-1">
                        <table className="w-full table-auto">
                            <tbody>
                                <tr>
                                    {icon && (
                                        <td>
                                            <div className="mr-1">{icon}</div>
                                        </td>
                                    )}
                                    <td className="vertical-align-middle w-full">
                                        <div className="flex items-center">
                                            <div className="text-2xl font-bold">{title}</div>

                                            <div className="ml-auto flex items-center gap-2">
                                                {onMove && (
                                                    <LinkTo
                                                        className="btn btn-scordi no-animation btn-animation gap-2"
                                                        onClick={onMove}
                                                        displayLoading={false}
                                                    >
                                                        <Plus />
                                                        <span>자산 추가</span>
                                                    </LinkTo>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    {icon && <td></td>}
                                    <td>{subTitle && <span className="font-normal">{subTitle}</span>}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <div id="page-flash" className="" />
            </div>
        </article>
    );
});
