import React, {memo, useEffect, useState} from 'react';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {useRecoilValue, useResetRecoilState} from 'recoil';
import {connectInvoiceAccountCodeAtom} from '^v3/share/OnboardingFlow/steps/ConnectInvoiceAccountBeforeLoad/atom';
import {orgIdParamState} from '^atoms/common';
import {useInvoiceAccountListInConnector} from '^models/InvoiceAccount/hook';
import {invoiceAccountTimeoutChain} from '^v3/share/OnboardingFlow/steps/ConnectInvoiceAccountIsLoading/invoiceAccountTimeoutChain';
import {getCreateInvoiceAccountFromTo} from '^models/InvoiceAccount/type';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {toast} from 'react-hot-toast';
import {FaChevronLeft} from 'react-icons/fa6';
import {ApiError} from '^api/api';

interface InvoiceAccountAutoCreateModalProps {
    isOpened: boolean;
    onClose: () => any;
    onCreate: () => any;
    onRetry: () => any;
}

export const InvoiceAccountAutoCreateModal = memo((props: InvoiceAccountAutoCreateModalProps) => {
    const {isOpened, onClose, onCreate, onRetry} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const code = useRecoilValue(connectInvoiceAccountCodeAtom);
    const resetCode = useResetRecoilState(connectInvoiceAccountCodeAtom);
    const [title, setTitle] = useState('인증 정보를 가져오고 있어요.');
    const [desc, setDesc] = useState('최대 1분 정도 걸릴 수 있어요. 잠시만 기다려주세요.');
    const {reload} = useInvoiceAccountListInConnector();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string>();

    const createInvoiceAccount = (code: string) => {
        setIsLoading(true);
        invoiceAccountTimeoutChain(setTitle, setDesc);

        const dto = {
            code,
            gmailQueryOptions: getCreateInvoiceAccountFromTo(),
        };

        invoiceAccountApi
            .createV2(orgId, dto)
            .then((res) => {
                if (res.status !== 201) return;
                reload().then(() => resetCode());
            })
            .catch((err: ApiError) => {
                console.log('err', err);
                setErrorMsg(err.response?.data.message);
            })
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        if (code) createInvoiceAccount(code);
    }, [code]);

    return (
        <>
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

                        {isLoading && (
                            <div className="mb-12 animate-pulse">
                                <h2 className="font-bold text-xl leading-tight">{title}</h2>
                                <h3 className="text-lg mb-4">{desc}</h3>
                                <br />
                            </div>
                        )}

                        {!isLoading && errorMsg && (
                            <div className="mb-12">
                                <h2 className="font-bold text-xl leading-tight text-red-500">
                                    {errorMsg.includes('이미 존재하는 계정')
                                        ? '이미 등록된 계정이에요!'
                                        : '앗 조치가 필요해요'}
                                </h2>
                                <h2 className="text-lg mb-4">
                                    {errorMsg.includes('Invalid grant')
                                        ? '토큰 유효시간이 만료되었어요 💦'
                                        : errorMsg.includes('이미 존재하는 계정')
                                        ? '기존 계정과 통합할까요?'
                                        : errorMsg}
                                </h2>
                                <br />
                            </div>
                        )}
                    </div>
                </header>

                {isLoading && (
                    <section className="py-8 flex items-center justify-center">
                        <div>
                            <progress className="progress bg-gray-200 progress-primary w-[160px]" />
                        </div>
                    </section>
                )}

                {!isLoading && errorMsg && (
                    <section className="fixed p-4 bottom-0 left-0 right-0">
                        {errorMsg.includes('Invalid grant') && (
                            <button
                                className="btn btn-scordi btn-block"
                                onClick={() => {
                                    const btn = document.querySelector(
                                        '[data-component="GoogleLoginBtn"]',
                                    ) as HTMLElement | null;
                                    btn?.click();
                                    const select = document.querySelector(
                                        '#invoiceAccountSelect',
                                    ) as HTMLElement | null;
                                    select?.click();
                                    onRetry();
                                }}
                            >
                                인증 재시도
                            </button>
                        )}
                        {errorMsg.includes('이미 존재하는 계정') && (
                            <div className="grid grid-cols-2 gap-2">
                                <button className="btn bg-gray-200 text-gray-500" onClick={onClose}>
                                    아니요, 돌아갈게요
                                </button>
                                <button className="btn btn-scordi">네, 계속할게요</button>
                            </div>
                        )}
                    </section>
                )}
            </SlideUpModal>
        </>
    );
});
InvoiceAccountAutoCreateModal.displayName = 'InvoiceAccountAutoCreateModal';
