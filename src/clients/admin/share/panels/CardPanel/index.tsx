import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface CardPanelProps extends WithChildren {
    title?: string;
    className?: string;
}

export const CardPanel = memo((props: CardPanelProps) => {
    const {title, className = '', children} = props;

    return (
        <div className={`card bg-white shadow ${className}`}>
            {title && (
                <div className="py-4 px-6 bg-gray-200 rounded-tl-box rounded-tr-box">
                    <h2 className="card-title">{title}</h2>
                </div>
            )}
            {children}
        </div>
    );
});
