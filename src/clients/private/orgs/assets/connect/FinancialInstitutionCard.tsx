import { Check } from "lucide-react";
import { memo } from 'react';

interface FinancialInstitutionCardProps {
    logo: string;
    title: string;
    isSelected: boolean;
    onClick: () => void;
}

export const FinancialInstitutionCard = memo(({
    logo,
    title,
    isSelected,
    onClick,
}: FinancialInstitutionCardProps) => {
    return (
        <div
            className={`card card-body p-6 bg-base-100 shadow-xl transition box-border no-selectable hover:shadow-2xl cursor-pointer ${isSelected ? '!border !border-scordi !bg-scordi-50' : '!border !border-white !bg-white'
                }`}
            onClick={onClick}
        >
            <div className="flex items-start justify-between">
                <img src={logo} alt="" className="avatar w-[40px] h-[40px] mb-2" />
                {isSelected && <Check className="w-5 h-5 text-scordi" />}
            </div>
            <p className="card-title text-16">{title}</p>
        </div>
    );
});

FinancialInstitutionCard.displayName = 'FinancialInstitutionCard'; 