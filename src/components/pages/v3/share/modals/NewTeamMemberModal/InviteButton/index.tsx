import React, {memo} from 'react';
import {HiLink, HiOutlineEnvelope} from 'react-icons/hi2';

export enum InviteStatus {
    Email,
    Link,
}

interface InviteButtonProps {
    onClick: () => void;
    title: string;
    desc: string;
    type: InviteStatus;
}

export const InviteButton = memo((props: InviteButtonProps) => {
    const {onClick, title, desc, type} = props;

    return (
        <button
            onClick={() => onClick()}
            className="btn btn-lg shadow-sm border border-gray-200 gap-5 bg-white justify-start"
        >
            <div className="rounded-lg p-3 bg-scordi-500 text-white">
                {type === InviteStatus.Email && <HiOutlineEnvelope size={22} />}
                {type === InviteStatus.Link && <HiLink size={22} />}
            </div>

            <div className="text-start">
                <p className="text-lg font-bold">{title}</p>
                <p className="text-sm text-gray-500">{desc}</p>
            </div>
        </button>
    );
});
