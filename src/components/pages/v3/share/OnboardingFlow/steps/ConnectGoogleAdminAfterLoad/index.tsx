import React, {memo, useEffect, useState} from 'react';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {googleOAuth} from '^config/environments';
import {StepContentProps} from '^components/util/funnel';
import {Container} from '../../Container';
import {CheckCircle} from '^components/react-icons/check-circle';
import {useRecoilValue} from 'recoil';
import {reportState} from '^components/pages/LandingPages/TastingPage/tabs/panes/SyncWorkspaceApp/atom';
import {ProductItem} from '^components/pages/LandingPages/TastingPage/tabs/panes/SyncWorkspaceApp/results/ProductItemList/ProductItem';
import {FaArrowRight} from 'react-icons/fa6';

interface Props extends StepContentProps {
    // onNext: () => any;
}

export const ConnectGoogleAdminAfterLoad = memo(function ConnectGoogleAdminAfterLoad(props: Props) {
    const reportData = useRecoilValue(reportState);
    const [isLoaded, setIsLoaded] = useState(false);
    const {onNext} = props;

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 3000);
    }, []);

    const reportByProduct = reportData?.groupByProduct();

    return (
        <GoogleOAuthProvider clientId={googleOAuth.adminClient.id}>
            <div data-step="ConnectGoogleAdmin" className="h-full flex flex-col gap-7">
                <Container size="md">
                    <div className="text-center">
                        <h3 className="font-bold text-3xl mb-3">
                            {reportByProduct?.items.length}개의 서비스를 발견했어요
                        </h3>
                        <p className="text-16 text-gray-500">
                            <b>{reportData?.workspaceName}</b> 으로 연동할게요
                        </p>
                    </div>
                </Container>

                {!isLoaded && (
                    <Container size="sm" className="flex justify-center py-8">
                        <CheckCircle className="w-[60px] mb-10" color="#5E5FEE" />
                    </Container>
                )}

                {isLoaded && (
                    <Container size="sm" className="mb-8">
                        <button className="btn btn-lg btn-block btn-scordi gap-2" onClick={() => onNext()}>
                            <span>계속하기</span>
                            <FaArrowRight />
                        </button>
                    </Container>
                )}

                {isLoaded && (
                    <Container size="6xl" className="pb-8">
                        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {(reportByProduct?.sortItems() || []).map((item, i) => (
                                <div key={i}>
                                    <ProductItem item={item} preventRemove />
                                </div>
                            ))}
                        </div>
                    </Container>
                )}
            </div>
        </GoogleOAuthProvider>
    );
});
