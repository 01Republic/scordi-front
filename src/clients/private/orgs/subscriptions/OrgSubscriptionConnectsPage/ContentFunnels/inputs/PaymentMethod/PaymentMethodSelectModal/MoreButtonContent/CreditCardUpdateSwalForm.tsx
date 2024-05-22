import React, {memo, useEffect} from 'react';
import {CreditCardDto, UnSignedCreditCardFormData, UpdateCreditCardDto} from '^models/CreditCard/type';
import {SwalForm} from '^components/util/dialog/swal-form';
import {useForm} from 'react-hook-form';
import {debounce} from 'lodash';
import {inputTextToCardNumberInShortFormat} from '^utils/input-helper';
import {plainToInstance} from 'class-transformer';
import {cardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {NumericTextInput} from '../../_common/NumericTextInput';
import {creditCardApi} from '^models/CreditCard/api';
import {errorNotify} from '^utils/toast-notify';
import {toast} from 'react-hot-toast';
import Swal from 'sweetalert2';

interface CreditCardUpdateSwalFormProps {
    creditCard: CreditCardDto;
    onSave: (creditCard: CreditCardDto) => any;
    isCodefConnected: boolean;
}

export const CreditCardUpdateSwalForm = memo((props: CreditCardUpdateSwalFormProps) => {
    const {creditCard, onSave, isCodefConnected} = props;
    const {id, organizationId: orgId, numbers} = creditCard;
    const form = useForm<UpdateCreditCardDto>();

    useEffect(() => {
        form.setValue('name', creditCard.name);
        form.setValue('issuerCompany', creditCard.issuerCompany);
        form.setValue('networkCompany', creditCard.networkCompany);
        form.setValue('memo', creditCard.memo);

        form.setValue('number1', numbers.number1);
        form.setValue('number2', numbers.number2);
        form.setValue('number3', numbers.number3);
        form.setValue('number4', numbers.number4);
    }, []);

    const onSubmit = debounce(async (data: UpdateCreditCardDto) => {
        const formData = plainToInstance(UnSignedCreditCardFormData, data);
        await creditCardApi
            .update(orgId, id, formData.toUpdateDto())
            .then((res) => {
                toast.success('변경되었습니다.');
                onSave(res.data);
                Swal.close();
            })
            .catch(errorNotify);
    }, 500);

    return (
        <SwalForm onSubmit={form.handleSubmit(onSubmit)}>
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
                            {...form.register('memo')}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        <p className="text-12 text-gray-500 mb-1.5">카드사</p>

                        <select
                            className="select font-normal border-gray-200 bg-gray-100 text-16 w-full disabled:text-gray-400 disabled:opacity-100"
                            {...form.register('issuerCompany')}
                            required={!isCodefConnected}
                            disabled={isCodefConnected}
                        >
                            {cardAccountsStaticData.map((cardCompany, i) => (
                                <option key={i} value={cardCompany.displayName}>
                                    {cardCompany.displayName}
                                </option>
                            ))}
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
                            {...form.register('name')}
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
                                    form.setValue('number1', inputTextToCardNumberInShortFormat(e));
                                }}
                                disabled={isCodefConnected}
                            />
                            <NumericTextInput
                                minLength={4}
                                maxLength={4}
                                placeholder="●●●●"
                                defaultValue={numbers.number2}
                                onChange={(e) => {
                                    form.setValue('number2', inputTextToCardNumberInShortFormat(e));
                                }}
                                disabled={isCodefConnected}
                            />
                            <NumericTextInput
                                minLength={4}
                                maxLength={4}
                                placeholder="●●●●"
                                defaultValue={numbers.number3}
                                onChange={(e) => {
                                    form.setValue('number3', inputTextToCardNumberInShortFormat(e));
                                }}
                                disabled={isCodefConnected}
                            />
                            <NumericTextInput
                                minLength={4}
                                maxLength={5}
                                placeholder="●●●●"
                                defaultValue={numbers.number4}
                                onChange={(e) => {
                                    form.setValue('number4', inputTextToCardNumberInShortFormat(e));
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
