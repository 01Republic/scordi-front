import {memo, ReactNode} from 'react';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import {PureLayoutContainer} from '^clients/private/_layouts/PureLayout/PureLayoutContainer';
import {useRouter} from 'next/router';

interface ConnectingFailurePageProps {
    title: ReactNode;
    desc?: ReactNode;
    onBack?: () => any;
}

export const ConnectingFailurePage = memo((props: ConnectingFailurePageProps) => {
    const {title, desc, onBack} = props;
    const router = useRouter();

    return (
        <PureLayout>
            <PureLayoutContainer className="flex flex-col items-center justify-center m-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800 leading-tight mb-4">💦 {title}</h2>

                    {desc && <p className="text-lg font-semibold text-red-500 mb-8">{desc}</p>}

                    <button
                        onClick={() => (onBack ? onBack() : router.back())}
                        className="btn btn-scordi btn-lg btn-wide no-animation btn-animation mt-8"
                    >
                        돌아가기
                    </button>
                </div>
            </PureLayoutContainer>
        </PureLayout>
    );
});
ConnectingFailurePage.displayName = 'ConnectingFailurePage';
