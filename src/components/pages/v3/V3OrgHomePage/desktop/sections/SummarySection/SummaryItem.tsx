import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {ComponentLike, renderOne} from '^components/util/ComponentLike';

interface SummaryItemProps extends WithChildren {
    title: ComponentLike;
    value: number | string;
    isLoading?: boolean;
    covered?: boolean;
}

export const SummaryItem = memo((props: SummaryItemProps) => {
    const {title, value, children, isLoading = false, covered = false} = props;

    return (
        <div className="dashboard--summary-item px-4">
            <div className="mb-1">
                <p className="text-16 font-semibold text-gray-500">{renderOne(title)}</p>
            </div>
            <div className="relative">
                {covered ? (
                    <div>
                        <p
                            className="text-xl font-semibold text-gray-400 bg-gray-200 rounded-full"
                            style={{filter: 'blur(3px)'}}
                        >
                            &nbsp;
                        </p>
                        <div
                            onClick={() => alert('화면 오른쪽 아래의 \n상담버튼을 통해 문의해주세요')}
                            className="absolute-cover flex items-center justify-center text-gray-600 hover:text-scordi cursor-pointer"
                        >
                            <p className="text-xs">유료플랜 전용</p>
                        </div>
                    </div>
                ) : (
                    <p
                        className={`text-xl font-semibold ${
                            isLoading ? 'animate-pulse !text-transparent rounded-full bg-slate-200' : ''
                        }`}
                    >
                        {typeof value === 'number' ? value.toLocaleString() : value}건
                    </p>
                )}
            </div>
        </div>
    );
});
SummaryItem.displayName = 'SummaryItem';
