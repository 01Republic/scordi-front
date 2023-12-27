import {AppIconButton} from '^components/AppIconButton';
import {TextInput} from '^components/TextInput';
import {DefaultButton} from '^components/Button';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {ProductDto} from '^models/Product/type';
import {CrawlerError, CrawlerErrors, LoginDto, LoginWithVerify, WorkspaceItemDto} from '^types/crawler';
import {useForm} from 'react-hook-form';
import {getOrganizationListByCrawlerApi, makeSignHeader} from '^api/crawler';
import {errorNotify} from '^utils/toast-notify';
import {createSubscription} from '^models/Subscription/api';
import {OrgHomeRoute} from '^pages/orgs/[id]/home';
import {toast} from 'react-toastify';
import {MobileViewContainer} from '^components/MobileTopNav';
import {productApi} from '^models/Product/api';

type AddAutoProps = {
    appInfo: ProductDto;
};

export const AddAuto = (props: AddAutoProps) => {
    const router = useRouter();
    const orgId = Number(router.query.orgId);
    const productId = Number(router.query.id);
    const [product, setProduct] = useState<ProductDto>();
    const loginForm = useForm<LoginDto | LoginWithVerify>();
    const [isFailed, setIsFailed] = useState(false);
    const [verifyCodeRequiredMSG, setVerifyCodeRequiredMSG] = useState('');
    const [orgListVisible, setOrgListVisible] = useState(false);
    const [orgList, setOrgList] = useState<WorkspaceItemDto[]>([]);

    useEffect(() => {
        productApi.show(productId).then(({data}) => setProduct(data));
    }, []);

    /**
     * 1단계. 처음 랜더링 된 계정입력 페이지에서 [연동 시작하기] 버튼을 눌러
     * 다음 로직을 실행하고, 다음 페이지로 넘어갑니다.
     */
    const logIntoService = (dto: LoginDto | LoginWithVerify) => {
        getOrganizationListByCrawlerApi(productId, dto)
            .then((res) => {
                if (res.data instanceof Array) {
                    setOrgList(res.data);
                    setOrgListVisible(true);
                } else {
                    setIsFailed(true);
                }
            })
            .catch((e: CrawlerError) => {
                const err = e.response.data;
                if (err.code === CrawlerErrors.verifyRequest) {
                    setVerifyCodeRequiredMSG(err.message);
                } else if (err.code === CrawlerErrors.blocked) {
                    toast.warning(`${err.message} - By ${product!.nameEn}`);
                }
            });
    };

    /**
     * 2단계. 두 번째로 랜더링 된 조직선택 페이지에서 [연동] 버튼을 눌러
     * 다음 로직을 실행하고, 다음 페이지로 넘어갑니다.
     */
    const selectOrgItem = (name: string) => {
        const dto = loginForm.getValues();
        if (!orgId || !productId || !product) {
            toast.error('orgId, productId, producttype 세 가지는 모두 존재해야 합니다. :(');
            return;
        }

        // 서비스 연동 정보 생성하고
        createSubscription({
            // sign: makeSignHeader(dto)['Crawler-Sign'],
            organizationId: orgId,
            productId,
            // connectedSlug: name,
            // displayName: name,
        })
            .then(({data: app}) => app)
            .then((app) => {
                toast.success('연동이 시작되었습니다!\n완료되면 알려드릴게요 :)');
                return app;
            })
            // 홈으로.
            .then((app) => router.replace(OrgHomeRoute.path(orgId)))
            .catch(errorNotify);
    };

    if (orgListVisible) {
        return <OrgListPage appInfo={props.appInfo} orgList={orgList} onSelect={selectOrgItem} />;
    }

    return (
        <MobileViewContainer>
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
                <AppIconButton name={props.appInfo.nameEn} icon={props.appInfo.image} />
            </div>

            {isFailed ? (
                <>
                    <div className="mb-3">
                        <DefaultButton text={'다시 연동하기'} onClick={() => router.reload()} />
                    </div>
                    <div className="mb-3">
                        <DefaultButton text={'다른 서비스 연동하기'} onClick={() => null} color={'white'} />
                    </div>
                </>
            ) : (
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
                    {verifyCodeRequiredMSG && (
                        <TextInput
                            label={`기기 인증 코드`}
                            type={'text'}
                            required={true}
                            placeholder={'전송받은 인증코드를 입력해주세요.'}
                            helpText={<span className="text-red-400">{verifyCodeRequiredMSG}</span>}
                            {...loginForm.register('verificationCode', {required: true})}
                        />
                    )}

                    {/*<DefaultButton text={'연동 시작하기'} onClick={() => router.push(AddCompletePageRoute.pathname)} />*/}
                    <DefaultButton text={'연동 시작하기'} type={'submit'} />
                </form>
            )}
        </MobileViewContainer>
    );
};

interface OrgListPageProps {
    appInfo: ProductDto;
    orgList: WorkspaceItemDto[];
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
            {/*    <AppIconButton name={appInfo.nameEn} icon={appInfo.image} />*/}
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
