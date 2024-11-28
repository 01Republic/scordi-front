import {memo} from 'react';
import {ErrorLayout} from '^clients/errors/ErrorLayout';
import {ChannelTalkHideStyle} from '^components/ExternalCDNScripts/channel-talk/ChannelTalkHideStyle';
import {LoadableBox} from '^components/util/loading';

export const SessionLoadingPage = memo(function SessionLoadingPage() {
    return (
        <ErrorLayout hideNav hideFooter>
            <ChannelTalkHideStyle />
            <div className="flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <LoadableBox isLoading={true} loadingType={2} spinnerSize={35} spinnerPos="center" noPadding>
                        <div>
                            <br />
                        </div>
                    </LoadableBox>
                </div>
            </div>
        </ErrorLayout>
    );
});
