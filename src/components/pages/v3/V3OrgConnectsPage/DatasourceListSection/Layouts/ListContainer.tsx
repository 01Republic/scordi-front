import {Container} from '^v3/share/OnboardingFlow/Container';
import {memo} from 'react';
import {ChildrenProp} from '^components/util/children-prop.type';
import {IconType} from '@react-icons/all-files';
import {ReactComponentLike} from 'prop-types';
import {HiMiniPlus} from 'react-icons/hi2';

interface ListContainerProps extends ChildrenProp {
    title: string;
    Icon: IconType | ReactComponentLike;
    listCount: number;
    onClickAddButton: () => void;
    isShowAddButton?: boolean;
    className?: string;
}

export const ListContainer = memo((props: ListContainerProps) => {
    const {title, Icon, listCount, onClickAddButton, isShowAddButton = true, className, children} = props;

    return (
        <Container className={`${className} p-3 flex flex-col gap-3`}>
            <section className="flex gap-3 items-center">
                <Icon /> <span className="font-semibold">{title}</span>
                <span className="text-gray-300 text-sm">{listCount}</span>
            </section>
            {isShowAddButton && (
                <button
                    onClick={onClickAddButton}
                    className="btn bg-gray-100 flex justify-start items-center gap-2 border border-gray-300 text-sm text-gray-500 font-normal"
                >
                    <HiMiniPlus size={18} /> 추가
                </button>
            )}

            <ul>{children}</ul>
        </Container>
    );
});
