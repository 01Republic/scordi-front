import {memo} from 'react';
import {ListContainer} from '^v3/V3OrgConnectsPage/DatasourceListSection/Layouts/ListContainer';
import {useToast} from '^hooks/useToast';
import {CreditCard} from 'lucide-react';

export const CardsSection = memo(() => {
    const {toast} = useToast();

    return (
        <ListContainer
            title="카드"
            listCount={0}
            Icon={() => <CreditCard size={20} />}
            onClickAddButton={() => toast.info('준비중입니다.')}
        />
    );
});
