import React, {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {FaChevronLeft} from 'react-icons/fa6';
import {ExcelUploader} from './ExcelUploader';
import {DropZoneFileInput} from '^clients/private/_components/inputs/file/DropZoneFileInput';
import {useAltForm} from '^hooks/useAltForm';
import {teamMemberApi} from '^models/TeamMember';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';

interface TeamMemberCreateByExcelModalProps {
    isOpened: boolean;
    onClose: () => any;
    onCreate: () => any;
}

export const TeamMemberCreateByExcelModal = memo((props: TeamMemberCreateByExcelModalProps) => {
    const {isOpened, onClose, onCreate} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const [file, setFile] = useState<File>();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = () => {
        console.log('file', file);
        if (!file) return;
        const upload = () =>
            teamMemberApi.createByExcel(orgId, {file}, (progressEvent) => {
                console.log('progressEvent', progressEvent);
            });

        setIsLoading(true);
        upload()
            .then(() => toast.success(`엑셀 양식에 작성된 구성원을 모두 추가했어요.`))
            .then(() => onCreate())
            .catch(errorToast)
            .finally(() => setIsLoading(false));
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
                            <FaChevronLeft className="text-gray-400 cursor-pointer" onClick={onClose} />
                        </div>
                        <p className="font-medium text-12 text-scordi">엑셀로 대량 등록하기</p>
                        <h3 className="font-bold text-xl">엑셀로 대량의 구성원 계정을 한 번에 등록해요.</h3>
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
                                    </a>{' '}
                                    해주세요.
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className="flex items-center gap-2 mb-2">
                                <div>Step 2.</div>
                                <div>양식에 맞추어 추가할 구성원 정보를 정리해 주세요.</div>
                            </div>

                            <div>
                                <ExcelUploader onChange={setFile} />
                            </div>
                        </section>
                    </div>

                    <section className="pt-4 mt-auto sticky bottom-0">
                        <button
                            type="button"
                            onClick={onSubmit}
                            className={`btn btn-block ${
                                file ? 'btn-scordi' : 'btn-gray !text-gray-500 pointer-events-none !opacity-50'
                            } no-animation btn-animation`}
                        >
                            추가하기
                        </button>
                    </section>
                </div>
            </div>
        </SlideUpModal>
    );
});
TeamMemberCreateByExcelModal.displayName = 'TeamMemberCreateByExcelModal';
