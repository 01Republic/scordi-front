import React from 'react';
import {LucideIcon} from 'lucide-react';
import {WithChildren} from '^types/global.type';
import {ChevronLeft, ChevronRight} from 'lucide-react';

interface ConnectStepMoveBtnProps {
    icon: LucideIcon;
    onClick: () => void;
    text?: string;
}

export function ConnectStepMoveBtn(props: ConnectStepMoveBtnProps) {
    const {icon: Icon, onClick, text = '', ...res} = props;

    return (
        <button
            type="button"
            className="btn btn-sm px-2 border-[#bcc2cd] bg-white gap-1 hover:bg-white"
            onClick={onClick}
            {...res}
        >
            <Icon /> {text}
        </button>
    );
}

export function ConnectMoveForwardBtn({onClick, ...res}: {onClick: () => void; text?: string}) {
    return <ConnectStepMoveBtn icon={ChevronRight} onClick={onClick} {...res} />;
}

export function ConnectMoveBackwardBtn({onClick, ...res}: {onClick: () => void; text?: string}) {
    return <ConnectStepMoveBtn icon={ChevronLeft} onClick={onClick} {...res} />;
}
