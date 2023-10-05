import React, {memo} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {useRouter} from 'next/router';
import {Icon} from '^components/Icon';
import {MobileInfoListItem} from '../../share/MobileInfoList/Item';
import {MobileInfoList} from '../../share/MobileInfoList';

interface infoListProps {
    title: string;
    infoList: {index: number; title: string; pathName?: string; content?: string}[];
}

export const SettingInfoPanel = memo((props: infoListProps) => {
    const router = useRouter();
    const {title, infoList} = props;

    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <h1 className="text-lg">{title}</h1>

                <MobileInfoList>
                    {infoList.map((item) => {
                        const {index, title, pathName, content} = item;
                        return (
                            <MobileInfoListItem
                                label={title}
                                key={index}
                                clickEvent={() => router.push(pathName ? pathName : '')}
                            >
                                {content ? content : <Icon.ChevronRight />}
                            </MobileInfoListItem>
                        );
                    })}
                </MobileInfoList>
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
