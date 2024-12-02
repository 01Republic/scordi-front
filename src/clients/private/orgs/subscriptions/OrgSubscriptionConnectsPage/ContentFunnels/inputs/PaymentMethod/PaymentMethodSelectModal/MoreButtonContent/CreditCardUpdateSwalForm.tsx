import React, {memo, useEffect} from 'react';
import {CreditCardDto, UnSignedCreditCardFormData, UpdateCreditCardDto} from '^models/CreditCard/type';
import {SwalForm} from '^components/util/dialog/swal-form';
import {useForm} from 'react-hook-form';
import {debounce} from 'lodash';
import {inputTextToCardNumberInShortFormat} from '^utils/input-helper';
import {plainToInstance} from 'class-transformer';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {NumericTextInput} from '../../_common/NumericTextInput';
import {creditCardApi} from '^models/CreditCard/api';
import {errorToast} from '^api/api';
import {toast} from 'react-hot-toast';
import Swal from 'sweetalert2';
import {useAltForm} from '^hooks/useAltForm';
import {ButtonGroupRadio} from '^components/util/form-control/inputs';

interface CreditCardUpdateSwalFormProps {
    creditCard: CreditCardDto;
    onSave: (creditCard: CreditCardDto) => any;
    isCodefConnected: boolean;
}

export const CreditCardUpdateSwalForm = memo((props: CreditCardUpdateSwalFormProps) => {
    const {creditCard, onSave, isCodefConnected} = props;
    const {id, organizationId: orgId, numbers} = creditCard;
    const {formData, setFormValue, handleSubmit} = useAltForm(plainToInstance(UpdateCreditCardDto, {}));
    const form = useForm<UpdateCreditCardDto>();

    useEffect(() => {
        const cardNumbers = creditCard.numbers;
        setFormValue({
            name: creditCard.name,
            isPersonal: creditCard.isPersonal,
            isCreditCard: creditCard.isCreditCard,
            usingStatus: creditCard.usingStatus,
            memo: creditCard.memo,
            number1: cardNumbers.number1,
            number2: cardNumbers.number2,
            number3: cardNumbers.number3,
            number4: cardNumbers.number4,
        });
    }, []);

    const onSubmit = debounce(async () => {
        const data = plainToInstance(UnSignedCreditCardFormData, formData);
        await creditCardApi
            .update(orgId, id, data.toUpdateDto())
            .then((res) => {
                toast.success('변경되었습니다.');
                onSave(res.data);
                Swal.close();
            })
            .catch(errorToast);
    }, 500);

    return (
        <SwalForm onSubmit={handleSubmit(onSubmit)}>
            <section className="">
                <h4 className="text-xl sm:text-lg text-left">결제 수단 수정</h4>
            </section>

            <section className="flex flex-col gap-4 items-stretch pt-2 pb-6">
                <div>
                    <label>
                        <p className="text-12 text-gray-500 mb-1.5">별칭</p>
                        <input
                            autoFocus
                            type="text"
                            placeholder="디자인 팀 카드"
                            className="input border-gray-200 bg-gray-100 text-16 w-full"
                            defaultValue={formData.memo || undefined}
                            onChange={(e) => setFormValue({memo: e.target.value})}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        <p className="text-12 text-gray-500 mb-1.5">카드종류</p>

                        <ButtonGroupRadio
                            defaultValue={formData.isPersonal}
                            onChange={(option) => {
                                if (typeof option.value !== 'boolean') {
                                    setFormValue({isPersonal: true});
                                } else {
                                    setFormValue({isPersonal: option.value});
                                }
                            }}
                            options={[
                                {label: '개인', value: true},
                                {label: '법인', value: false},
                            ]}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        <p className="text-12 text-gray-500 mb-1.5">카드사</p>

                        <select
                            className="select font-normal border-gray-200 bg-gray-100 text-16 w-full disabled:text-gray-400 disabled:opacity-100"
                            defaultValue={formData.issuerCompany || undefined}
                            onChange={(e) => setFormValue({issuerCompany: e.target.value})}
                            required={!isCodefConnected}
                            disabled={isCodefConnected}
                        >
                            {CardAccountsStaticData.findByPersonal(formData.isPersonal ?? true).map(
                                (cardCompany, i) => (
                                    <option key={i} value={cardCompany.displayName}>
                                        {cardCompany.displayName}
                                    </option>
                                ),
                            )}
                        </select>
                    </label>
                </div>

                <div>
                    <label>
                        <p className="text-12 text-gray-500 mb-1.5">카드이름</p>
                        <input
                            type="text"
                            placeholder="KB국민 4902"
                            className="input border-gray-200 bg-gray-100 text-16 w-full disabled:text-gray-400"
                            defaultValue={formData.name || undefined}
                            onChange={(e) => setFormValue({name: e.target.value})}
                            required={!isCodefConnected}
                            disabled={isCodefConnected}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        <p className="text-12 text-gray-500 mb-1.5">카드번호</p>

                        <div className="grid grid-cols-4 gap-3">
                            <NumericTextInput
                                minLength={4}
                                maxLength={4}
                                placeholder="●●●●"
                                defaultValue={numbers.number1}
                                onChange={(e) => {
                                    setFormValue({number1: inputTextToCardNumberInShortFormat(e)});
                                }}
                                disabled={isCodefConnected}
                            />
                            <NumericTextInput
                                minLength={4}
                                maxLength={4}
                                placeholder="●●●●"
                                defaultValue={numbers.number2}
                                onChange={(e) => {
                                    setFormValue({number2: inputTextToCardNumberInShortFormat(e)});
                                }}
                                disabled={isCodefConnected}
                            />
                            <NumericTextInput
                                minLength={4}
                                maxLength={4}
                                placeholder="●●●●"
                                defaultValue={numbers.number3}
                                onChange={(e) => {
                                    setFormValue({number3: inputTextToCardNumberInShortFormat(e)});
                                }}
                                disabled={isCodefConnected}
                            />
                            <NumericTextInput
                                minLength={4}
                                maxLength={5}
                                placeholder="●●●●"
                                defaultValue={numbers.number4}
                                onChange={(e) => {
                                    setFormValue({number4: inputTextToCardNumberInShortFormat(e)});
                                }}
                                disabled={isCodefConnected}
                            />
                        </div>
                    </label>
                </div>
            </section>
        </SwalForm>
    );
});
CreditCardUpdateSwalForm.displayName = 'CreditCardUpdateSwalForm';
