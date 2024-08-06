import {FC, useEffect, useState} from 'react';
import {AnimationLayout} from './ModalAnimationLayout';
import {AddService} from './page/AddService';
import {SelectPayment} from './page/SelectPayment';
import {SelectService} from './page/SelectService';

interface ServiceModalProps {
    open: boolean;
    onClose: () => void;
}

export const ServiceModal: FC<ServiceModalProps> = ({open, onClose}) => {
    const [step, setStep] = useState<number>(0);
    const [hasStep1, setHasStep1] = useState<boolean>(false);

    useEffect(() => setStep(0), [open === false]);
    useEffect(() => setHasStep1(true), [step === 1]);
    useEffect(() => setHasStep1(false), [step === 0]);

    return (
        <AnimationLayout open={open} onClose={onClose}>
            <div className="my-8 w-full max-w-sm transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
                {step === 0 && (
                    <SelectService SetPayment={() => setStep(2)} AddService={() => setStep(1)} onClose={onClose} />
                )}
                {step === 1 && <AddService GoBack={() => setStep(step - 1)} SetPayment={() => setStep(2)} />}
                {step === 2 && (
                    <SelectPayment
                        GoBack={hasStep1 ? () => setStep(step - 1) : () => setStep(step - 2)}
                        onSubmit={() => {
                            alert('고정지출이 추가되었습니다.');
                            onClose();
                        }}
                    />
                )}
            </div>
        </AnimationLayout>
    );
};
