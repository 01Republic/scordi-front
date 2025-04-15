import {memo} from 'react';
import {Check} from 'lucide-react';
import cn from 'classnames';
import {NextImage} from '^components/NextImage';

interface InstitutionOptionProps {
    logo: string;
    title: string;
    isSelected: boolean;
    onClick: () => void;
}

export const InstitutionOption = memo((props: InstitutionOptionProps) => {
    const {logo, title, isSelected, onClick} = props;
    return (
        <button
            type="button"
            onClick={onClick}
            className={`card card-body p-6 bg-base-100 transition box-border no-selectable shadow-xl hover:shadow-2xl ${
                isSelected ? '!border !border-scordi !bg-scordi-50' : '!border !border-white !bg-white'
            }`}
        >
            <div className="flex justify-between">
                <div className="flex flex-col gap-4">
                    <NextImage src={logo} alt={title} width={40} height={40} />
                    <p className="text-neutral-900 text-16 font-semibold">{title}</p>
                </div>
                {isSelected && <Check className="w-5 h-5 text-scordi" />}
            </div>
        </button>
    );
});
