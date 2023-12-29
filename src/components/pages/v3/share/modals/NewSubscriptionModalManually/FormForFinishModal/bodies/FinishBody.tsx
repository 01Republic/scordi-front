import React, {memo} from 'react';
import {Container} from '^v3/share/OnboardingFlow/Container';
import {CheckCircle} from '^components/react-icons/check-circle';
import {AddBillingHistoryModalBtn} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/share/AddBillingHistoryModalBtn';
import {useAddSubscriptionModals} from '^v3/share/modals/NewSubscriptionModalManually/hook';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {FinishStatus, FinishStatusAtom, memoAtom} from '^v3/share/modals/NewSubscriptionModalManually/atom';

export const FinishBody = memo(() => {
    const {closeModals} = useAddSubscriptionModals();
    const memo = useRecoilValue(memoAtom);
    const setFinishStatus = useSetRecoilState(FinishStatusAtom);

    const onClick = () => {
        closeModals();
    };

    return (
        <div className="py-28 flex flex-col">
            <Container size="sm" className="flex justify-center mb-4">
                <CheckCircle className="w-[60px]" color="#5E5FEE" />
            </Container>

            <Container size="lg" className="mb-10">
                <div className="text-center">
                    <h3 className="font-bold text-3xl mb-4">결제 내역 등록이 완료되었어요!</h3>
                </div>
            </Container>

            <Container className="flex flex-col items-center">
                <button
                    onClick={() => setFinishStatus(FinishStatus.Memo)}
                    className="btn btn-sm text-scordi mb-3 w-fit px-3"
                >
                    {memo ? memo : '메모 남기기'}
                </button>
            </Container>

            <AddBillingHistoryModalBtn onClick={onClick} text="닫기" />

            <div
                data-component="ModalLikeBottomBar"
                className={`fixed bottom-0 left-0 w-full flex justify-evenly gap-3 px-5 py-5 `}
            >
                <button
                    className="btn btn-lg btn-block btn-scordi font-medium font-white text-xl bg-slate-50"
                    onClick={onClick}
                >
                    닫기
                </button>
            </div>
        </div>
    );
});
