import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface ProductPostListSidePanelItemProps extends WithChildren {
    text: string;
    isActive?: boolean;
}

export const ProductPostListSidePanelItem = memo((props: ProductPostListSidePanelItemProps) => {
    const {text, isActive = false, children} = props;

    const [icon, ...texts] = text.split(' ');

    return (
        <li className="">
            <a className={`rounded-full font-semibold ${isActive ? 'active' : ''}`}>
                <span>{icon}</span>
                <span>{texts.join(' ')}</span>
            </a>
        </li>
    );
});
