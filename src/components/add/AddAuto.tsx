import {AppIconButton} from '^components/AppIconButton';
import {TextInput} from '^components/TextInput';
import {DefaultButton} from '^components/Button';
import {AddCompletePageRoute} from '^pages/apps/add/complete';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {ApplicationPrototypeDto} from '^types/applicationPrototype.type';
import {LoginDto, LoginWithVerify, OrgItemDto} from '^types/crawler';
import {useForm} from 'react-hook-form';
import {
    getBillingHistoriesByCrawlerApi,
    getOrganizationByCrawlerApi,
    getOrganizationListByCrawlerApi,
    getOrgBillingInfoByCrawlerApi,
} from '^api/crawler';
import {errorNotify} from '^utils/toast-notify';
import {createApplication} from '^api/application.api';
import {getApplicationPrototype} from '^api/applicationPrototype.api';
import {OrgHomeRoute} from '^pages/orgs/[id]/home';
import {createAppsBillingHistory} from '^api/billing.api';
import {toast} from 'react-toastify';

type AddAutoProps = {
    appInfo: ApplicationPrototypeDto;
};

export const AddAuto = (props: AddAutoProps) => {
    const router = useRouter();
    const orgId = Number(router.query.orgId);
    const prototypeId = Number(router.query.id);
    const [proto, setProto] = useState<ApplicationPrototypeDto>();
    const loginForm = useForm<LoginDto | LoginWithVerify>();
    const [isFailed, setIsFailed] = useState(false);
    const [verifyCodeRequired, setVerifyCodeRequired] = useState(false);
    const [orgListVisible, setOrgListVisible] = useState(false);
    const [orgList, setOrgList] = useState<OrgItemDto[]>([]);

    useEffect(() => {
        getApplicationPrototype(prototypeId).then(({data}) => setProto(data));
    }, []);

    /**
     * 1단계. 처음 랜더링 된 계정입력 페이지에서 [연동 시작하기] 버튼을 눌러
     * 다음 로직을 실행하고, 다음 페이지로 넘어갑니다.
     */
    const logIntoService = (dto: LoginDto | LoginWithVerify) => {
        getOrganizationListByCrawlerApi(prototypeId, dto)
            .then((res) => {
                setOrgList(res.data);
                setOrgListVisible(true);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    /**
     * 2단계. 두 번째로 랜더링 된 조직선택 페이지에서 [연동] 버튼을 눌러
     * 다음 로직을 실행하고, 다음 페이지로 넘어갑니다.
     */
    const selectOrgItem = (name: string) => {
        const dto = loginForm.getValues();
        if (!orgId || !prototypeId || !proto) {
            toast.error('orgId, prototypeId, prototype 세 가지는 모두 존재해야 합니다. :(');
            return;
        }

        Promise.all([
            getOrganizationByCrawlerApi(prototypeId, name, dto),
            getOrgBillingInfoByCrawlerApi(prototypeId, name, dto),
            getBillingHistoriesByCrawlerApi(prototypeId, name, dto),
        ]).then(([{data: profile}, {data: billingInfo}, {data: billingHistories}]) => {
            // console.log('billingInfo', billingInfo);
            const plan = proto.paymentPlans.find((plan) => plan.name === billingInfo.planName);
            // console.log('paymentPlans', proto.paymentPlans, 'plan', plan);
            const cycle = !plan ? null : plan.billingCycles.find((cycle) => cycle.term === billingInfo.cycleTerm);
            // console.log('billingCycles', plan ? plan.billingCycles : null, 'cycle', cycle);

            if (!plan || !cycle) {
                toast.error('일차하는 플랜과 주기 정보를 찾지 못했습니다. :(');
                return;
            }

            // 서비스 연동 정보 생성하고
            createApplication({
                sign: JSON.stringify(dto),
                displayName: profile.displayName || name,
                organizationId: orgId,
                prototypeId,
                paymentPlanId: plan.id,
                billingCycleId: cycle.id,
                isFreeTier: billingInfo.isFreeTier,
                registeredAt: new Date(),
                paidMemberCount: billingInfo.paidMemberCount,
                usedMemberCount: billingInfo.usedMemberCount,
            })
                // 연동 정보 아래에 결제내역 정보 집어넣고
                .then(({data: application}) => {
                    console.log('Created Application', application);
                    const createHistories = billingHistories.map((history) =>
                        createAppsBillingHistory(application.id, {
                            paidAmount: history.amount.amount,
                            paidAt: history.issuedDate,
                            isSuccess: history.isSuccessfulPaid,
                            invoiceUrl: history.receiptUrl,
                        }),
                    );
                    return Promise.all(createHistories);
                })
                // 홈으로.
                .then(([...resList]) => {
                    // console.log(
                    //     'Created Histories',
                    //     resList.map((r) => r.data),
                    // );
                    router.replace(OrgHomeRoute.path(orgId));
                })
                .catch(errorNotify);
        });
    };

    if (orgListVisible) {
        return <OrgListPage appInfo={props.appInfo} orgList={orgList} onSelect={selectOrgItem} />;
    }

    return (
        <div className={'px-[20px] py-[40px]'}>
            {isFailed ? (
                <>
                    <h2>연동이 실패되었어요</h2>
                    <p className={'mt-[20px] text-[#6D7684]'}>이메일 및 비밀번호를 다시 확인해주세요.</p>
                </>
            ) : (
                <>
                    <h2>서비스 연동하기</h2>
                    <p className={'mt-[20px] text-[#6D7684]'}>
                        관리자 계정의 로그인 정보를 입력해 주세요.
                        <br />
                        계정은 암호화하여 전송되며, 식별이 불가능한 형태로
                        <br />
                        안전하게 처리됩니다.
                    </p>
                </>
            )}

            <div className={'py-[30px] text-center'}>
                <AppIconButton name={props.appInfo.name} icon={props.appInfo.image} />
            </div>

            <form onSubmit={loginForm.handleSubmit(logIntoService)}>
                <TextInput
                    label={'아이디'}
                    type={'email'}
                    required={true}
                    placeholder={'아이디를 입력해주세요.'}
                    {...loginForm.register('email', {required: true})}
                />
                <TextInput
                    label={'비밀번호'}
                    type={'password'}
                    required={true}
                    placeholder={'비밀번호를 입력해주세요.'}
                    {...loginForm.register('password', {required: true})}
                />
                {verifyCodeRequired && (
                    <TextInput
                        label={`기기 인증 코드`}
                        type={'text'}
                        required={verifyCodeRequired}
                        placeholder={'전송받은 인증코드를 입력해주세요.'}
                        helpText={
                            <span className="text-red-400">서비스에서 입력한 이메일로 인증코드를 보냈습니다.</span>
                        }
                        {...loginForm.register('verificationCode', {required: verifyCodeRequired})}
                    />
                )}

                {/*<DefaultButton text={'연동 시작하기'} onClick={() => router.push(AddCompletePageRoute.pathname)} />*/}
                <DefaultButton text={'연동 시작하기'} type={'submit'} />
            </form>
            {isFailed ? (
                <>
                    <DefaultButton text={'다시 연동하기'} onClick={() => null} />
                    <DefaultButton text={'다른 서비스 연동하기'} onClick={() => null} />
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

interface OrgListPageProps {
    appInfo: ApplicationPrototypeDto;
    orgList: OrgItemDto[];
    onSelect: (name: string) => void;
}

function OrgListPage(props: OrgListPageProps) {
    const {orgList, appInfo, onSelect} = props;

    return (
        <div className={'px-[20px] py-[40px]'}>
            <h2>연동할 팀을 선택해주세요.</h2>
            <p className={'mt-[20px] text-[#6D7684]'}>
                {/*관리자 계정의 로그인 정보를 입력해 주세요.*/}
                {/*<br />*/}
                {/*계정은 암호화하여 전송되며, 식별이 불가능한 형태로*/}
                {/*<br />*/}
                {/*안전하게 처리됩니다.*/}
            </p>

            {/*<div className={'py-[30px] text-left'}>*/}
            {/*    <AppIconButton name={appInfo.name} icon={appInfo.image} />*/}
            {/*</div>*/}

            <div>
                {orgList.map((orgItem, i) => (
                    <OrgItem key={i} name={orgItem.name} image={orgItem.image} onSelect={onSelect} />
                ))}
            </div>
        </div>
    );
}

interface OrgItemProps {
    name: string;
    image: string;
    onSelect: (name: string) => void;
}

function OrgItem(props: OrgItemProps) {
    const {name, image, onSelect} = props;

    return (
        <div className="flex mb-2 p-3 shadow rounded-lg">
            <img src={image} alt={`${name}`} width={36} className="mr-3" />
            <div className="flex items-center">
                <p className="font-bold">{name}</p>
            </div>
            <div className="ml-auto">
                <button
                    disabled={false}
                    className={`
                        btn btn-primary btn-block border-none
                        btn-sm rounded-[7px]
                        disabled:bg-[#D1D6DB] disabled:drop-shadow-none
                        text-[#7963F7] bg-white hover:bg-[#f5f5f5]
                        drop-shadow-[0_10px_15px_rgba(121,99,247,0.2)]
                        drop-shadow-[0_4px_6px_rgba(121,99,247,0.2)]
                    `}
                    onClick={() => onSelect(name)}
                >
                    연동
                </button>
            </div>
        </div>
    );
}
