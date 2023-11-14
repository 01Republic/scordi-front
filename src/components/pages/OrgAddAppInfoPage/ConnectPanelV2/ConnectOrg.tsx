import React, {useEffect, useMemo, useState} from 'react';
import {Scrapping} from '^components/ApplicationConnectStage/Scrapping';
import {OrgResponseDataDto} from '^components/ApplicationConnectStage/dto/OrgResponseData.dto';
import {ContentPanel, ContentPanelItem, ContentPanelList} from '^layouts/ContentLayout/ContentPanel';
import {IoChevronForwardOutline} from '@react-icons/all-files/io5/IoChevronForwardOutline';
import {AppCode, ApplicationConnectApi} from '^api/applicationConnect.api';
import {ProductDto} from '^models/Product/type';
import {ConnectMethod} from '^components/pages/OrgAddAppInfoPage/ConnectPanelV2/SelectConnectMethod';
import {LoginDto} from '^components/ApplicationConnectStage/dto/login.dto';
import {
    FetchedOrgPlanAndCycleDto,
    FetchedProfileDto,
} from '^components/ApplicationConnectStage/dto/fetched.responses.dto';
import {ConnectComplete} from '^components/pages/OrgAddAppInfoPage/ConnectPanelV2/ConnectComplete';

interface ConnectOrgProps {
    protoApp: ProductDto;
    setConnectMethod: React.Dispatch<React.SetStateAction<ConnectMethod | undefined>>;
    orgItems: OrgResponseDataDto[];
    loginDto: LoginDto;
}

export const ConnectOrg = (props: ConnectOrgProps) => {
    const {protoApp, orgItems, loginDto} = props;
    const [pendingOrg, setPendingOrg] = useState<OrgResponseDataDto>();
    const [fulfilledOrg, setFulfilledOrg] = useState<OrgResponseDataDto>();
    const [errorMessage, setErrorMessage] = useState('');
    const [profile, setProfile] = useState<FetchedProfileDto>();
    const [billingInfo, setBillingInfo] = useState<FetchedOrgPlanAndCycleDto>();
    const api = useMemo(() => new ApplicationConnectApi(protoApp.nameEn as AppCode), [protoApp.nameEn]);

    const onClickHandler = (item: OrgResponseDataDto) => {
        setPendingOrg(item);
        Promise.all([
            api.getOrgProfile(item.name, loginDto).then((res) => setProfile(res.data)),
            api.getOrgPlanAndCycle(item.name, loginDto).then((res) => setBillingInfo(res.data)),
        ]).then(() => {
            setPendingOrg(undefined);
            setFulfilledOrg(item);
        });
    };

    const isFulfilled = () => !pendingOrg && profile && billingInfo && fulfilledOrg;

    return !isFulfilled() ? (
        <ContentPanel title="연동할 조직을 선택해주세요." desc={`로그인한 계정이 관리 할 수 있는 조직 목록입니다.`}>
            <ContentPanelList>
                {orgItems.map((item) => (
                    <ContentPanelItem key={item.name}>
                        <div className="flex w-full justify-between">
                            <span className="font-bold text-gray-500">{item.name}</span>

                            <button
                                type="button"
                                className={`btn btn-xs btn-outline btn-secondary gap-1 ${
                                    pendingOrg?.name === item.name ? 'loading' : ''
                                }`}
                                disabled={!!pendingOrg}
                                onClick={() => onClickHandler(item)}
                            >
                                {pendingOrg?.name === item.name ? (
                                    <>연결중</>
                                ) : (
                                    <>
                                        <IoChevronForwardOutline /> 연결하기
                                    </>
                                )}
                            </button>
                        </div>
                    </ContentPanelItem>
                ))}
            </ContentPanelList>
        </ContentPanel>
    ) : (
        <ConnectComplete
            protoApp={protoApp}
            orgItem={fulfilledOrg!}
            loginDto={loginDto}
            profile={profile!}
            billingInfo={billingInfo!}
        />
    );
};
