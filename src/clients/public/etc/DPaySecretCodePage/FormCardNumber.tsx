import React, {InputHTMLAttributes, memo} from 'react';
import {FieldPath, UseFormReturn} from 'react-hook-form';
import {WithChildren} from '^types/global.type';
import {DPayRequestFormDto} from '^models/_scordi/ScordiPayment/type';
import {NumberTextInput} from './TextInput';

interface FormCardNumberProps extends WithChildren {
    form: UseFormReturn<DPayRequestFormDto, any>;
}

export const FormCardNumber = memo((props: FormCardNumberProps) => {
    const {form} = props;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, nextField: FieldPath<DPayRequestFormDto>) => {
        const value = e.target.value;
        e.target.value = value.slice(0, 4);
        if (value.length >= 4) form.setFocus(nextField);
    };

    return (
        <div className="w-full">
            <div className="flex flex-col">
                <span>카드번호</span>
                <div className="mt-2 flex gap-2">
                    <CardNumberInput
                        form={form}
                        name="cardNumberFirst"
                        onChange={(e) => {
                            handleInputChange(e, 'cardNumberSecond');
                        }}
                    />

                    <CardNumberInput
                        form={form}
                        name="cardNumberSecond"
                        onChange={(e) => {
                            handleInputChange(e, 'cardNumberThird');
                        }}
                    />

                    <CardNumberInput
                        form={form}
                        name="cardNumberThird"
                        onChange={(e) => {
                            handleInputChange(e, 'cardNumberFourth');
                        }}
                    />

                    <CardNumberInput
                        type="password"
                        form={form}
                        minLength={3}
                        name="cardNumberFourth"
                        onChange={(e) => {
                            handleInputChange(e, 'cardExpirationMonth');
                        }}
                    />
                </div>
            </div>
        </div>
    );
});

interface CardNumberInputProps {
    type?: InputHTMLAttributes<HTMLInputElement>['type'];
    form: UseFormReturn<DPayRequestFormDto>;
    name: FieldPath<DPayRequestFormDto>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
    minLength?: number;
}

const CardNumberInput = (props: CardNumberInputProps) => {
    const {type, form, name, minLength = 4, onChange} = props;

    return (
        <label>
            <NumberTextInput
                type={type || 'text'}
                {...form.register(name, {
                    required: '카드번호를 다시 확인해주세요.',
                    minLength: {
                        value: minLength,
                        message: '카드번호를 다시 확인해주세요',
                    },
                    onChange,
                })}
            />
        </label>
    );
};
