import {memo} from 'react';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import {BackButton2} from '^components/BackButton';
import {NextImage} from '^components/NextImage';
import {SafeBadge} from '^clients/private/orgs/connects/SafeBadge';
import {WithChildren} from '^types/global.type';

interface DescriptionLayoutProps extends WithChildren {
    src: string;
    alt: string;
    title: string;
    warnTexts: string[];
    ConnectButton: () => JSX.Element;
    safeBadge?: boolean;
}

export const ConnectionAndDescriptionSection = memo((props: DescriptionLayoutProps) => {
    const {src, alt, title, warnTexts, ConnectButton, children, safeBadge = false} = props;

    return (
        <PureLayout>
            <div className="px-40 py-14">
                <div className="flex flex-col gap-10">
                    <section className="sticky top-14">
                        <BackButton2 />
                    </section>
                    <div className="grid grid-cols-2 gap-24 items-start">
                        {/* connection 섹션 */}
                        <section className="sticky top-[7.5rem] flex flex-col gap-10">
                            <div className="flex items-center justify-between">
                                <NextImage src={src} alt={alt} className="avatar bg-white" width={48} height={48} />
                                {safeBadge && <SafeBadge />}
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 whitespace-pre-line">{title}</h1>
                            <div className="flex flex-col gap-3 rounded-box py-4 px-6 bg-red-50 text-red-400 border border-red-400">
                                <p className="font-semibold text-lg">잠깐, 다음과 같은 안내를 확인해주세요.</p>
                                <ul className="list-disc pl-4 font-medium text-md">
                                    {warnTexts.map((warn, idx) => (
                                        <li key={idx}>{warn}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="w-full grid grid-cols-2 gap-4">
                                <ConnectButton />
                            </div>
                        </section>

                        {/* description */}
                        <section className="col-span-1">
                            <div className="w-full flex flex-col gap-20">{children}</div>
                        </section>
                    </div>
                </div>
            </div>
        </PureLayout>
    );
});
