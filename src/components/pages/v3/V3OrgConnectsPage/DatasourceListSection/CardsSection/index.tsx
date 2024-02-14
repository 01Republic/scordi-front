import {memo} from 'react';
import {HiOutlineCreditCard} from 'react-icons/hi2';
import {ListContainer} from '^v3/V3OrgConnectsPage/DatasourceListSection/Layouts/ListContainer';
import {useToast} from '^hooks/useToast';

export const CardsSection = memo(() => {
    const {toast} = useToast();

    return (
        <ListContainer
            title="카드"
            listCount={0}
            Icon={() => <HiOutlineCreditCard size={20} />}
            onClickAddButton={() => toast.info('준비중입니다.')}
        />
    );
});
