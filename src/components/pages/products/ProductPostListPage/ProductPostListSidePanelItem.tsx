import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface ProductPostListSidePanelItemProps extends WithChildren {
    text: string;
    isActive: (text: string) => boolean;
    onClick: () => void;
}

export const ProductPostListSidePanelItem = memo((props: ProductPostListSidePanelItemProps) => {
    const {text, isActive, onClick, children} = props;
    const [icon, ...texts] = text.split(' ');

    return (
        <li className="w-full">
            <a className={`rounded-full font-semibold ${isActive(text) ? 'active' : ''}`} onClick={onClick}>
                <span>{icon}</span>
                <span>{texts.join(' ')}</span>
            </a>
        </li>
    );
});
