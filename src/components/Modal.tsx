import {MouseEvent} from 'react';
import {WithChildren} from '^types/globalTypes';
import {DefaultButton} from '^components/Button';

export type ModalProps = {
    type: 'error' | 'success' | 'warning' | 'info';
    isOpen: boolean;
    title?: string;
    description?: string;
    buttons?: ModalActionButtonProps[];
    backdrop?: {
        onClick: (e: MouseEvent<HTMLDivElement>) => void;
    };
    children?: any;
};

export const Modal = (props: ModalProps) => {
    return (
        <>
            <div
                className={`modal modal-bottom sm:modal-middle ${
                    props.isOpen && 'modal-open'
                }`}
                onClick={(e) => {
                    const target = e.target as Element;
                    if (props.backdrop && target.classList.contains('modal')) {
                        props.backdrop.onClick(e);
                    }
                }}
            >
                <div className="modal-box">
                    {props.title && (
                        <h3 className="font-bold text-lg">{props.title}</h3>
                    )}
                    {props.description && (
                        <p className="py-4">{props.description}</p>
                    )}
                    {props.children}
                    {props.buttons && (
                        <ModalActionWrapper>
                            {props.buttons.map((button, i) => (
                                <ModalActionButton {...button} key={i} />
                            ))}
                        </ModalActionWrapper>
                    )}
                </div>
            </div>
        </>
    );
};

export function ModalActionWrapper({children}: WithChildren) {
    return <div className="modal-action">{children}</div>;
}

export interface ModalActionButtonProps extends WithChildren {
    text?: string;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
}

export function ModalActionButton({
    text,
    onClick,
    children,
    className = '',
    ...props
}: ModalActionButtonProps) {
    return (
        <DefaultButton text={text || ''} onClick={onClick} />
        // <button className={`btn ${className}`} onClick={onClick} {...props}>
        //   {text ?? children}
        // </button>
    );
}
