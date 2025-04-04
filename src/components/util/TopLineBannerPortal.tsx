import {createPortal} from 'react-dom';
import {WithChildren} from '^types/global.type';

export const PageFlashPortal = ({children}: WithChildren) => {
    const target = document.querySelector('#page-flash') || document.body;
    return createPortal(children, target);
};
