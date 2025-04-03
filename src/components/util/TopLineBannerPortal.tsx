import {createPortal} from 'react-dom';
import {WithChildren} from '^types/global.type';

interface TopLineBannerPortalProps extends WithChildren {
    container: Element | null;
}

export const TopLineBannerPortal = (props: TopLineBannerPortalProps) => {
    const {container, children} = props;
    const target = container || document.body;
    return createPortal(children, target);
};
