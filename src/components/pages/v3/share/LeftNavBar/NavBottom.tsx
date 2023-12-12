import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface NavBottomProps extends WithChildren {}

export const NavBottom = memo((props: NavBottomProps) => {
    const {children} = props;

    return (
        <section className="mt-auto pb-6">
            <ul className="px-5 font-semibold">{children}</ul>
        </section>
    );
});
NavBottom.displayName = 'NavBottom';
