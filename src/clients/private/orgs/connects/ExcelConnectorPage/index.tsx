import {LinkTo} from '^components/util/LinkTo';
import {ArrowLeft} from 'lucide-react';
import {useRouter} from 'next/router';
import {memo, useCallback, useRef, useState} from 'react';
import {toast} from 'react-toastify';
import * as XLSX from 'xlsx';
import {SafeBadge} from './SafeBadge';

export const ExcelConnectorPage = memo(function ExcelConnectorPage() {
    const router = useRouter();
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement> | React.DragEvent) => {
        const files =
            event instanceof DragEvent
                ? (event as DragEvent).dataTransfer?.files
                : (event as React.ChangeEvent<HTMLInputElement>).target.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (
                file.type === 'text/csv' ||
                file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            ) {
                // TODO: 파일 업로드 처리 로직 추가
                console.log('Selected file:', file);
            } else {
                toast.error('CSV 또는 XLSX 파일만 업로드 가능합니다.');
            }
        }
    }, []);

    const handleDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();
            setIsDragging(false);
            handleFileChange(event);
        },
        [handleFileChange],
    );

    const handleButtonClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleDownloadTemplate = useCallback(() => {
        const template = [
            ['이름', '이메일주소', '전화번호', '팀', '비고'],
            ['홍길동', 'example@example.com', '010-1234-5678', '개발팀', '샘플 데이터'],
        ];

        const ws = XLSX.utils.aoa_to_sheet(template);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, '구성원 목록');

        XLSX.writeFile(wb, '구성원_등록_템플릿.xlsx');
    }, []);

    return (
        <div className="py-16 px-12">
            <header className="fixed mb-12">
                <div className="mb-12">
                    <LinkTo
                        onClick={() => router.back()}
                        className="flex items-center text-gray-500 hover:underline gap-2 cursor-pointer"
                    >
                        <ArrowLeft /> 뒤로가기
                    </LinkTo>
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
                        <br />
                        <button onClick={handleDownloadTemplate} className="btn btn-scordi btn-sm gap-2">
                            엑셀 템플릿 다운로드
                        </button>
                    </div>
                </div>

                <div
                    className={`w-full border border-dashed border-scordi-300 rounded-box p-4 flex flex-col gap-2 items-center justify-center py-10 ${
                        isDragging ? 'bg-scordi-50' : ''
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <p className="text-16 mb-2 text-center">
                        엑셀 파일을 해당 영역에 드래그 앤 드롭 해주세요.
                        <br />
                        또는,
                    </p>
                    <button className="btn btn-scordi btn-md gap-2 w-60" onClick={handleButtonClick}>
                        파일 선택하기
                    </button>
                    <input
                        type="file"
                        accept=".csv, .xlsx"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                </div>
            </header>

            <div className="grid sm:grid-cols-2">
                <div></div>
                <div>
                    <div className="mb-14 w-full flex flex-col gap-4">
                        <section>
                            <h3>엑셀로 대량 등록하기</h3>
                            <br />
                            <ul className="list-decimal pl-4 text-16 leading-loose space-y-2">
                                <li>엑셀 양식을 다운로드 해주세요.</li>
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
                </div>
            </div>
        </div>
    );
});
