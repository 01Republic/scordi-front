import {ExcelUploader} from '^clients/private/_modals/team-members/TeamMemberCreateByExcelModal/ExcelUploader';
import {LinkTo} from '^components/util/LinkTo';
import {ArrowLeft} from 'lucide-react';
import {useRouter} from 'next/router';
import {memo, useState} from 'react';
import {SafeBadge} from '../SafeBadge';

interface ExcelBeforeConnectPageProps {
    onSubmit: (file: File) => void;
}

const Header = memo(function Header() {
    const router = useRouter();

    return (
        <div className="mb-12">
            <LinkTo
                onClick={() => router.back()}
                className="flex items-center text-gray-500 hover:underline gap-2 cursor-pointer"
            >
                <ArrowLeft /> 뒤로가기
            </LinkTo>
        </div>
    );
});

const TitleSection = memo(function TitleSection() {
    return (
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
    );
});

const GuideSection = memo(function GuideSection() {
    return (
        <div className="mb-14 w-full flex flex-col gap-4">
            <section>
                <h3>엑셀로 대량 등록하기</h3>
                <br />
                <ul className="list-decimal pl-4 text-16 leading-loose space-y-2">
                    <li>
                        <a
                            className="link text-scordi underline-offset-2"
                            href="/templates/스코디_대량등록_양식.xlsx"
                            download
                        >
                            엑셀 양식을 다운로드
                        </a>
                        해주세요.
                    </li>
                    <li>양식에 맞추어 추가할 구성원 정보를 정리해주세요.</li>
                    <li>
                        왼쪽에 파일을 놓고 잠시만 기다려주세요.
                        <img
                            src="/images/v3/how-to-connect-excel-1.png"
                            alt="how to connect excel 1"
                            style={{width: '100%'}}
                            className="my-2"
                            loading="lazy"
                        />
                    </li>
                </ul>
            </section>
        </div>
    );
});

export const ExcelBeforeConnectPage = memo(function ExcelBeforeConnectPage({onSubmit}: ExcelBeforeConnectPageProps) {
    const [file, setFile] = useState<File>();
    const [errorMsg, setErrorMsg] = useState('');

    return (
        <div className="py-16 px-12">
            <header className="fixed mb-12">
                <Header />

                <div className="mb-4 flex items-center justify-between">
                    <img
                        src="/images/logo/external/logo_excel.svg"
                        alt="excel logo"
                        className="w-[48px] h-[48px] bg-white"
                    />
                    <SafeBadge />
                </div>

                <TitleSection />

                <ExcelUploader onChange={setFile} onReset={() => setErrorMsg('')} errorMsg={errorMsg} />

                {!!file && (
                    <div className="mt-6 flex justify-center">
                        <button className="btn btn-scordi w-60" onClick={() => onSubmit(file)}>
                            엑셀 업로드
                        </button>
                    </div>
                )}
            </header>

            <div className="grid sm:grid-cols-2">
                <div></div>
                <div>
                    <GuideSection />
                </div>
            </div>
        </div>
    );
});
