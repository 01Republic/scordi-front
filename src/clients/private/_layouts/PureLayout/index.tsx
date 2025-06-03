import {memo} from 'react';
import {BaseLayout, BaseLayoutProps} from '^clients/private/_layouts/BaseLayout';

interface PureLayoutProps extends BaseLayoutProps {
    //
}

export const PureLayout = memo((props: PureLayoutProps) => {
    const {children} = props;

    return (
        <BaseLayout ignoreChannelTalk>
            {/* Body */}
            <div className="w-full min-h-screen">{children}</div>
        </BaseLayout>
    );
});
