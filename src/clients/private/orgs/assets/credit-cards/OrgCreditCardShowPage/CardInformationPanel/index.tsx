import React, {memo, useEffect, useState} from 'react';
import {WithChildren} from '^types/global.type';
import {useAltForm} from '^hooks/useAltForm';
import {
    CreditCardDto,
    CreditCardUsingStatus,
    UnSignedCreditCardFormData,
    UpdateCreditCardDto,
} from '^models/CreditCard/type';
import {useCurrentCreditCard} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/atom';
import {plainToInstance} from 'class-transformer';
import {FaPen} from '@react-icons/all-files/fa/FaPen';
import {IsCreditCardTag, IsPersonalTag, UsingStatusTag} from '^models/CreditCard/components';
import {UnderlineDropdownSelect} from '^clients/private/_components/inputs/UnderlineDropdownSelect';
import {rangeToArr} from '^utils/range';
import {padStart} from 'lodash';
import {toast} from 'react-hot-toast';
import {creditCardApi} from '^models/CreditCard/api';
import {delay} from '^components/util/delay';
import {errorNotify} from '^utils/toast-notify';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CardNumberInput} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardNewPage/CardNumberInput';
import {TeamMemberSelectColumn} from '^models/TeamMember/components/TeamMemberSelectColumn';
import {FaCaretDown} from 'react-icons/fa6';
import {AxiosResponse} from 'axios';

export const CardInformationPanel = memo(function CardInformationPanel() {
    const orgId = useRecoilValue(orgIdParamState);
    const {currentCreditCard, setCurrentCreditCard} = useCurrentCreditCard();
    const {formData, setFormValue} = useAltForm(plainToInstance(UpdateCreditCardDto, {}));
    const [expiryValues, setExpiryValues] = useState<string[]>([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (currentCreditCard && !isEditMode) {
            const cardNumbers = currentCreditCard.numbers;
            setFormValue({
                name: currentCreditCard.name,
                isPersonal: currentCreditCard.isPersonal,
                isCreditCard: currentCreditCard.isCreditCard,
                usingStatus: currentCreditCard.usingStatus,
                number1: cardNumbers.number1,
                number2: cardNumbers.number2,
                number3: cardNumbers.number3,
                number4: cardNumbers.number4,
            });

            setExpiryValues(() => {
                const year = currentCreditCard.expireYear || 0;
                const month = currentCreditCard.expireMonth || 0;
                return [`${year}`, padStart(`${month}`, 2, '0')];
            });
        }
    }, [isEditMode]);

    const handleResponse = (req: Promise<AxiosResponse<CreditCardDto, any>>) => {
        req.then((res) => {
            toast.success('저장완료');
            setCurrentCreditCard(res.data);
            setIsEditMode(false);
        })
            .catch(errorNotify)
            .finally(() => setLoading(false));
    };

    const onSubmit = async () => {
        if (!currentCreditCard) return;

        const data = plainToInstance(UnSignedCreditCardFormData, formData);

        if (!data.name) {
            toast.error('카드 별칭을 입력해주세요');
            return;
        }

        if (!data.number1 || !data.number2 || !data.number3 || !data.number4) {
            toast.error('카드 번호를 입력해주세요');
            return;
        }

        if (expiryValues.length) {
            if (expiryValues.length != 2) {
                toast.error('유효기간 입력이 완료되지 않았습니다');
                return;
            }
            if (expiryValues[0].length != 4 || expiryValues[1].length != 2) {
                toast.error('유효기간 입력이 올바르지 않습니다');
                return;
            }
            const [year, month] = expiryValues;
            data.expiry = `${month}${year.slice(2, 4)}`;
        }

        setLoading(true);
        handleResponse(creditCardApi.update(orgId, currentCreditCard.id, data.toUpdateDto()));
    };

    if (!currentCreditCard) return <></>;

    const company = currentCreditCard.company;
    const expiry = currentCreditCard.decryptSign().expiry;

    const cardCompany = formData.issuerCompany || undefined;
    const setCompany = (company?: CardAccountsStaticData) => {
        setFormValue({issuerCompany: company ? company.displayName : undefined});
    };

    const patch = (data: UpdateCreditCardDto) => {
        if (!currentCreditCard) return;
        const id = currentCreditCard.id;
        setLoading(true);
        handleResponse(creditCardApi.update(orgId, id, data));
    };

    return (
        <div>
            <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-16 font-semibold">세부정보</h3>

                    <div className="flex items-center gap-2">
                        {!isEditMode ? (
                            <button
                                onClick={() => setIsEditMode(true)}
                                className="btn btn-xs border-transparent bg-transparent text-gray-500 hover:bg-gray-100 hover:border-gray-100 hover:text-black gap-1.5"
                            >
                                <FaPen fontSize={10} />
                                <span>수정</span>
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={() => setIsEditMode(false)}
                                    className="btn btn-xs btn-link no-underline"
                                >
                                    취소
                                </button>

                                <button onClick={onSubmit} className="btn btn-xs btn-scordi">
                                    저장
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-2.5">
                    <FormControl label="이름">
                        {isEditMode ? (
                            <input
                                className={`input input-sm input-underline !bg-slate-100 w-full ${
                                    isLoading ? 'opacity-50 pointer-events-none' : ''
                                }`}
                                defaultValue={formData.name || undefined}
                                onChange={(e) => setFormValue({name: e.target.value})}
                                required
                            />
                        ) : (
                            <div className="flex items-center h-[33.5px]" title={currentCreditCard.name || undefined}>
                                <span className="w-full whitespace-nowrap overflow-hidden text-ellipsis">
                                    {currentCreditCard.name}
                                </span>
                            </div>
                        )}
                        <span />
                    </FormControl>

                    <FormControl label="구분">
                        {isEditMode ? (
                            <UnderlineDropdownSelect
                                defaultValue={formData.isPersonal ?? undefined}
                                options={[true, false]}
                                toComponent={(isPersonal: boolean) => <IsPersonalTag value={isPersonal} />}
                                onChange={(isPersonal) => setFormValue({isPersonal})}
                                className={`${isLoading ? 'opacity-50 pointer-events-none' : ''} input-sm`}
                            />
                        ) : (
                            <div className="flex items-center h-[33.5px]">
                                <IsPersonalTag value={currentCreditCard.isPersonal} />
                            </div>
                        )}
                        <span />
                    </FormControl>

                    <FormControl label="종류">
                        {isEditMode ? (
                            <UnderlineDropdownSelect
                                defaultValue={formData.isCreditCard ?? undefined}
                                options={[true, false]}
                                toComponent={(isCreditCard: boolean) => <IsCreditCardTag value={isCreditCard} />}
                                onChange={(isCreditCard) => setFormValue({isCreditCard})}
                                className={`${isLoading ? 'opacity-50 pointer-events-none' : ''} input-sm`}
                            />
                        ) : (
                            <div className="flex items-center h-[33.5px]">
                                <IsCreditCardTag value={currentCreditCard.isCreditCard} />
                            </div>
                        )}
                        <span />
                    </FormControl>

                    <FormControl label="카드번호">
                        {isEditMode ? (
                            <div className="grid grid-cols-4 gap-1.5">
                                <div>
                                    <CardNumberInput
                                        defaultValue={formData.number1}
                                        onChange={(val) => setFormValue({number1: val})}
                                        className={`${isLoading ? 'opacity-50 pointer-events-none' : ''} input-sm px-1`}
                                        readOnly={isLoading}
                                    />
                                    <span />
                                </div>
                                <div>
                                    <CardNumberInput
                                        defaultValue={formData.number2}
                                        onChange={(val) => setFormValue({number2: val})}
                                        className={`${isLoading ? 'opacity-50 pointer-events-none' : ''} input-sm px-1`}
                                        readOnly={isLoading}
                                    />
                                    <span />
                                </div>
                                <div>
                                    <CardNumberInput
                                        defaultValue={formData.number3}
                                        onChange={(val) => setFormValue({number3: val})}
                                        className={`${isLoading ? 'opacity-50 pointer-events-none' : ''} input-sm px-1`}
                                        readOnly={isLoading}
                                    />
                                    <span />
                                </div>
                                <div>
                                    <CardNumberInput
                                        maxLength={5}
                                        defaultValue={formData.number4}
                                        onChange={(val) => setFormValue({number4: val})}
                                        className={`${isLoading ? 'opacity-50 pointer-events-none' : ''} input-sm px-1`}
                                        readOnly={isLoading}
                                    />
                                    <span />
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center h-[33.5px]">
                                <span className="w-full whitespace-nowrap overflow-hidden text-ellipsis">
                                    {currentCreditCard.fullNumber}
                                </span>
                            </div>
                        )}
                        <span />
                    </FormControl>

                    <FormControl label="유효기간">
                        {isEditMode ? (
                            <div className="grid grid-cols-2 items-center gap-2">
                                <div className="flex items-center gap-1">
                                    <div>연</div>
                                    <div className="flex-auto">
                                        <UnderlineDropdownSelect
                                            defaultValue={parseInt(`${expiryValues[0] || 0}`)}
                                            options={rangeToArr(2024 - 10, 2024 + 10)}
                                            onChange={(year?: number) => {
                                                if (typeof year === 'undefined') return;
                                                setExpiryValues((arr: string[]) => {
                                                    const newArr = [...arr];
                                                    newArr[0] = `${year}`;
                                                    return newArr;
                                                });
                                            }}
                                            className={`${isLoading ? 'opacity-50 pointer-events-none' : ''} input-sm`}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-1">
                                    <div>월</div>
                                    <div className="flex-auto">
                                        <UnderlineDropdownSelect
                                            defaultValue={parseInt(`${expiryValues[1] || 0}`)}
                                            options={rangeToArr(1, 12)}
                                            onChange={(month?: number) => {
                                                if (typeof month === 'undefined') return;
                                                setExpiryValues((arr: string[]) => {
                                                    const newArr = [...arr];
                                                    newArr[1] = padStart(`${month}`, 2, '0');
                                                    return newArr;
                                                });
                                            }}
                                            className={`${isLoading ? 'opacity-50 pointer-events-none' : ''} input-sm`}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center h-[33.5px]">
                                {expiry ? (
                                    <div className="flex items-center gap-0.5">
                                        <div>{expiry.slice(0, 2)}</div>
                                        <small>/</small>
                                        <div>{expiry.slice(2, 4)}</div>
                                    </div>
                                ) : (
                                    <div className="italic text-gray-400">-</div>
                                )}
                            </div>
                        )}
                        <span />
                    </FormControl>

                    <FormControl label="사용상태">
                        {isEditMode ? (
                            <UnderlineDropdownSelect
                                defaultValue={formData.usingStatus}
                                options={[
                                    CreditCardUsingStatus.UnDef,
                                    CreditCardUsingStatus.NoUse,
                                    CreditCardUsingStatus.InUse,
                                    CreditCardUsingStatus.Expired,
                                ]}
                                toComponent={(usingStatus: CreditCardUsingStatus) => (
                                    <UsingStatusTag value={usingStatus} />
                                )}
                                onChange={(usingStatus?: CreditCardUsingStatus) => {
                                    setFormValue({usingStatus: usingStatus || CreditCardUsingStatus.UnDef});
                                }}
                                className={`${isLoading ? 'opacity-50 pointer-events-none' : ''} input-sm`}
                            />
                        ) : (
                            <div className="flex items-center h-[33.5px]">
                                <UsingStatusTag value={currentCreditCard.usingStatus} />
                            </div>
                        )}
                    </FormControl>
                </div>
            </div>

            {/*<div className="p-8 border-t border-gray-200">*/}
            {/*    <div className="flex flex-col gap-2.5">*/}
            {/*        <FormControl label="CVC"></FormControl>*/}
            {/*        <FormControl label="비밀번호"></FormControl>*/}
            {/*        <FormControl label="인터넷뱅킹 비밀번호"></FormControl>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*<div className="p-8 border-t border-gray-200">*/}
            {/*    <div className="flex flex-col gap-2.5">*/}
            {/*        <FormControl label="은행"></FormControl>*/}
            {/*        <FormControl label="출금통장"></FormControl>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className="p-8 border-t border-gray-200">
                <div className="flex flex-col gap-2.5">
                    {/*<FormControl label="팀"></FormControl>*/}

                    <FormControl label="소지자">
                        <div
                            className={`-mx-2 px-2 bg-slate-100 border-slate-300 hover:bg-slate-200 hover:border-slate-400 rounded-md transition-all cursor-pointer w-full group flex items-center justify-between ${
                                isLoading ? 'opacity-50 pointer-events-none' : ''
                            }`}
                        >
                            <TeamMemberSelectColumn
                                onChange={(member) => patch({holdingMemberId: member?.id || null})}
                                optionListBoxTitle="소지자를 변경할까요?"
                                detachableOptionBoxTitle="현재 소지자"
                                className="flex-auto"
                            />
                            <FaCaretDown fontSize={12} className="text-gray-400 hidden group-hover:inline-block" />
                        </div>
                    </FormControl>
                </div>
            </div>
        </div>
    );
});

interface FormControlProps extends WithChildren {
    label: string;
    required?: boolean;
}

export const FormControl = memo((props: FormControlProps) => {
    const {label: labelText, required = false, children} = props;

    return (
        <label className="grid grid-cols-4 gap-4">
            <div className="col-span-1 flex items-center justify-start">
                <p className="text-14 flex items-center gap-2">
                    <span className="text-gray-400 keep-all">{labelText}</span>
                    {required && <span className="text-red-500">*</span>}
                </p>
            </div>

            <div className="col-span-3">{children}</div>
        </label>
    );
});
FormControl.displayName = 'FormControl';
