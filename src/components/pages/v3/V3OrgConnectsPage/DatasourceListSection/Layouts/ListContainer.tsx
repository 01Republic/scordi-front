import {memo} from 'react';
import {ReactComponentLike} from 'prop-types';
import {LucideIcon} from 'lucide-react';
import {ChildrenProp} from '^components/util/children-prop.type';
import {Plus} from 'lucide-react';

interface ListContainerProps extends ChildrenProp {
    title: string;
    Icon: LucideIcon | ReactComponentLike;
    listCount?: number;
    onClickAddButton: () => void;
    isShowAddButton?: boolean;
    className?: string;
}

export const ListContainer = memo((props: ListContainerProps) => {
    const {title, Icon, listCount, onClickAddButton, isShowAddButton = true, className = '', children} = props;

    return (
        <div className={`${className} p-3`}>
            <section className="flex gap-3 items-center mb-3">
                <Icon /> <span className="font-semibold">{title}</span>
                <span className="text-gray-300 text-sm">{listCount || ''}</span>
            </section>
            {isShowAddButton && (
                <button
                    onClick={onClickAddButton}
                    className="btn btn-block bg-gray-100 flex justify-start items-center gap-2 border border-gray-300 text-sm text-gray-500 font-normal mb-3"
                >
                    <Plus size={18} /> 추가
                </button>
            )}

            <ul>{children}</ul>
        </div>
    );
});
