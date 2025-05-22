import {memo} from 'react';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {ago} from '^utils/dateTime';
import Tippy from '@tippyjs/react';

interface CardViewItemProps {
    id: number;
    name: string;
    updatedAt: Date;
    isActive: boolean;
    reload?: () => any;
    versionLength?: number;
}

export const CardViewItem = memo((props: CardViewItemProps) => {
    const {id, name, updatedAt, isActive, versionLength = 0} = props;

    return (
        <div className="card card-compact shadow-xl card-bordered cursor-pointer transition-all text-gray-500 hover:text-scordi bg-base-100 hover:bg-scordi-light-100">
            <div className="card-body">
                <div className="flex items-center justify-between">
                    <div className="flex-auto overflow-hidden">
                        <div className="text-16 flex items-center gap-2">
                            <div className="badge badge-xs">#{id}</div>
                            <Tippy content={name}>
                                <div className="text-14 w-full whitespace-nowrap text-ellipsis overflow-hidden">
                                    {name}
                                </div>
                            </Tippy>
                        </div>

                        <div className="flex items-center gap-0.5">
                            <div className="text-12 text-gray-400">수정: {ago(updatedAt)}</div>
                            <div className="text-12 text-gray-400">&middot;</div>
                            <div className="text-12 text-gray-400">
                                {versionLength > 0 ? (
                                    <span>버전: {versionLength.toLocaleString()}개</span>
                                ) : (
                                    <span>단독버전</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="">
                        {isActive ? (
                            <TagUI className="bg-green-200">활성</TagUI>
                        ) : (
                            <TagUI className="bg-gray-200">비활성</TagUI>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});
CardViewItem.displayName = 'CardViewItem';
