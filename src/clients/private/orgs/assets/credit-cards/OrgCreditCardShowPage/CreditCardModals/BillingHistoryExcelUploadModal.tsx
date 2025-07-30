import React, {useState} from 'react';
import {ChevronLeft} from 'lucide-react';
import {toast} from 'react-hot-toast';
import {useQueryClient} from '@tanstack/react-query';
import cn from 'classnames';
import {useOrgIdParam} from '^atoms/common';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {ExcelUploader} from '^clients/private/_modals/team-members/TeamMemberCreateByExcelModal/ExcelUploader';
import {useCreateCreditCardBillingHistoryByExcel} from '^models/BillingHistory/hook';
import {useCurrentCreditCard} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/atom';
import {errorToast} from '^api/api';
import {SUBSCRIPTION_HOOK_KEY} from '^models/Subscription/hook/key';
import {BILLING_HISTORY_HOOK_KEY} from '^models/BillingHistory/hook/key';

interface BillingHistoryExcelUploadModalProps {
    isOpened: boolean;
    onClose: () => void;
    onCreate?: () => void;
}

export const BillingHistoryExcelUploadModal = (props: BillingHistoryExcelUploadModalProps) => {
    const {isOpened, onClose, onCreate} = props;
    const queryClient = useQueryClient();
    const orgId = useOrgIdParam();
    const {currentCreditCard} = useCurrentCreditCard();
    const [file, setFile] = useState<File>();
    const [errorMsg, setErrorMsg] = useState('');

    const {mutate, isPending} = useCreateCreditCardBillingHistoryByExcel();

    if (!currentCreditCard) return <></>;

    const endNumber = currentCreditCard.secretInfo?.number4;

    const onSubmit = () => {
        if (!orgId || !currentCreditCard.id || !file) return;

        const formData = new FormData();
        formData.append('file', file);
        mutate(
            {orgId, creditCardId: currentCreditCard.id, file: formData},
            {
                onSuccess: async () => {
                    await queryClient.invalidateQueries({
                        queryKey: [BILLING_HISTORY_HOOK_KEY.useBillingHistoryListOfCreditCard2],
                    });
                    await queryClient.invalidateQueries({queryKey: [SUBSCRIPTION_HOOK_KEY.listOfCreditCard]});
                    toast.success(`${endNumber} 카드에 결제내역을 엑셀로 등록했어요.`);
                    onCreate && onCreate();
                },
                onError: (error: any) => {
                    errorToast(error);
                },
            },
        );
    };

    return (
        <SlideUpModal
            open={isOpened}
            onClose={onClose}
            size="md"
            minHeight="min-h-screen sm:min-h-[90%]"
            maxHeight="max-h-screen sm:max-h-[90%]"
            modalClassName="rounded-none sm:rounded-t-box"
        >
            <div className="absolute inset-0 p-6">
                <div className="flex flex-col items-stretch h-full">
                    <header className="mb-4">
                        <div className="mb-4">
                            <ChevronLeft className="text-gray-400 cursor-pointer" onClick={onClose} />
                        </div>
                        <p className="font-medium text-12 text-scordi">엑셀로 등록하기</p>
                        <h3 className="font-bold text-xl">엑셀로 구독을 한 번에 등록해요.</h3>
                    </header>

                    <div className="py-4 flex flex-col gap-6 justify-start items-stretch text-14">
                        <section>
                            <div className="flex items-center gap-2">
                                <div>Step 1.</div>
                                <div>
                                    <a
                                        className="link link-primary underline-offset-2"
                                        href="/templates/스코디_승인내역대량등록_양식.xlsx"
                                        download
                                    >
                                        엑셀 양식을 다운로드
                                    </a>
                                    해주세요.
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className="flex items-center gap-2 mb-2">
                                <div>Step 2.</div>
                                <div>양식에 맞추어 결제내역을 정리해 주세요.</div>
                            </div>

                            <div>
                                <ExcelUploader
                                    onChange={setFile}
                                    onReset={() => setErrorMsg('')}
                                    isLoading={isPending}
                                    errorMsg={errorMsg}
                                />
                            </div>
                        </section>
                    </div>

                    <section className="pt-4 mt-auto sticky bottom-0">
                        <button
                            type="button"
                            onClick={onSubmit}
                            className={cn('btn btn-block no-animation btn-animation', {
                                'link_to-loading btn-scordi': isPending,
                                'btn-gray !text-gray-500 pointer-events-none !opacity-50': !file,
                                'btn-scordi': file,
                            })}
                        >
                            추가하기
                        </button>
                    </section>
                </div>
            </div>
        </SlideUpModal>
    );
};
