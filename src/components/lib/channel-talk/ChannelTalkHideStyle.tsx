import React, {memo} from 'react';

export const ChannelTalkHideStyle = memo(() => {
    return (
        <style
            dangerouslySetInnerHTML={{
                __html: `
            body > #ch-plugin {
                display:none !important;
            }
            `,
            }}
        />
    );
});
