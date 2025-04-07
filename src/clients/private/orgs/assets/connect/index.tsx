import { orgIdParamState, useRouterIdParamState } from "^atoms/common";
import { MainLayout } from "^clients/private/_layouts/MainLayout";
import { MainContainer } from "^clients/private/_layouts/MainLayout/MainContainer";
import { OrgConnectAuthPageRoute } from "^pages/orgs/[id]/assets/connect/auth";
import { OrgConnectAutoPageRoute } from "^pages/orgs/[id]/assets/connect/auto";
import { Button } from "^public/components/ui/button";
import { Checkbox } from "^public/components/ui/checkbox";
import { Label } from "^public/components/ui/label";
import router from "next/router";

export const SelectAutoOrManualPage = () => {
    const orgId = useRouterIdParamState('id', orgIdParamState);

    return (
        <MainLayout>
            <MainContainer>
                <div className="max-w-[500px] w-full flex flex-col gap-4 mx-auto my-auto space-y-4 justify-center mt-40">
                    <div className="text-left text-24 font-bold">
                        자산을 연동해 볼까요?
                    </div>
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
                        <Button variant={'scordi'} size={'lg'} className="w-full" onClick={() => router.push(OrgConnectAutoPageRoute.path(orgId))}>
                            공동인증서로 한번에 연동
                        </Button>
                        <Button variant={'gray'} size={'lg'} className="w-full" onClick={() => router.push(OrgConnectAuthPageRoute.path(orgId))}>
                            홈페이지 로그인으로 개별 연동
                        </Button>
                    </div>
                </div>
            </MainContainer>
        </MainLayout>
    );
};