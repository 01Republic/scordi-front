import {memo, useEffect} from 'react';
import {WithChildren} from '^types/global.type';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const AOSProvider = memo((props: WithChildren) => {
    const {children} = props;

    useEffect(() => {
        AOS.init({duration: 500});
    }, []);

    return <>{children}</>;
});

type AOSWrapperProps = {
    aos?: 'fade-up';
    anchorPlacement?: 'center-bottom';
} & WithChildren;

export const AOSWrapper = memo((props: AOSWrapperProps) => {
    const {aos = 'fade-up', anchorPlacement = 'center-bottom', children} = props;

    return (
        <div data-aos={aos} data-aos-anchor-placement={anchorPlacement}>
            {children}
        </div>
    );
});
