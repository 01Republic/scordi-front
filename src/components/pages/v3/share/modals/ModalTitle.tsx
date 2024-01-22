import React, {memo} from 'react';

interface ModalTitleProps {
    title: string;
    desc?: string;
}

export const ModalTitle = memo((props: ModalTitleProps) => {
    const {title, desc} = props;

    return (
        <div className="pt-5">
            {desc && <p className="mb-4">{desc}</p>}
            <h3 className="font-bold text-2xl mb-10 whitespace-pre-line">{title}</h3>
        </div>
    );
});
