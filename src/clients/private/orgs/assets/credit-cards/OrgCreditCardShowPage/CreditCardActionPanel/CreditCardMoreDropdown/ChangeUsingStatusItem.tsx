import React, {memo, useState} from 'react';
import {useCurrentCreditCard} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/atom';
import {MoreDropdownMenuItem} from '^clients/private/_components/rest-pages/ShowPage/MoreDropdown';
import {UsingStatusTag} from '^models/CreditCard/components';
import {CreditCardUsingStatus} from '^models/CreditCard/type';
import {FaCheck, FaChevronDown} from 'react-icons/fa6';
import Tippy from '@tippyjs/react/headless';
import {creditCardApi} from '^models/CreditCard/api';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';

export const ChangeUsingStatusItem = memo(function ChangeUsingStatusItem() {
    const {currentCreditCard, reload} = useCurrentCreditCard();
    const [isLoading, setIsLoading] = useState(false);

    if (!currentCreditCard) return <></>;

    const {usingStatus} = currentCreditCard;

    return (
        <MoreDropdownMenuItem onClick={console.log} theme="none" size="default">
            <div
                className={`flex items-center justify-between text-13 ${
                    isLoading ? 'opacity-50 pointer-events-none' : ''
                }`}
            >
                <div className="">사용 상태</div>
                <div>
                    <Tippy
                        interactive
                        placement="right-start"
                        render={() => (
                            <UsingStatusSelect
                                selectedValue={usingStatus}
                                selectOption={(option: CreditCardUsingStatus) => {
                                    if (!currentCreditCard) return;
                                    const {organizationId: orgId, id} = currentCreditCard;
                                    const req = creditCardApi.update(orgId, id, {usingStatus: option});

                                    setIsLoading(true);
                                    req.then(() => toast.success('변경 성공'))
                                        .then(() => reload())
                                        .catch(errorToast)
                                        .finally(() => setIsLoading(false));
                                }}
                            />
                        )}
                    >
                        <div className="flex items-center justify-end hover:bg-slate-50 transition-all rounded-md py-1 px-1.5 -my-1 -mr-1.5">
                            <div className="">
                                <UsingStatusTag value={usingStatus} />
                            </div>

                            <div>
                                <FaChevronDown fontSize={10} className="text-gray-500" />
                            </div>
                        </div>
                    </Tippy>
                </div>
            </div>
        </MoreDropdownMenuItem>
    );
});

const UsingStatusSelect = (props: {
    selectedValue: CreditCardUsingStatus;
    selectOption: (option: CreditCardUsingStatus) => any;
}) => {
    const {selectedValue, selectOption} = props;
    return (
        <div className="text-14 menu px-0 py-0.5 shadow-xl bg-white border rounded-md min-w-[180px] !z-[1]">
            <div className="w-full mb-1 px-2 pt-2 pb-1">
                <p className="text-12 font-semibold text-gray-500">사용 상태를 변경할까요?</p>
                {/*<p className="text-10">사용상태 변경하기</p>*/}
            </div>

            {[
                CreditCardUsingStatus.UnDef,
                CreditCardUsingStatus.NoUse,
                CreditCardUsingStatus.InUse,
                CreditCardUsingStatus.Expired,
            ].map((option, i) => {
                const isSelected = selectedValue === option;
                return (
                    <div
                        tabIndex={0}
                        key={i}
                        className="px-2 py-0.5 flex items-center justify-between cursor-pointer group hover:bg-gray-100 transition-all"
                        onClick={() => selectOption(option)}
                    >
                        <div className="flex-auto">
                            <UsingStatusTag value={option} />
                        </div>

                        <div>{isSelected && <FaCheck fontSize={16} className="text-green-500" />}</div>
                    </div>
                );
            })}
        </div>
    );
};
