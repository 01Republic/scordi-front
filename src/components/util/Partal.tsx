import {createPortal} from 'react-dom';
import {WithChildren} from '^types/global.type';

export const Portal = ({children}: WithChildren) => {
    return createPortal(children, document.querySelector('#dropdown-portal') || document.body);
    // return <>{children}</>;
};
