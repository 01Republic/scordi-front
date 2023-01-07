import {memo} from 'react';
import {useRouter} from 'next/router';
import {MobileSection} from '^components/v2/MobileSection';
import {WithChildren} from '^types/global.type';

type MobileTopNavProps = {
    sticky?: boolean | undefined;
} & WithChildren;

export const MobileTopNav = memo((props: MobileTopNavProps) => {
    const router = useRouter();
    const {sticky = true, children} = props;

    return (
        <>
            <span className="block">&nbsp;</span>
            <MobileSection
                data-component="MobileTopNav"
                className={`${sticky && 'sticky top-0'} bg-white h-[60px] z-10`}
            >
                <div className="mx-[-5px] h-full">
                    <div className="bs-row mx-0 h-full justify-between items-center">{children}</div>
                </div>
            </MobileSection>
        </>
    );
});

export * from './MobileTopNavRight';
