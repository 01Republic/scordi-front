import React, {memo} from 'react';
import {CodefApiAccountItemDto} from '^models/CodefAccount/type/CodefApiAccountItemDto';
import {AnimatedModal} from '^components/modals/_shared/AnimatedModal';
import {ErrorGroupSection, getErrorGroupTitle} from './ErrorGroupSection';

interface Props {
    isOpened: boolean;
    onClose: () => void;
    failures: CodefApiAccountItemDto[];
}

/**
 * 기관 계정 등록 실패 내역 모달
 */
export const AccountCreateFailedDetailModal = memo((props: Props) => {
    const {isOpened, onClose, failures} = props;

    const groupedByCode = failures.reduce((acc, error) => {
        const title = getErrorGroupTitle(error.code);
        acc[title] ||= [];
        acc[title].push(error);
        return acc;
    }, {} as Record<string, CodefApiAccountItemDto[]>);

    return (
        <AnimatedModal name="FailModal" open={isOpened} onClose={onClose}>
            <div className="relative mx-auto max-w-lg w-full">
                <div className={'bg-white rounded-2xl p-6 pt-10 flex flex-col'}>
                    <header className={`flex justify-between items-start ${'mb-6'}`}>
                        <div>
                            <h2 className="text-2xl mb-1.5">
                                불러오지 못한 <br /> 금융기관이 있어요.
                            </h2>
                            <p className="text-[#999] font-medium text-14">
                                종종 기관 서버의 응답이 원활하지 않은 경우가 있어요. <br />
                                정보가 있는 기관임에도 실패했다면, 5-10분 뒤 다시 시도해주세요.
                            </p>
                        </div>
                    </header>

                    <div className="space-y-6 mb-8">
                        {Object.entries(groupedByCode).map(([title, errors], i, array) => (
                            <ErrorGroupSection
                                key={i}
                                title={`${array.length > 1 ? `${i + 1}. ` : ''}${title}`}
                                errors={errors}
                            />
                        ))}
                    </div>

                    <div>
                        <button
                            type="button"
                            className="btn btn-block btn-secondary no-animation btn-animation"
                            onClick={onClose}
                        >
                            닫기
                        </button>
                    </div>
                </div>
            </div>
        </AnimatedModal>
    );
});
