import {CreditCardDto} from '^models/CreditCard/type';
import {creditCardApi} from '^models/CreditCard/api';
import {toast} from 'react-hot-toast';
import {billingHistoryApi} from '^models/BillingHistory/api';
import {codefCardApi} from '^models/CodefCard/api';
import {confirm2, runIfSwalConfirmed} from '^components/util/dialog';

function checkIsConnectedWithCodefCard(orgId: number, creditCardId: number) {
    return codefCardApi
        .index(orgId, {
            where: {creditCardId},
        })
        .then((res) => {
            return res.data.pagination.totalItemCount;
        });
}

function getBillingHistoryCountOfCreditCard(creditCardId: number) {
    return billingHistoryApi
        .index({
            where: {creditCardId},
        })
        .then((res) => {
            return res.data.pagination.totalItemCount;
        });
}

export async function destroyCreditCardHandler(creditCard: CreditCardDto, onSaved: () => any) {
    const {id, organizationId: orgId} = creditCard;
    // const endNumber = creditCard.secretInfo?.number4;
    // const cardName = company ? `${company.displayName} ${endNumber || ''}` : endNumber ? `끝자리 ${endNumber}` : '';

    const request = async () => {
        creditCardApi.destroy(orgId, id).then(() => {
            toast.success('삭제했습니다.');
            onSaved();
        });
    };

    let title = '';
    let content = '';
    title = '이 카드를 정말 삭제할까요?';
    content = '연결된 지출내역이 있다면 함께 삭제됩니다.\n그래도 삭제할까요?';
    confirm2(title, content).then(runIfSwalConfirmed(request));

    // // 연결된 결제내역이 있는 경우
    // if (billingHistoryCount) {
    //     // 자동등록
    //     if (isCodefConnected) {
    //         title = '구독 결제가 발생된 카드입니다.';
    //         content = '카드를 삭제하면 지출내역과 연결된 결제수단 정보가 모두 삭제됩니다.\n삭제 처리하시겠습니까?';
    //         confirm2(title, content).then(runIfSwalConfirmed(request));
    //     }
    //     // 수동등록
    //     else {
    //         title = '구독과 연결되어 있는 카드입니다.';
    //         content = '카드를 삭제하면 지출내역에 등록된 결제수단 정보가 모두 삭제됩니다.\n삭제 처리하시겠습니까?';
    //         confirm2(title, content).then(runIfSwalConfirmed(request));
    //     }
    // }
    //
    // // 결제내역과 연결되지 않은 카드의 경우
    // else {
    //     // 자동등록 : 스윗알럿 띄우기
    //     if (isCodefConnected) {
    //         title = `연동된 '${cardName}' 카드를 삭제하시겠습니까?`;
    //         confirm2.notionStyled(title).then(runIfSwalConfirmed(request));
    //     }
    //     // 수동등록 : 스윗알럿 띄우기
    //     else {
    //         title = `등록한 '${cardName}' 카드를 삭제하시겠습니까?`;
    //         confirm2.notionStyled(title).then(runIfSwalConfirmed(request));
    //     }
    //     // 수동등록 중 이미 등록된 레거시 결제수단 : 스윗알럿 띄우기
    //     //          - [ ]  등록한 {카드이름} 카드를 삭제하시겠습니까?
    //     //          - [ ]  취소 / 확인
    // }
}
