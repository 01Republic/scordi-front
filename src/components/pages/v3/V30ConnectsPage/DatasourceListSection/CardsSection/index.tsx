import {memo} from 'react';
import {HiOutlineCreditCard} from 'react-icons/hi2';
import {ListContainer} from '^v3/V30ConnectsPage/DatasourceListSection/Layouts/ListContainer';
import {useToast} from '^hooks/useToast';

export const CardsSection = memo(() => {
    const {toast} = useToast();

    return (
        <ListContainer
            title="Cards"
            listCount={0}
            Icon={() => <HiOutlineCreditCard size={20} />}
            onClickAddButton={() => toast.info('준비중입니다.')}
        />
    );
});
