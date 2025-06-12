import React, {memo, ReactNode} from 'react';
import {WithLoopText} from '^utils/TypeWritter';
import {Lottie, LOTTIE_SRC} from '^components/LottieNoSSR';
import {PureLayoutContainerSection} from '^clients/private/_layouts/PureLayout/PureLayoutContainerSection';
import {StatusHeader} from '../../../common/StatusHeader';

interface StepHeaderSectionProps {
    isAfterAccountCreated: boolean;
    onMove?: () => any;
    isLoadingMsg: string;
    disabled: boolean;
    allConnected: boolean;
    title?: ReactNode;
    subTitle?: ReactNode;
}

export const StepHeaderSection = memo((props: StepHeaderSectionProps) => {
    const {isAfterAccountCreated, onMove, isLoadingMsg, disabled, allConnected, title, subTitle} = props;

    return (
        <PureLayoutContainerSection className="mb-16 max-w-full sticky top-0 pt-8 pb-4 px-0 bg-layout-background z-10">
            <div className="mx-auto max-w-6xl flex flex-col gap-10 px-4">
                <StatusHeader
                    title={(() => {
                        if (isLoadingMsg) return <WithLoopText text={isLoadingMsg} />;

                        if (isAfterAccountCreated) {
                            // 방금 등록하고 넘어온 경우
                            return disabled
                                ? '선택하신 금융기관에서는 자산을 조회하지 못했어요 💦'
                                : '자산을 선택해주세요'; // (구) 자산 연동이 완료되었어요
                        } else {
                            // 이미 연결된게 있어서 다이렉트로 넘어온 경우
                            return allConnected
                                ? '조회된 모든 자산이 이미 연결되어있네요!'
                                : title ?? '어떤 자산으로부터 구독을 불러올까요?';
                        }
                    })()}
                    subTitle={(() => {
                        if (isLoadingMsg) return '';

                        if (isAfterAccountCreated) {
                            // 방금 등록하고 넘어온 경우
                            return disabled ? '' : '어떤 자산으로부터 구독을 불러올까요?';
                        } else {
                            // 이미 연결된게 있어서 다이렉트로 넘어온 경우
                            return allConnected
                                ? '자산 추가를 클릭해 더 많은 연결수단을 등록 할 수 있어요.'
                                : subTitle ?? '개인사업자의 경우 금융사마다 정의가 달라요. 두 항목 모두 시도해보세요.';
                        }
                    })()}
                    icon={(() => {
                        const empty = <div className="w-0 h-24 -mr-1">&nbsp;</div>;
                        if (isLoadingMsg) return undefined;

                        if (isAfterAccountCreated) {
                            // 방금 등록하고 넘어온 경우
                            return disabled ? undefined : (
                                <Lottie
                                    src={LOTTIE_SRC.CLAP}
                                    loop
                                    autoplay
                                    className={`w-[82px] h-24`}
                                    layout={{fit: 'fill'}}
                                />
                            );
                        } else {
                            // 이미 연결된게 있어서 다이렉트로 넘어온 경우
                            return allConnected ? undefined : undefined;
                        }
                    })()}
                    onMove={onMove}
                />
            </div>
        </PureLayoutContainerSection>
    );
});
StepHeaderSection.displayName = 'StepHeaderSection';
