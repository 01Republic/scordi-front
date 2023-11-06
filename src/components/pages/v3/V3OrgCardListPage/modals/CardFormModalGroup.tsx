import {memo} from 'react';
import {CardNumberModal} from './CardNumberModal';
import {CardCompanyModal} from './CardCompanyModal';
import {CardNameModal} from './CardNameModal';
import {CardHoldingMember} from './CardHoldingMemberModal';
import {SelectAppModal} from './SelectAppModal';

// TODO: [to.진경님] 여러개의 모달이 그 특성상 맨날 같이 다니는게 정상인 아이들은,
//  이렇게 모달 그룹 컴포넌트로 한 번 묶어서 그룹만 가져다 쓰는 식으로 구성하면 좀 더 편리합니다 :)
export const CardFormModalGroup = memo(function CardFormModalGroup() {
    return (
        <>
            <CardNumberModal />
            <CardCompanyModal />
            <CardNameModal />
            <CardHoldingMember />
            <SelectAppModal />
        </>
    );
});
