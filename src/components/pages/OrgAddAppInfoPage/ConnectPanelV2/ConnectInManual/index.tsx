import React, {useMemo, useState} from 'react';
import {ProductDto} from '^types/product.type';
import {ConnectMethod} from '../SelectConnectMethod';
import {ContentPanel, ContentPanelItem, ContentPanelList} from '^layouts/ContentLayout/ContentPanel';
import {InvoiceDropZone} from '^components/pages/OrgAddAppInfoPage/ConnectPanelV2/ConnectInManual/InvoiceDropZone';
import {AppCode, ApplicationConnectApi} from '^api/applicationConnect.api';
import {InvoiceDataDto} from '^components/ApplicationConnectStage/dto/fetched.responses.dto';
import {IoChevronBackOutline} from '@react-icons/all-files/io5/IoChevronBackOutline';
import {IoFlash} from '@react-icons/all-files/io5/IoFlash';
import {createSubscriptionByInvoices} from '^api/subscription.api';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';
import {errorNotify} from '^utils/toast-notify';
import {OrgAppIndexPageRoute} from '^pages/orgs/[id]/apps';

interface ConnectInManualProps {
    protoApp: ProductDto;
    setConnectMethod: React.Dispatch<React.SetStateAction<ConnectMethod | undefined>>;
}

export const ConnectInManual = (props: ConnectInManualProps) => {
    const {protoApp, setConnectMethod} = props;
    const router = useRouter();
    const organizationId = Number(router.query.id);
    const prototypeId = Number(router.query.appId);
    const [parsedInvoiceDataList, setParsedInvoiceDataList] = useState<InvoiceDataDto[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const api = useMemo(() => new ApplicationConnectApi(protoApp.name as AppCode), [protoApp.name]);
    const connectable = parsedInvoiceDataList.length > 0;

    const getTime = (timeStr: string) => new Date(timeStr).getTime();
    const redirectNext = (id: number) => {
        router.replace(OrgAppIndexPageRoute.path(id));
    };

    const onSubmit = () => {
        if (connectable) {
            const orderedList = parsedInvoiceDataList.sort((a, b) => getTime(a.issuedAt) - getTime(b.issuedAt));
            const [recentData] = orderedList;
            const [oldestData] = orderedList.reverse();
            const isFreeTier = ['Free'].includes(recentData.planName);
            const paymentPlan = protoApp.paymentPlans.find((p) => p.name === recentData.planName);
            const billingCycle = paymentPlan
                ? paymentPlan.billingCycles.find(
                      (cycle) =>
                          cycle.isPerUser === recentData.isPerUser &&
                          `${cycle.term}`.includes(`${recentData.cycleTerm}`),
                  )
                : null;

            if (paymentPlan && billingCycle) {
                setIsSaving(true);
                createSubscriptionByInvoices({
                    displayName: recentData.displayName,
                    organizationId,
                    prototypeId,
                    paymentPlanId: paymentPlan.id,
                    billingCycleId: billingCycle.id,
                    isFreeTier,
                    registeredAt: oldestData.issuedAt,
                    paidMemberCount: recentData.paidMemberCount,
                    invoiceDataList: orderedList,
                })
                    .then(() => {
                        setIsSaving(false);
                        toast.success('Successfully Saved');
                        redirectNext(organizationId);
                    })
                    .catch(errorNotify);
            }
        }
    };

    return (
        <ContentPanel
            title="인보이스(결제청구서)를 업로드해주세요."
            desc={`<b>${protoApp.name}</b> 에서 이메일로 전달받은 결제 청구서를 업로드해주세요.`}
        >
            <ContentPanelList>
                <InvoiceDropZone
                    api={api}
                    results={parsedInvoiceDataList}
                    setResults={setParsedInvoiceDataList}
                    isSaving={isSaving}
                />

                {/* Buttons */}
                <ContentPanelItem>
                    <div className="flex w-full justify-between">
                        <button
                            type="button"
                            className="btn btn-ghost border-[#dbd6e1] gap-2"
                            onClick={() => setConnectMethod(undefined)}
                        >
                            <IoChevronBackOutline /> 처음으로
                        </button>

                        <button className="btn btn-secondary text-lg gap-2" disabled={!connectable} onClick={onSubmit}>
                            <IoFlash /> Add App
                        </button>
                    </div>
                </ContentPanelItem>
            </ContentPanelList>
        </ContentPanel>
    );
};
