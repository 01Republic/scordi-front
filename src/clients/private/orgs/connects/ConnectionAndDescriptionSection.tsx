import {memo, ReactNode} from 'react';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import {BackButton} from '^components/BackButton';
import {NextImage} from '^components/NextImage';
import {SafeBadge} from '^clients/private/orgs/connects/SafeBadge';
import {WithChildren} from '^types/global.type';

interface DescriptionLayoutProps extends WithChildren {
    src: string;
    alt: string;
    title: string;
    warnTexts: string[];
    connectButton: ReactNode;
    onClick: () => void;
}

export const ConnectionAndDescriptionSection = memo((props: DescriptionLayoutProps) => {
    const {src, alt, title, warnTexts, connectButton, onClick, children} = props;
    return (
        <PureLayout>
            <div className="px-40 py-14 grid grid-cols-2 gap-24 items-start">
                {/* connection section */}
                <section className="sticky top-14 col-span-1 w-full flex flex-col gap-10">
                    <BackButton />
                    <div className="mb-4 flex items-center justify-between">
                        <NextImage src={src} alt={alt} className="avatar bg-white" width={48} height={48} />
                        <SafeBadge />
                    </div>
                    <span className="text-32 font-semibold text-gray-900 whitespace-pre-line">{title}</span>
                    <div className="flex flex-col gap-3 rounded-box p-4 bg-red-50 text-red-400 border border-red-400">
                        <p className="font-semibold text-20">잠깐, 다음과 같은 안내를 확인해주세요.</p>
                        <ul className="list-disc pl-4 font-normal text-18">
                            {warnTexts.map((warn, idx) => (
                                <li key={idx}>{warn}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-full grid grid-cols-2 gap-4">{connectButton}</div>
                </section>

                {/* description section */}
                <section className="col-span-1">
                    {/*<div></div>*/}
                    <div className="w-full flex flex-col gap-20">
                        {children}
                        <section className="flex flex-col gap-6">
                            <p className="text-2xl font-bold">연결을 시작해볼까요?</p>
                            <button onClick={onClick} className="btn btn-md btn-block btn-scordi">
                                연결 시작하기
                            </button>
                        </section>
                    </div>
                </section>
            </div>
        </PureLayout>
    );
});
