import { Check } from "lucide-react";
import { memo } from 'react';

interface BankOrCardForSubscriptionProps {
    logo: string;
    title: string;
    isSelected: boolean;
    onClick: () => void;
}

export const BankOrCardForSubscription = memo((props: BankOrCardForSubscriptionProps) => {
    const { logo, title, isSelected, onClick } = props;

    return (
        <div
            className={`card card-body p-4 bg-base-100 transition box-border no-selectable hover:shadow-lg cursor-pointer ${isSelected ? '!border !border-scordi !bg-scordi-50' : '!border !border-white !bg-white'}`}
            onClick={onClick}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="" className="avatar w-[40px] h-[40px]" />
                    <p className="card-title text-16">{title}</p>
                </div>
                {isSelected && <Check className="w-5 h-5 text-scordi" />}
            </div>
        </div>
    );
});

BankOrCardForSubscription.displayName = 'BankOrCardForSubscription';
