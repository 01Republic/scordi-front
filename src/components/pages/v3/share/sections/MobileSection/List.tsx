import {WithChildren} from '^types/global.type';
import {CSSProperties, memo} from 'react';

interface Props extends WithChildren {
    className?: string;
    style?: CSSProperties;
}

/**
 * Section List
 * 모바일에서 섹션들을 쌓기위한 리스트 컴포넌트 입니다.
 * 각 섹션은 Item 이고, 이 컴포넌트에서는 섹션간 간격 등
 * 복수개의 Item 을 담는 그릇으로서의 동작을 정의합니다.
 */
export default memo(function MobileSectionList(props: Props) {
    const {className = '', children, style} = props;

    return (
        <div
            data-component="MobileSection.List"
            className={`flex flex-col gap-4 bg-gray-100 ${className}`}
            style={style}
        >
            {children}
        </div>
    );
});
