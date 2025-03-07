import {ProductDto} from '^models/Product/type';
import {OrgResponseDataDto} from '^components/ApplicationConnectStage/dto/OrgResponseData.dto';
import {LoginDto} from '^components/ApplicationConnectStage/dto/login.dto';
import {
    FetchedOrgPlanAndCycleDto,
    FetchedProfileDto,
} from '^components/ApplicationConnectStage/dto/fetched.responses.dto';
import {ContentPanel} from '^layouts/ContentLayout/ContentPanel';
import {createSubscription} from '^models/Subscription/api';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';
import {errorNotify} from '^utils/toast-notify';
import {useCallback} from 'react';
import {OrgAppIndexPageRoute} from '^pages/orgs/[id]/apps';
import { Save } from 'lucide-react';

interface ConnectCompleteProps {
    protoApp: ProductDto;
    orgItem: OrgResponseDataDto;
    loginDto: LoginDto;
    profile: FetchedProfileDto;
    billingInfo: FetchedOrgPlanAndCycleDto;
}

export const ConnectComplete = (props: ConnectCompleteProps) => {
    const {protoApp, orgItem, loginDto, profile, billingInfo} = props;
    const router = useRouter();
    const organizationId = Number(router.query.id);
    const productId = Number(router.query.appId);
    const orgName = profile.displayName || orgItem.name;

    const redirectNext = (id: number) => {
        router.replace(OrgAppIndexPageRoute.path(id));
    };

    const onClickHandler = () => {
        const isFreeTier = ['Free'].includes(billingInfo.planName);
        console.log(profile, billingInfo);
        const paymentPlan = protoApp.paymentPlans.find((p) => p.name === billingInfo.planName);
        const billingCycle = paymentPlan
            ? paymentPlan.billingCycles.find((cycle) => {
                  return (
                      cycle.isPerUser === billingInfo.isPerUser && `${cycle.term}`.includes(`${billingInfo.cycleTerm}`)
                  );
              })
            : null;

        if (paymentPlan && billingCycle) {
            createSubscription({
                // sign: JSON.stringify(loginDto),
                organizationId,
                productId,
                // connectedSlug: orgItem.name,
                // displayName: orgName,
                // paymentPlanId: paymentPlan.id,
                // billingCycleId: billingCycle.id,
                // isFreeTier,
                // registeredAt: new Date(),
                // paidMemberCount: billingInfo.paidMemberCount,
                // usedMemberCount: billingInfo.usedMemberCount,
            })
                .then(() => {
                    toast.success('Successfully Saved');
                    redirectNext(organizationId);
                })
                .catch(errorNotify);
        } else {
            alert('문제가 발생했습니다. 관리자에게 문의해주세요');
            console.error('에러 발생. paymentPlan, billingCycle 을 찾을 수 없습니다.', {
                profile,
                billingInfo,
                paymentPlan,
                billingCycle,
                protoApp,
            });
        }
    };

    return (
        <>
            <ContentPanel>
                <div className="w-full flex p-10 items-center justify-center">
                    <div className="text-center">
                        <h3 className="text-2xl mb-10">🎉 &nbsp;&nbsp;성공적으로 불러왔습니다!&nbsp;&nbsp; 🎊</h3>

                        <div className="flex gap-10 mb-10">
                            <div className="flex flex-col gap-4">
                                <img
                                    src={profile.profileImageUrl}
                                    alt={`Profile image of "${orgName}"`}
                                    className="bg-white rounded-xl shadow-lg mx-auto"
                                    width={140}
                                    height={140}
                                />

                                <p className="text-lg text-center font-bold">{orgName}</p>
                            </div>

                            <div>
                                <table className="table table-compact table-zebra shadow-lg rounded">
                                    <thead>
                                        <tr>
                                            <th>Label</th>
                                            <td>value</td>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <th>이름</th>
                                            <td>{orgName}</td>
                                        </tr>
                                        <tr>
                                            <th>플랜</th>
                                            <td>{billingInfo.planName}</td>
                                        </tr>
                                        <tr>
                                            <th>이 달 결제금액</th>
                                            <td>{billingInfo.currentCycleBillAmount.text}</td>
                                        </tr>
                                        <tr>
                                            <th>다음 결제일</th>
                                            <td>{billingInfo.nextPaymentDue}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div>
                            <button className="btn btn-lg btn-secondary text-white gap-4" onClick={onClickHandler}>
                                <Save size={24} />
                                연동 사항 저장하기
                            </button>
                        </div>
                    </div>
                </div>
            </ContentPanel>
        </>
    );
};
