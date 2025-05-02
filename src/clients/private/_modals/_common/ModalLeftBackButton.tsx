import React, {memo} from 'react';
import {ChevronLeft} from 'lucide-react';

interface ModalLeftBackButtonProps {
    onClick: () => any;
}

export const ModalLeftBackButton = memo((props: ModalLeftBackButtonProps) => {
    const {onClick} = props;

    return (
        <ChevronLeft
            className="text-gray-400 hover:text-black cursor-pointer transition-all -ml-1"
            fontSize={16}
            onClick={onClick}
        />
    );
});
ModalLeftBackButton.displayName = 'ModalLeftBackButton';
