import {ReactNodeLike} from 'prop-types';
import React, {memo} from 'react';
import {LinkTo} from '^components/util/LinkTo';

interface OrgSettingsListSectionProps {
    title: string;
    buttonHref?: string;
    buttonOnClick?: () => any;
    items?: {title: ReactNodeLike; desc: ReactNodeLike}[];
}

export const OrgSettingsListSection = memo(function (props: OrgSettingsListSectionProps) {
    const {title, buttonHref, buttonOnClick, items = []} = props;
    return (
        <div className={'pt-4 pb-12'}>
            <div className={'flex justify-between items-center'}>
                <div className={'font-bold'}>{title}</div>
                {(buttonHref || buttonOnClick) && (
                    <LinkTo
                        className={'text-blue-500 cursor-pointer text-12 hover:underline'}
                        href={buttonHref}
                        onClick={buttonOnClick}
                    >
                        변경
                    </LinkTo>
                )}
            </div>

            <div>
                {items.map((item, i) => (
                    <div key={i} className={'grid grid-cols-5 items-center my-4 text-14'}>
                        <div className={'font-semibold text-gray-500'}>{item.title}</div>
                        <div className="col-span-4">{item.desc}</div>
                    </div>
                ))}
            </div>
        </div>
    );
});
