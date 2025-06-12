import {memo} from 'react';
import {BaseLayout, BaseLayoutProps} from '^clients/private/_layouts/BaseLayout';
import {cn} from '^public/lib/utils';

interface PureLayoutProps extends BaseLayoutProps {
    className?: string;
}

export const PureLayout = memo((props: PureLayoutProps) => {
    const {className = '', children} = props;

    return (
        <BaseLayout ignoreChannelTalk>
            {/* Body */}
            <div className={cn('w-full min-h-screen', className)}>{children}</div>
        </BaseLayout>
    );
});
