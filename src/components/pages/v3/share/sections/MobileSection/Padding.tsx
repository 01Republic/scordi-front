import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface PaddingProps extends WithChildren {
    className?: string;
}

export default memo(function MobileSectionItemPadding(props: PaddingProps) {
    const {className = '', children} = props;

    return (
        <div data-component="MobileSection.Padding" className={`py-4 px-6 ${className}`}>
            {children}
        </div>
    );
});
