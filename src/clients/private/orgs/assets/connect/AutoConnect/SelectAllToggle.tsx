import { Check } from "lucide-react";

export const SelectAllToggle = ({
    isAllSelected,
    onClick,
    label
}: {
    isAllSelected: boolean;
    onClick: () => void;
    label: string
}) => (
    <button
        onClick={onClick}
        className="text-16 text-gray-500 flex items-center gap-2 hover:text-scordi"
    >
        <div className={`w-5 h-5 rounded-full border-2 ${isAllSelected ? 'border-scordi bg-scordi' : 'border-gray-200'
            } flex items-center justify-center`}>
            {isAllSelected && <Check className="w-3 h-3 text-white" />}
        </div>
        {label}
    </button>
); 