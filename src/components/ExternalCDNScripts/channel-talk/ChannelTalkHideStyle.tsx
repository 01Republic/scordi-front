import React, {memo} from 'react';

interface ChannelTalkHideStyleProps {
    maxWidth?: string;
}

export const ChannelTalkHideStyle = memo((props: ChannelTalkHideStyleProps) => {
    const {maxWidth = '100vw'} = props;

    return (
        <style
            dangerouslySetInnerHTML={{
                __html: `
            @media (max-width: ${maxWidth}) {
                body > #ch-plugin {
                    display:none !important;
                }
            }
            `,
            }}
        />
    );
});
