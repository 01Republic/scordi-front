import React, {memo, useEffect} from 'react';
import {Container} from '^v3/share/OnboardingFlow/Container';
import {CheckCircle} from '^components/react-icons/check-circle';
import {AddBillingHistoryModalBtn} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/share/AddBillingHistoryModalBtn';
import {useModal} from '^v3/share/modals';
import {
    AddBillingHistory,
    addBillingHistoryShowModal,
    AddBillingHistoryState,
} from '^v3/share/modals/BillingHistoryDetailModal/atom';
import {useBillingHistoriesV3} from '^models/BillingHistory/hook';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {memoState} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/bodies/atom';

export const FinishBody = memo(() => {
    const {close} = useModal(addBillingHistoryShowModal);
    const {reload: loadHistories} = useBillingHistoriesV3();
    const setAddBillingHistory = useSetRecoilState(AddBillingHistoryState);
    const [memo, setMemo] = useRecoilState(memoState);

    const onClick = () => {
        close();
        loadHistories();
    };

    return (
        <div className="py-28 flex flex-col">
            <Container size="sm" className="flex justify-center mb-4">
                <CheckCircle className="w-[60px]" color="#5E5FEE" />
            </Container>

            <Container size="lg" className="mb-10">
                <div className="text-center">
                    <h3 className="font-bold text-3xl mb-4">결제 내역 등록이 완료되었어요!</h3>
                    <p className="text-16 text-gray-500">
                        {/*누가 어떤 서비스를 쓰고, 언제 / 어디서 / 얼마가 사용되는지 <br /> 한 눈에 관리해요.*/}
                    </p>
                </div>
            </Container>

            <Container className="flex flex-col items-center">
                <button
                    onClick={() => setAddBillingHistory(AddBillingHistory.Memo)}
                    className="btn btn-sm text-scordi mb-3 w-fit px-3"
                >
                    {memo ? memo : '메모 남기기'}
                </button>
            </Container>

            <AddBillingHistoryModalBtn onClick={onClick} text="닫기" />
        </div>
    );
});
