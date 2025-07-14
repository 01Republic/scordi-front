import {memo} from 'react';

export const GuideSection = memo(function GuideSection() {
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
