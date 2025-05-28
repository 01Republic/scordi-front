import React, {memo, useState} from 'react';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CodefAccountCreateErrorResponseDto} from '^models/CodefAccount/type/create-account.response.dto';
import {PageFlashPortal} from '^components/util/TopLineBannerPortal';
import {X} from 'lucide-react';
import {LinkTo} from '^components/util/LinkTo';
import {AnimatedModal} from '^components/modals/_shared/AnimatedModal';
import {CodefRequestBusinessType} from '^models/CodefAccount/type/enums';
import Tippy from '@tippyjs/react';

interface AssetsConnectStepFlashHandlerProps {
    failures?: CodefAccountCreateErrorResponseDto[];
}

export const AssetsConnectStepFlashHandler = memo((props: AssetsConnectStepFlashHandlerProps) => {
    const {failures = []} = props;
    const [isOpen, setIsOpen] = useState(failures.length > 0);
    const [isFailModalOpened, setIsFailModalOpened] = useState(false);

    if (!isOpen) return <></>;

    return (
        <>
            <PageFlashPortal>
                <div className="px-4 shadow rounded-lg w-full overflow-hidden transition-all h-[3rem] text-14 flex items-center justify-between bg-yellowColor-100 !text-yellowColor-400">
                    <div className="min-w-[48px] flex items-center justify-center">&nbsp;</div>
                    <div className="flex-1 text-center">
                        <span className="mr-8">⚠️ 연동에 실패한 금융기관이 있어요</span>
                        <LinkTo
                            className="btn-link underline-offset-2 cursor-pointer transition-all hover:text-blue-700"
                            onClick={() => setIsFailModalOpened(true)}
                        >
                            자세히 알아보기
                        </LinkTo>
                    </div>
                    <div className="min-w-[48px] flex items-center justify-center">
                        <X
                            size={14}
                            className="cursor-pointer text-gray-500 hover:text-black transition-all"
                            onClick={() => setIsOpen(false)}
                        />
                    </div>
                </div>
            </PageFlashPortal>

            <FailModal isOpened={isFailModalOpened} onClose={() => setIsFailModalOpened(false)} failures={failures} />
        </>
    );
});

interface Props {
    isOpened: boolean;
    onClose: () => void;
    failures: CodefAccountCreateErrorResponseDto[];
}

const FailModal = (props: Props) => {
    const {isOpened, onClose, failures} = props;

    const bankFails = failures.filter((fail) => {
        const [error] = fail?.data?.errorList || [];
        return error.businessType === CodefRequestBusinessType.Bank;
    });

    const cardFails = failures.filter((fail) => {
        const [error] = fail?.data?.errorList || [];
        return error.businessType === CodefRequestBusinessType.Card;
    });

    return (
        <AnimatedModal name="FailModal" open={isOpened} onClose={onClose}>
            <div className="relative mx-auto max-w-lg w-full">
                <div className={'bg-white rounded-2xl p-6 pt-5 flex flex-col'}>
                    <header className={`flex justify-between items-start ${'mb-8'}`}>
                        <div>
                            <h3 className="text-xl mb-1.5">불러오지 못한 금융기관이 있어요.</h3>
                            {/*<p className="text-[#999] font-medium text-16"></p>*/}
                        </div>
                    </header>

                    <div className="flex flex-col gap-6 mb-8">
                        {bankFails.length > 0 && (
                            <div>
                                <h4 className="text-16 font-semibold pb-2">은행</h4>
                                <ul className="pl-6 list-disc">
                                    {bankFails.map((fail) => {
                                        const [error] = fail?.data?.errorList || [];
                                        const company = BankAccountsStaticData.findOne(error.organization);

                                        if (!company) return <></>;

                                        return (
                                            <li key={company.param} className="text-14 pb-1">
                                                <Tippy
                                                    content={error.message}
                                                    className="!text-12"
                                                    placement="right"
                                                    theme="light"
                                                >
                                                    <div className="inline-block">{company.displayName}</div>
                                                </Tippy>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}

                        {cardFails.length > 0 && (
                            <div>
                                <h4 className="text-16 font-semibold pb-2">카드</h4>
                                <ul className="pl-6 list-disc">
                                    {cardFails.map((fail) => {
                                        const [error] = fail?.data?.errorList || [];
                                        const company = CardAccountsStaticData.findOne(error.organization);

                                        if (!company) return <></>;

                                        return (
                                            <li key={company.param} className="text-14 pb-1">
                                                <Tippy
                                                    content={error.message}
                                                    className="!text-12"
                                                    placement="right"
                                                    theme="light"
                                                >
                                                    <div className="inline-block">{company.displayName}</div>
                                                </Tippy>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}
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
};
