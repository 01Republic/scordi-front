import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface ItemProps extends WithChildren {
    className?: string;
    noStyle?: boolean;
}

export default memo(function MobileSectionItem(props: ItemProps) {
    const {className = '', children, noStyle = false} = props;

    if (noStyle) {
        return (
            <section data-component="MobileSection.Item" className={`w-full min-h-16 ${className}`}>
                {children}
            </section>
        );
    } else {
        return (
            <section
                data-component="MobileSection.Item"
                className={`w-full bg-white border-b min-h-16 text-sm ${className}`}
            >
                {children}
            </section>
        );
    }
});
