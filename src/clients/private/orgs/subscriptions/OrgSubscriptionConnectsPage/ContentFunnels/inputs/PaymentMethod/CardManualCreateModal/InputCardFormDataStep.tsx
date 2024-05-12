import React, {memo} from 'react';
import {useSetRecoilState} from 'recoil';
import {FaChevronLeft} from 'react-icons/fa6';
import {inputTextToCardNumberFormat} from '^utils/input-helper';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {createCreditCardDtoAtom} from '^v3/share/modals/NewCardModal/atom';

interface InputCardFormDataStepProps {
    cardCompany: CardAccountsStaticData;
    setCompany: (cardCompanyData?: CardAccountsStaticData) => any;
    onSubmit: () => any;
}

export const InputCardFormDataStep = memo((props: InputCardFormDataStepProps) => {
    const {cardCompany, setCompany, onSubmit} = props;
    const setFormData = useSetRecoilState(createCreditCardDtoAtom);

    return (
        <div className="flex flex-col items-stretch">
            <div className="mb-4">
                <div className="mb-4">
                    <FaChevronLeft className="text-gray-400 cursor-pointer" onClick={() => setCompany(undefined)} />
                </div>
                <p className="font-medium text-12 text-scordi mb-1">카드 직접 추가하기</p>
                <h3 className="font-bold text-xl leading-tight">
                    {cardCompany.displayName}의 <br /> 정보를 입력해주세요.
                </h3>
            </div>

            <div className="py-4 flex flex-col gap-4 items-stretch">
                <div>
                    <label>
                        <p className="text-12 text-gray-500 mb-1.5">카드이름</p>
                        <input
                            type="text"
                            placeholder="디자인 팀 카드"
                            className="input border-gray-200 bg-gray-100 text-16 w-full"
                            onChange={(e) => setFormData((prev) => ({...prev, name: e.target.value}))}
                        />
                    </label>
                </div>

                {/*<div>*/}
                {/*    <label>*/}
                {/*        <p className="text-12 text-gray-500 mb-1.5">카드종류</p>*/}

                {/*        <ButtonGroupRadio*/}
                {/*            onChange={console.log}*/}
                {/*            options={[*/}
                {/*                {label: '신용', value: 'Credit'},*/}
                {/*                {label: '체크', value: 'Check'},*/}
                {/*                {label: '하이브리드', value: 'Hybrid'},*/}
                {/*            ]}*/}
                {/*        />*/}
                {/*    </label>*/}
                {/*</div>*/}

                <div>
                    <label>
                        <p className="text-12 text-gray-500 mb-1.5">카드번호</p>
                        <input
                            type="text"
                            placeholder="●●●● - ●●●● - ●●●● - ●●●●"
                            className="input border-gray-200 bg-gray-100 text-16 w-full"
                            onChange={(e) => {
                                const value = inputTextToCardNumberFormat(e);
                                const numbers = value.replace(/ - /g, '');
                                const isFulfilled = numbers.length >= 16;

                                if (!isFulfilled) return;

                                setFormData((prev) => ({
                                    ...prev,
                                    number1: numbers.slice(0, 4),
                                    number2: numbers.slice(4, 8),
                                    number3: numbers.slice(8, 12),
                                    number4: numbers.slice(12, 16),
                                }));
                            }}
                        />
                    </label>
                </div>
            </div>

            <div className="py-4">
                <button className="btn btn-scordi btn-block" onClick={onSubmit}>
                    등록하기
                </button>
            </div>
        </div>
    );
});
InputCardFormDataStep.displayName = 'InputCardFormDataStep';
