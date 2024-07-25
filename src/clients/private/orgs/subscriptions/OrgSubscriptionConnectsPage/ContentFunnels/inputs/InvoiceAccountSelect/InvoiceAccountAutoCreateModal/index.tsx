import React, {memo, useEffect, useState} from 'react';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {useRecoilValue, useResetRecoilState} from 'recoil';
import {
    connectInvoiceAccountCodeAtom,
    isGoogleError,
} from '^v3/share/OnboardingFlow/steps/ConnectInvoiceAccountBeforeLoad/atom';
import {orgIdParamState} from '^atoms/common';
import {useGoogleLoginForInvoiceAccountSelect, useInvoiceAccountListInConnector} from '^models/InvoiceAccount/hook';
import {invoiceAccountTimeoutChain} from '^v3/share/OnboardingFlow/steps/ConnectInvoiceAccountIsLoading/invoiceAccountTimeoutChain';
import {getCreateInvoiceAccountFromTo, InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {toast} from 'react-hot-toast';
import {FaChevronLeft} from 'react-icons/fa6';
import {ApiErrorResponse} from '^api/api';
import {plainToInstance} from 'class-transformer';
import {AxiosResponse} from 'axios';

interface InvoiceAccountAutoCreateModalProps {
    isOpened: boolean;
    onClose: () => any;
    onCreate: () => any;
    onRetry: () => any;
}

export const InvoiceAccountAutoCreateModal = memo((props: InvoiceAccountAutoCreateModalProps) => {
    const {isOpened, onClose, onCreate, onRetry} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const {launch, code, resetCode} = useGoogleLoginForInvoiceAccountSelect();
    const [title, setTitle] = useState('인증 정보를 가져오고 있어요.');
    const [desc, setDesc] = useState('최대 1분 정도 걸릴 수 있어요. 잠시만 기다려주세요.');
    const {reload} = useInvoiceAccountListInConnector();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string>();
    const [duplicatedAccount, setDuplicatedAccount] = useState<InvoiceAccountDto>();

    const handleRequest = (request: () => Promise<AxiosResponse<InvoiceAccountDto>>) => {
        setIsLoading(true);
        setDuplicatedAccount(undefined);

        return request()
            .then(() =>
                reload().then(() => {
                    resetCode();
                    onCreate();
                }),
            )
            .catch((err: ApiErrorResponse<InvoiceAccountDto | null>) => {
                const data = err.response?.data;
                if (data) {
                    setErrorMsg(data.message);

                    if (data.code === 'DUPLICATED_ENTITY' && data.data) {
                        const duplicated = plainToInstance(InvoiceAccountDto, data.data);
                        setDuplicatedAccount(duplicated);
                    }
                }
            })
            .finally(() => setIsLoading(false));
    };

    const createInvoiceAccount = (code: string) => {
        return handleRequest(() => {
            const gmailQueryOptions = getCreateInvoiceAccountFromTo();
            return invoiceAccountApi.upsertByCode(orgId, {code, gmailQueryOptions});
        });
    };

    const reConnectInvoiceAccount = (id: number) => {
        return handleRequest(() => {
            return invoiceAccountApi.reConnect(orgId, id, {code});
        });
    };

    useEffect(() => {
        if (!isOpened) {
            setIsLoading(false);
            setErrorMsg(undefined);
            setDuplicatedAccount(undefined);
            setTitle('인증 정보를 가져오고 있어요.');
            setDesc('최대 1분 정도 걸릴 수 있어요. 잠시만 기다려주세요.');
        }
    }, [isOpened]);

    useEffect(() => {
        if (code) {
            if (isGoogleError(code)) {
                setErrorMsg('인증이 취소되었어요 💦');
            } else {
                createInvoiceAccount(code);
            }
        }
    }, [code]);

    return (
        <SlideUpModal
            open={isOpened}
            onClose={onClose}
            size="md"
            minHeight="min-h-screen sm:min-h-[90%]"
            maxHeight="max-h-screen sm:max-h-[90%]"
            modalClassName="rounded-none sm:rounded-t-box"
        >
            <header>
                <div>
                    <div className="mb-4">
                        <FaChevronLeft className="text-gray-400 cursor-pointer" onClick={onClose} />
                    </div>

                    <div className="mb-4 flex items-center justify-between">
                        <img
                            src="https://static.vecteezy.com/system/resources/previews/016/716/465/original/gmail-icon-free-png.png"
                            alt="gmail logo"
                            className="avatar w-[48px] h-[48px] bg-white"
                        />
                    </div>

                    {/* 로딩 전 (소셜로그인 진행중) */}
                    {!isLoading && !errorMsg && (
                        <div className="mb-12 animate-pulse">
                            <h2 className="font-bold text-xl leading-tight">Gmail 에 연결합니다</h2>
                            <h3 className="text-lg mb-4">계정 인증을 기다리고 있어요...</h3>
                            <br />
                        </div>
                    )}

                    {/* 로딩 중 (소셜로그인 후 연동중) */}
                    {isLoading && (
                        <div className="mb-12 animate-pulse">
                            <h2 className="font-bold text-xl leading-tight">{title}</h2>
                            <h3 className="text-lg mb-4">{desc}</h3>
                            <br />
                        </div>
                    )}

                    {/* 연동 중 에러 */}
                    {!isLoading && errorMsg && (
                        <div className="mb-12">
                            <h2 className="font-bold text-xl leading-tight text-red-500">
                                {duplicatedAccount ? '이미 등록된 계정이에요!' : '앗 조치가 필요해요'}
                            </h2>
                            <h2 className="text-lg mb-4">
                                {duplicatedAccount
                                    ? '기존 계정과 통합할까요?'
                                    : errorMsg.includes('Invalid grant')
                                    ? '토큰 유효시간이 만료되었어요 💦'
                                    : errorMsg}
                            </h2>
                            <br />
                        </div>
                    )}
                </div>
            </header>

            {/* 로딩 전 (소셜로그인 진행중) */}
            {!isLoading && !errorMsg && (
                <section className="py-8 flex items-center justify-center">
                    <div>
                        <progress className="progress bg-gray-200 progress-primary w-[160px]" />
                    </div>
                </section>
            )}

            {/* 로딩 중 (소셜로그인 후 연동중) */}
            {isLoading && (
                <section className="py-8 flex items-center justify-center">
                    <div>
                        <progress className="progress bg-gray-200 progress-primary w-[160px]" />
                    </div>
                </section>
            )}

            {/* 연동 중 에러 */}
            {!isLoading && errorMsg && (
                <section className="fixed p-4 bottom-0 left-0 right-0">
                    {errorMsg.includes('Invalid grant') ? (
                        <button className="btn btn-scordi btn-block" onClick={() => launch(onRetry)}>
                            인증 재시도
                        </button>
                    ) : (
                        <div className="grid grid-cols-2 gap-2">
                            <button className="btn bg-gray-200 text-gray-500" onClick={onClose}>
                                돌아가기
                            </button>
                            <button className="btn btn-scordi btn-block" onClick={() => launch(onRetry)}>
                                다시시도
                            </button>
                        </div>
                    )}
                    {duplicatedAccount && (
                        <div className="grid grid-cols-2 gap-2">
                            <button className="btn bg-gray-200 text-gray-500" onClick={onClose}>
                                아니요, 돌아갈게요
                            </button>
                            <button
                                className="btn btn-scordi"
                                onClick={() => {
                                    reConnectInvoiceAccount(duplicatedAccount.id).then(() => {
                                        onCreate();
                                    });
                                }}
                            >
                                네, 계속할게요
                            </button>
                        </div>
                    )}
                </section>
            )}
        </SlideUpModal>
    );
});
InvoiceAccountAutoCreateModal.displayName = 'InvoiceAccountAutoCreateModal';
