import React, {memo} from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {FaChevronLeft} from 'react-icons/fa6';
import {inputTextToCardNumberFormat, inputTextToCardNumberInShortFormat} from '^utils/input-helper';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {createCreditCardDtoAtom} from '^v3/share/modals/NewCardModal/atom';
import {NumericTextInput} from '^clients/private/_components/inputs/NumericTextInput';

interface InputCardFormDataStepProps {
    cardCompany: CardAccountsStaticData;
    onBack: () => any;
    onSubmit: () => any;
}

export const InputCardFormDataStep = memo((props: InputCardFormDataStepProps) => {
    const {cardCompany, onBack, onSubmit} = props;
    const [formData, setFormData] = useRecoilState(createCreditCardDtoAtom);

    return (
        <div className="flex flex-col items-stretch">
            <div className="mb-4">
                <div className="mb-4">
                    <FaChevronLeft className="text-gray-400 cursor-pointer" onClick={() => onBack()} />
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

                        <div className="grid grid-cols-4 gap-3">
                            <div>
                                <CardNumberInput
                                    defaultValue={formData.number1}
                                    onChange={(val) => setFormData((f) => ({...f, number1: val}))}
                                />
                            </div>
                            <div>
                                <CardNumberInput
                                    defaultValue={formData.number2}
                                    onChange={(val) => setFormData((f) => ({...f, number2: val}))}
                                />
                            </div>
                            <div>
                                <CardNumberInput
                                    defaultValue={formData.number3}
                                    onChange={(val) => setFormData((f) => ({...f, number3: val}))}
                                />
                            </div>
                            <div>
                                <CardNumberInput
                                    maxLength={5}
                                    defaultValue={formData.number4}
                                    onChange={(val) => setFormData((f) => ({...f, number4: val}))}
                                />
                            </div>
                        </div>
                    </label>
                </div>
            </div>

            <div className="py-4">
                <button className="btn btn-scordi btn-block" onClick={onSubmit}>
                    추가하기
                </button>
            </div>
        </div>
    );
});
InputCardFormDataStep.displayName = 'InputCardFormDataStep';

interface CardNumberInputProps {
    defaultValue?: string;
    maxLength?: number;
    onChange?: (val: string) => any;
}

const CardNumberInput = (props: CardNumberInputProps) => {
    const {defaultValue, maxLength = 4, onChange} = props;
    return (
        <NumericTextInput
            minLength={4}
            maxLength={maxLength}
            placeholder="●●●●"
            defaultValue={defaultValue}
            invalidMessage="번호가 너무 짧아요"
            className="border-gray-200 bg-gray-100 text-16 w-full"
            onChange={(e) => {
                const val = inputTextToCardNumberInShortFormat(e);
                onChange && onChange(val);
            }}
        />
    );
};
