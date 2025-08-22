import {memo} from 'react';
import {useRecoilState} from 'recoil';
import {checkedSubscriptionList} from '../atom';
import {BottomActionBar} from './BottomActionBar';

interface BottomActionProps {}

// 구독 합치기
export const BottomAction = memo((props: BottomActionProps) => {
    const [checkedItems, setCheckedItems] = useRecoilState(checkedSubscriptionList);

    if (!checkedItems.length) return <></>;

    return (
        <div className="fixed inset-x-0 bottom-5 z-40 flex justify-center pointer-events-none">
            <div className="container px-4 pointer-events-auto">
                <BottomActionBar items={checkedItems} onClear={() => setCheckedItems([])} />
            </div>
        </div>
    );
});
BottomAction.displayName = 'BottomAction';
