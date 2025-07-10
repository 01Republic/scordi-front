import {ExcelUploader} from '^clients/private/_modals/team-members/TeamMemberCreateByExcelModal/ExcelUploader';
import {BackButton} from '^components/BackButton';
import {memo} from 'react';
import {SafeBadge} from '../../SafeBadge';

interface HeaderSectionProps {
    file: File | undefined;
    errorMsg: string;
    setFile: (file: File | undefined) => void;
    setErrorMsg: (msg: string) => void;
    onSubmit: (file: File) => void;
}

export const HeaderSection = memo(function HeaderSection({
    file,
    errorMsg,
    setFile,
    setErrorMsg,
    onSubmit,
}: HeaderSectionProps) {
    return (
        <header className="fixed mb-12">
            <div className="mb-12">
                <BackButton />
            </div>

            <div className="mb-4 flex items-center justify-between">
                <img
                    src="/images/logo/external/logo_excel.svg"
                    alt="excel logo"
                    className="w-[48px] h-[48px] bg-white"
                />
                <SafeBadge />
            </div>

            <div className="mb-6 w-full min-w-[500px]">
                <h1 className="text-3xl my-10 font-medium">
                    엑셀 템플릿<span className="text-gray-400">을 활용해서 </span> <br />{' '}
                    <span className="text-gray-400">구성원 계정을 한 번에 등록해요</span>
                </h1>

                <div className="rounded-box p-4 bg-red-50 text-red-400 border border-red-400">
                    <p className="font-medium text-18 mb-2">잠깐, 양식에 맞춰서 구성원 정보를 추가해요.</p>
                    <ul className="list-disc pl-4 text-16">
                        <li>이름, 이메일주소는 필수값이에요.</li>
                        <li>csv와 xlxs 파일만 등록이 가능해요.</li>
                    </ul>
                </div>
            </div>

            <ExcelUploader
                onChange={(file) => {
                    setFile(file);
                    if (file) onSubmit(file);
                }}
                onReset={() => setErrorMsg('')}
                errorMsg={errorMsg}
            />
        </header>
    );
});
