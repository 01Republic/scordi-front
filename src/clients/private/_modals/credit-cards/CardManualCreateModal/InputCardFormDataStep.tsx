import React, {memo} from 'react';
import {useRecoilState} from 'recoil';
import {inputTextToCardNumberInShortFormat} from '^utils/input-helper';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {createCreditCardDtoAtom} from '^v3/share/modals/NewCardModal/atom';
import {NumericTextInput} from '^clients/private/_components/inputs/NumericTextInput';
import {ChevronLeft} from 'lucide-react';
import {Spinner} from '^components/util/loading';

interface InputCardFormDataStepProps {
    cardCompany: CardAccountsStaticData;
    isLoading: boolean;
    onBack: () => any;
    onSubmit: () => any;
}

export const InputCardFormDataStep = memo((props: InputCardFormDataStepProps) => {
    const {cardCompany, onBack, onSubmit, isLoading} = props;
    const [formData, setFormData] = useRecoilState(createCreditCardDtoAtom);

    return (
        <div className="flex flex-col h-full">
            <div className="mb-4">
                <div className="mb-4">
                    <ChevronLeft className="text-gray-400 cursor-pointer" onClick={() => onBack()} />
                </div>
                <p className="font-medium text-12 text-scordi mb-1">카드 직접 추가하기</p>
                <h3 className="font-bold text-xl leading-tight">
                    {cardCompany.displayName}의 <br /> 정보를 입력해주세요.
                </h3>
            </div>

            <div className="py-4 flex flex-col gap-4 flex-1">
                <div>
                    <label>
                        <p className="text-12 text-gray-500 mb-1.5">
                            카드 이름
                            <span className="text-red-500"> *</span>
                        </p>
                        <input
                            type="text"
                            placeholder="카드 별칭을 입력해주세요"
                            className="input border-gray-200 bg-gray-100 text-16 w-full"
                            onChange={(e) => setFormData((prev) => ({...prev, name: e.target.value}))}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        <p className="text-12 text-gray-500 mb-1.5">
                            카드번호
                            <span className="text-red-500"> *</span>
                        </p>

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

            <div className="py-4 mt-auto">
                <button
                    disabled={
                        !formData.name ||
                        !formData.number1 ||
                        !formData.number2 ||
                        !formData.number3 ||
                        !formData.number4 ||
                        isLoading
                    }
                    className="btn btn-scordi btn-block disabled:border-gray-300"
                    onClick={onSubmit}
                >
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
            maxLength={maxLength}
            defaultValue={defaultValue}
            className="border-gray-200 bg-gray-100 text-16 w-full"
            onChange={(e) => {
                const val = inputTextToCardNumberInShortFormat(e);
                onChange && onChange(val);
            }}
        />
    );
};
