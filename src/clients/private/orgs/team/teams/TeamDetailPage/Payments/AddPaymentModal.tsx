import React, {memo, useEffect} from 'react';
import {ModalProps} from '^components/modals/_shared/Modal.types';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {useInvoiceAccounts} from '^models/InvoiceAccount/hook';
import {orgIdParamState, teamIdParamState} from '^atoms/common';
import {useRecoilValue} from 'recoil';
import {FaCheck} from 'react-icons/fa6';
import {teamInvoiceAccountApi} from '^models/TeamInvoiceAccount/api';
import {TeamMemberDto, useTeamMember, useTeamMembersInTeamMembersTable} from '^models/TeamMember';
import {TeamMemberAvatar} from '^v3/share/TeamMemberAvatar';
import {teamMembershipApi} from '^models/TeamMembership/api';
import {useCreditCardListForListPage} from '^models/CreditCard/hook';
import {CreditCardDto} from '^models/CreditCard/type';
import {creditCardApi} from '^models/CreditCard/api';
import {teamCreditCardApi} from '^models/TeamCreditCard/api';
import {
    CreditCardProfile,
    CreditCardProfileOption,
    CreditCardProfileOption2,
} from '^models/CreditCard/hook/components/CreditCardProfile';

type AddPaymentModalProps = ModalProps;

export const AddPaymentModal = memo(function AddPaymentModal(props: AddPaymentModalProps) {
    const orgId = useRecoilValue(orgIdParamState);
    const teamId = useRecoilValue(teamIdParamState);
    const {isOpened, onClose} = props;
    const {result, search, reload} = useCreditCardListForListPage();
    const [selected, setSelected] = React.useState<CreditCardDto[]>([]);

    const onSave = () => {
        const requests = selected.map((creditCard) =>
            teamCreditCardApi.create(orgId, {teamId: teamId, creditCardId: creditCard.id}),
        );
        const req = Promise.allSettled(requests);
        req.then(() => onClose());
    };

    useEffect(() => {
        !!orgId && !!teamId && reload();
    }, [orgId, teamId]);

    return (
        <SlideUpModal open={isOpened} onClose={onClose} size="lg">
            <h3 className="font-bold text-xl">팀에 등록할 결제수단을 선택해 주세요</h3>

            <div className="py-4 space-y-1 max-h-96 overflow-y-scroll">
                {result.items.map((creditCard, i) => (
                    <div
                        tabIndex={0}
                        key={i}
                        className={`px-4 py-2.5 cursor-pointer group hover:bg-gray-100 flex items-center justify-between rounded-box btn-animation ${
                            selected.includes(creditCard) && 'bg-gray-50'
                        }`}
                        onClick={() => {
                            if (selected.includes(creditCard)) {
                                setSelected(selected.filter((item) => item !== creditCard));
                            } else {
                                setSelected([...selected, creditCard]);
                            }
                        }}
                    >
                        <div className={'flex gap-3 items-center'}>
                            <CreditCardProfileOption2 item={creditCard} />
                        </div>
                        <div>{selected.includes(creditCard) && <FaCheck className="text-scordi" />}</div>
                    </div>
                ))}
            </div>

            <div className="flex justify-end gap-3">
                <button type="button" className="btn btn-link !no-underline text-scordi-500" onClick={onClose}>
                    취소
                </button>
                <button className="btn btn-scordi-500" onClick={onSave}>
                    저장하기
                </button>
            </div>
        </SlideUpModal>
    );
});
