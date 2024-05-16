import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {CreateInvoiceAccountRequestDto2} from '^models/InvoiceAccount/type';
import {userSocialGoogleApi} from '^api/social-google.api';

export async function useInvoiceAccountCreate() {
    //
}
//
// async function createInvoiceAccount(orgId: number, dto: CreateInvoiceAccountRequestDto2) {
//     invoiceAccountApi.createV2(orgId, dto);
// }

async function getTokenDataByCode(code: string, feature?: 'login' | 'gmail' | 'admin') {
    const {accessToken} = await userSocialGoogleApi.token({code, ...(feature ? {feature} : {})});
}
