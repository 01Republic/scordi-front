import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {ChevronLeft} from 'lucide-react';
import {ExcelUploader} from '^clients/private/_modals/team-members/TeamMemberCreateByExcelModal/ExcelUploader';
import React, {useState} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';

interface BillingHistoryExcelUploadModalProps {
    isOpened: boolean;
    onClose: () => any;
    onCreate?: () => any;
}

export const BillingHistoryExcelUploadModal = (props: BillingHistoryExcelUploadModalProps) => {
    const {isOpened, onClose, onCreate} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const [file, setFile] = useState<File>();
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = () => {};

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
                                        href="/templates/스코디_대량등록_양식.xlsx"
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
                                    isLoading={isLoading}
                                    errorMsg={errorMsg}
                                />
                            </div>
                        </section>
                    </div>

                    <section className="pt-4 mt-auto sticky bottom-0">
                        <button
                            type="button"
                            onClick={onSubmit}
                            className={`btn btn-block ${
                                !file || isLoading
                                    ? 'btn-gray !text-gray-500 pointer-events-none !opacity-50'
                                    : 'btn-scordi'
                            } no-animation btn-animation`}
                        >
                            추가하기
                        </button>
                    </section>
                </div>
            </div>
        </SlideUpModal>
    );
};
