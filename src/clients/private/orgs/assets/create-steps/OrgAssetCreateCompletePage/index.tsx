import {MainContainer, MainLayout} from '^clients/private/_layouts/MainLayout';
import {NextImage} from '^components/NextImage';
import {memo} from 'react';
import ClappingHands from '^images/clappingHands.png';

export const OrgAssetCreateCompletePage = memo(() => {
    return (
        <MainLayout>
            <MainContainer>
                <div className="mb-12 space-y-2">
                    <NextImage src={ClappingHands} alt="clapping hands" width={60} height={60} />
                    <div className="text-2xl font-bold">자산 연동이 완료 되었어요</div>
                </div>
            </MainContainer>
        </MainLayout>
    );
});

OrgAssetCreateCompletePage.displayName = 'OrgAssetCreateCompletePage';
