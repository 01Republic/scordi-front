import {MouseEventHandler, ReactNode} from 'react';
import {MobileSection} from '^components/v2/MobileSection';
import {WithChildren} from '^types/global.type';
import {genericMemo} from '^utils/genericMemo';
import {MobileEntityListItem} from '^components/v2/MobileEntityListSection/MobileEntityListItem';

type MobileEntityListSectionProps<T extends object> = {
    listOfData: T[];
    padding?: boolean;
    preloader?: boolean | JSX.Element;
    itemCustomRender?: ((item: T, index?: number) => ReactNode) | undefined;
    // itemCustomRender 를 사용하지 않고 기본 아이템 랜더링을 사용할때에만 동작합니다.
    itemOnClick?: ((item: T, index?: number) => any) | undefined;
    itemChild?: ((item: T, index?: number) => ReactNode) | undefined;
} & WithChildren;

export const MobileEntityListSection = genericMemo(<T extends object>(props: MobileEntityListSectionProps<T>) => {
    const {listOfData, padding = true, preloader} = props;
    const {itemCustomRender, itemOnClick = console.log, itemChild = JSON.stringify} = props;

    const classNames: string[] = [];
    if (padding) classNames.push('py-5');

    return (
        <MobileSection className={classNames.join(' ')}>
            {preloader && preloader}

            <div className="bs-row">
                {listOfData.map((data, i) => {
                    if (itemCustomRender) {
                        return itemCustomRender(data, i);
                    } else {
                        return (
                            <MobileEntityListItem onClick={() => itemOnClick(data, i)} key={i}>
                                {itemChild(data)}
                            </MobileEntityListItem>
                        );
                    }
                })}
            </div>
        </MobileSection>
    );
});
