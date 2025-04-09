import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {AssetCreateLayout} from '^clients/private/_layouts/AssetCreateLayout';
// import {MainContainer} from '^clients/private/_layouts/MainLayout/MainContainer';
import {OrgAssetsCreateByAccountPageRoute} from '^pages/orgs/[id]/assets/new/by-account';
import {OrgAssetsCreateByCertificatePageRoute} from '^pages/orgs/[id]/assets/new/by-certificate';
import {Button} from '^public/components/ui/button';
import {Checkbox} from '^public/components/ui/checkbox';
import {Label} from '^public/components/ui/label';
import {useRouter} from 'next/router';
import {memo} from 'react';

export const OrgAssetCreateMethodSelectPage = memo(() => {
    const router = useRouter();
    const orgId = useRouterIdParamState('id', orgIdParamState);

    return (
        <AssetCreateLayout>
            <div className="w-full h-screen flex items-center justify-center">
                <div className="w-full max-w-lg">
                    <div className="flex flex-col gap-4">
                        <div className="text-left text-24 font-bold">자산을 연동해 볼까요?</div>
                        <div className="text-left my-4">
                            공동인증서를 연동해 사업용으로 쓰고있는 카드의 입출금 내역을 자동으로 조회할 수 있어요.
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <Checkbox id="all-agree" />
                                <Label htmlFor="all-agree">전체 동의</Label>
                            </div>
                            <div className="flex flex-col gap-4 pl-5">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="personal-info-agree" />
                                    <Label htmlFor="personal-info-agree">개인정보 수집 및 이용 동의 (필수)</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="terms-agree" />
                                    <Label htmlFor="terms-agree">이용약관 동의 (필수)</Label>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 w-full">
                            <Button
                                variant={'scordi'}
                                size={'lg'}
                                className="w-full"
                                onClick={() => router.push(OrgAssetsCreateByCertificatePageRoute.path(orgId))}
                            >
                                공동인증서로 한번에 연동
                            </Button>
                            <Button
                                variant={'gray'}
                                size={'lg'}
                                className="w-full"
                                onClick={() => router.push(OrgAssetsCreateByAccountPageRoute.path(orgId))}
                            >
                                홈페이지 로그인으로 개별 연동
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AssetCreateLayout>
    );
});

OrgAssetCreateMethodSelectPage.displayName = 'OrgAssetCreateMethodSelectPage';
