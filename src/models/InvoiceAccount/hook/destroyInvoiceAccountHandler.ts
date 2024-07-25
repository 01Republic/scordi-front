import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {toast} from 'react-hot-toast';
import {confirm2, runIfSwalConfirmed} from '^components/util/dialog';

export function destroyInvoiceAccountHandler(invoiceAccount: InvoiceAccountDto, onSaved: () => any) {
    const {id, email, organizationId: orgId, subscriptions} = invoiceAccount;

    const destroy = () => {
        invoiceAccountApi.destroyV3(orgId, id).then(() => {
            toast.success('삭제했습니다.');
            onSaved();
        });
    };

    let title = '';
    let content = '';

    // validation
    if (!subscriptions) {
        console.warn('invoiceAccount 에 subscriptions 가 relations 되어 있어야 합니다.');
        return;
    }

    // 연결된 결제내역이 있는 경우
    if (subscriptions.length > 0) {
        // 자동등록
        if (!invoiceAccount.isManuallyCreated) {
            // 구독 청구서를 받았던 메일주소입니다.
            // 계정을 삭제하면 지출내역과 연결된 청구서 수신 계정 정보가 모두 삭제됩니다.
            // 정말로 삭제할까요?
            title = '구독 청구서를 받았던 메일주소입니다.';
            content = '계정을 삭제하면 지출내역과 연결된 청구서 수신 계정 정보가 모두 삭제됩니다.\n정말로 삭제할까요?';
            confirm2(title, content).then(runIfSwalConfirmed(destroy));
        }

        // 수동등록
        else {
            // 구독에 등록된 메일주소입니다.
            // 계정을 삭제하면 지출내역과 연결된 청구서 수신 계정 정보가 모두 삭제됩니다.
            // 정말로 삭제할까요?
            title = '구독에 등록된 메일주소입니다.';
            content = '계정을 삭제하면 지출내역과 연결된 청구서 수신 계정 정보가 모두 삭제됩니다.\n정말로 삭제할까요?';
            confirm2(title, content).then(runIfSwalConfirmed(destroy));
        }
    }

    // 결제내역과 연결되지 않은 청구메일의 경우
    else {
        // 자동등록
        if (!invoiceAccount.isManuallyCreated) {
            // 연동된 {이름} 메일을 삭제하시겠습니까?
            const name = invoiceAccount.googleTokenData?.name || email;
            confirm2.notionStyled(`연동된 ${name} 메일을 삭제할까요?`).then(runIfSwalConfirmed(destroy));
        }

        // 수동등록
        else {
            // 등록한 {이메일계정} 계정을 삭제하시겠습니까?
            confirm2.notionStyled(`등록한 ${email} 계정을 삭제할까요?`).then(runIfSwalConfirmed(destroy));
        }
    }
}
