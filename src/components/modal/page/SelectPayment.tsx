import React from 'react';
import {Icon} from '../../../components/Icon';
import {Label} from '../../../components/Label';
import {Radio} from '../../../components/Radio';
import {RadioGroup} from '../../../components/RadioGroup';
import {Select} from '../../../components/Select';

interface SelectPayment {
    GoBack: () => void;
    onSubmit: () => void;
}

export const SelectPayment: React.FC<SelectPayment> = ({GoBack, onSubmit}) => {
    return (
        <div className="space-y-4">
            <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                    <Icon.ArrowLeft onClick={GoBack} className="cursor-pointer" />
                    <h3 className="text-xl font-semibold">결제 형태</h3>
                </div>
                <p className="text-sm text-gray-600">결제 형태를 선택해주세요.</p>
            </div>

            <div className="space-y-3 overflow-y-auto pb-4">
                <div>
                    <Label text="결제 형태" className="py-1 font-semibold" />
                    <RadioGroup>
                        <Radio label="월 결제" />
                        <Radio label="연 결제" />
                    </RadioGroup>
                </div>

                <div>
                    <Label text="결제 금액" className="py-1 font-semibold" />
                    <RadioGroup>
                        <Radio label="매월 다름 (종량제)" />
                        <Radio label="매월 같음 (정액제)" />
                    </RadioGroup>
                </div>
                <Select label="언제 결제하나요?" defaultValue={1}>
                    <option hidden value={1}>
                        선택
                    </option>
                    <option value={2}>선택1</option>
                    <option value={3}>선택2</option>
                </Select>
                <button className="btn btn-primary w-full" onClick={onSubmit}>
                    등록완료
                </button>
            </div>
        </div>
    );
};
