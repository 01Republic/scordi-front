import React, {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {teamIdParamState} from '^atoms/common';
import {useInvoiceAccounts} from '^models/InvoiceAccount/hook';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {TeamInvoiceAccountDto} from '^models/TeamInvoiceAccount/type';
import {InvoiceAccountSelectItem} from '^models/InvoiceAccount/components/InvoiceAccountSelectItem';
import {SlideUpSelectModal} from '^clients/private/_modals/SlideUpSelectModal';

interface AddInvoiceModalProps {
    teamInvoiceAccount: TeamInvoiceAccountDto[];
    isOpened: boolean;
    onClose: () => any;
    onCreate?: () => any;
}

export const AddInvoiceModal = memo((props: AddInvoiceModalProps) => {
    const teamId = useRecoilValue(teamIdParamState);
    const {teamInvoiceAccount = [], isOpened, onClose, onCreate} = props;
    const {result, search, reload} = useInvoiceAccounts();
    const {items, pagination} = result;

    const selectables = items.filter(
        (item) => !teamInvoiceAccount.map((item) => item.invoiceAccount?.id).includes(item.id),
    );

    const onSave = async (selectedIds: number[]) => {
        const requests = selectedIds.map((invoiceAccountId) =>
            invoiceAccountApi.teamsApi.create(invoiceAccountId, teamId),
        );
        await Promise.allSettled(requests);
    };

    useEffect(() => {
        if (isOpened) reload();
    }, [isOpened]);

    useEffect(() => {
        search({
            relations: ['holdingMember', 'subscriptions', 'googleTokenData'],
            itemsPerPage: 0,
        });
    }, []);

    return (
        <SlideUpSelectModal
            isOpened={isOpened}
            onClose={onClose}
            onCreate={onCreate}
            items={selectables}
            getId={(item) => item.id}
            Row={({item, onClick, isSelected}) => (
                <InvoiceAccountSelectItem invoiceAccount={item} onClick={onClick} isSelected={isSelected} />
            )}
            onSubmit={onSave}
            titleCaption="이미 연결된 청구서 메일은 제외했어요."
            title="팀에 연결할 청구서 메일을 모두 선택해 주세요."
            ctaInactiveText="청구서 메일을 선택해주세요."
            ctaActiveText="%n개의 선택된 청구서 메일 연결하기"
            successMessage="선택한 청구서 메일을 연결했어요."
            emptyText="연결할 청구서 메일이 없어요"
        />
    );
});
