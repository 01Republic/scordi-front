import {memo, useContext, useState} from 'react';
import {errorToast} from '^api/api';
import {useOrgIdParam} from '^atoms/common';
import {allFulfilled} from '^utils/array';
import {codefCardApi} from '^models/CodefCard/api';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {LoadingScreen} from '^_components/pages/assets/connect-steps/common/LoadingScreen';
import {AssetConnectOptionContext} from '^_components/pages/assets/connect-steps';

interface SelectAssetConnectLoadingStepProps {
    selectedCodefCards: CodefCardDto[];
}

export const SelectAssetConnectLoadingStep = memo((props: SelectAssetConnectLoadingStepProps) => {
    const {selectedCodefCards} = props;
    const {onSuccessfullyCreatedByAccount} = useContext(AssetConnectOptionContext);

    const orgId = useOrgIdParam();
    const [isLoading, setIsLoading] = useState(false);

    const onSync = async () => {
        await allFulfilled(
            selectedCodefCards.map((codefCard) => {
                return codefCardApi.histories(orgId, codefCard.id, {sync: true}).then(() => {
                    setIsLoading(true);
                });
            }),
        ).catch(errorToast);
    };

    return (
        <LoadingScreen
            message="선택한 자산을 기준으로 구독을 찾고 있어요"
            onCreat={onSync}
            onClose={() => {
                if (isLoading && onSuccessfullyCreatedByAccount) {
                    onSuccessfullyCreatedByAccount(selectedCodefCards);
                }
            }}
        />
    );
});
