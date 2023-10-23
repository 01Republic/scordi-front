import React, {memo} from 'react';
import {CardItem} from '../V3OrgHomePage/mobile/CardItem';
import {MobileSection} from '../share/sections/MobileSection';
import {useRecoilValue} from 'recoil';
import {cardListResultAtom} from '^atoms/cards.atom';

export const CardList = memo(() => {
    const cardListResult = useRecoilValue(cardListResultAtom);
    const cardList = cardListResult.items;

    return (
        <ul>
            <MobileSection.Item>
                <MobileSection.Padding>
                    {cardList.length ? (
                        <>
                            {cardList.map((item, i) => (
                                <CardItem key={i} card={item} />
                            ))}
                        </>
                    ) : (
                        <div className="w-full transition-all border-dashed border-slate-300 hover:border-slate-400 border-[2px] py-8 rounded-box cursor-pointer hover:bg-slate-50">
                            <div className="text-xs w-full text-center text-slate-500">
                                <p>아직 보관중인 카드가 없네요</p>
                                <p>카드를 안전하게 보관하고 관리해보세요</p>
                            </div>
                        </div>
                    )}
                </MobileSection.Padding>
            </MobileSection.Item>
        </ul>
    );
});
