import React, {memo} from 'react';
import {toast} from 'react-hot-toast';
import {groupDuplicateCards} from '^models/CodefCard/type/util';
import {Paginated} from '^types/utils/paginated.dto';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';

interface CheckDuplicateButtonProps {
    isLoading: boolean;
    result: Paginated<CodefCardDto>;
}

export const CheckDuplicateButton = memo((props: CheckDuplicateButtonProps) => {
    const {isLoading, result} = props;

    const {items, pagination} = result;

    return (
        <button
            className={`btn btn-xs btn-white no-animation btn-animation ${
                isLoading || pagination.itemsPerPage !== 0 ? 'opacity-50' : ''
            }`}
            onClick={(e) => {
                if (isLoading) return toast('로딩 중입니다. 잠시후에 실행해주세요.');
                if (pagination.itemsPerPage !== 0) {
                    // return changePageSize(0);
                    return toast('페이지당 갯수를 [전체 보기] 로 설정해주세요.');
                }
                // search({where: {resCardNo: {op: 'in', val: duplicatedGroups.flat()}}});

                const button = e.currentTarget;
                const hiddenLists = document.querySelectorAll('ul > div > div > li.hidden');

                if (hiddenLists.length > 0) {
                    // 중복체크 해제
                    hiddenLists.forEach((li) => li.classList.remove('hidden'));
                    button.classList.add('btn-white');
                    button.classList.remove('btn-scordi');
                    button.innerText = '중복 체크';
                } else {
                    // 중복체크 실행
                    const cardNumbers = items.map((item) => item.resCardNo);
                    const duplicatedGroups = groupDuplicateCards(cardNumbers);
                    const allList = document.querySelectorAll('ul > div > div > li');
                    allList.forEach((li) => li.classList.add('hidden'));

                    const displayedCounter: Record<string, number> = {};
                    duplicatedGroups.flat().forEach((resCardNo) => {
                        const selector = `ul > div > div > li > div > div:nth-child(3) > div[data-res-card-no="${resCardNo}"]`;
                        const displayDivList = document.querySelectorAll(selector);
                        displayDivList.forEach((div) => {
                            div.closest('li')?.classList.remove('hidden');
                        });
                        displayedCounter[resCardNo] = (displayedCounter[resCardNo] || 0) + displayDivList.length;
                    });

                    button.classList.add('btn-scordi');
                    button.classList.remove('btn-white');
                    const displayedCount = Object.values(displayedCounter).reduce((a, b) => a + b, 0);
                    button.innerText = `중복 체크 (${displayedCount}개 확인됨)`;
                }
            }}
        >
            중복 체크
        </button>
    );
});
CheckDuplicateButton.displayName = 'CheckDuplicateButton';
