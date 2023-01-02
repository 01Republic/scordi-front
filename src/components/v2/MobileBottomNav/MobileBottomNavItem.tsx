import {useRouter} from 'next/router';
import Link from 'next/link';
import React, {memo} from 'react';
import {CircleButton} from '^components/v2/ui/buttons/CircleButton';

type MobileNavItemProps = {
    icon: any;
    href?: string;
    target?: React.HTMLAttributeAnchorTarget | undefined;
    active?: boolean;
};

export const MobileBottomNavItem = memo((props: MobileNavItemProps) => {
    const router = useRouter();

    return (
        <Link href={`${props.href}`} target={props.target}>
            <div className="bs-col flex flex-col items-center justify-center">
                <CircleButton
                    className="btn-lg bg-white border-0 active:bg-white active:border-0 hover:bg-white hover:border-0 drop-shadow-md relative"
                    style={{top: '-50%'}}
                >
                    <span>{props.icon}</span>
                </CircleButton>
            </div>
        </Link>
    );
});

const MobileBottomNavItemV2 = (props: MobileNavItemProps) => {
    const {active = false} = props;
    const router = useRouter();

    // TODO: 주소 따라서 아이콘 색상 바꿔주기

    return (
        <Link href={`${props.href}`} target={props.target}>
            <div className="bs-col flex flex-col items-center justify-center">
                <span className="pb-1">{props.icon}</span>
                {/*<p className="text-center">&nbsp;</p>*/}
            </div>
        </Link>
    );
};
