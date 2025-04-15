import {memo} from 'react';
import {Check} from 'lucide-react';

interface AllSelectInstitutionOptionsProps {
    isAllSelected: boolean;
    onClick: () => void;
}

export const AllSelectInstitutionOptions = memo((props: AllSelectInstitutionOptionsProps) => {
    const {isAllSelected, onClick} = props;
    return (
        <button
            type="button"
            onClick={onClick}
            className="text-16 text-primaryColor-900 font-medium link link-primary no-underline"
        >
            {isAllSelected ? '전체 선택 해제' : '전체 선택'}
        </button>
    );
});
