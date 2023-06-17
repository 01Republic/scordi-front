// import {GmailContent, GmailContentPayloadPartAttachment} from '^api/tasting.api';
// import {ProviderNames} from '^api/tasting.api/gmail/agent/detect-provider-name';
// import {getAttachment} from '^api/tasting.api/gmail/api.attachment';
// import {getPdfText} from '^api/tasting.api/util/pdf';
import {Currency, CurrencyDto} from '^types/crawler';

export const getCurrencySymbol = (currency: Currency) =>
    ({
        [Currency.USD]: '$',
        [Currency.KRW]: '₩',
    }[currency] || '$');

export type Price = {
    text: string;
    amount: number;
    currency: Currency;
    hide?: boolean;
};

export function currencyFormat(amount: number, currency: Currency) {
    switch (currency) {
        case Currency.KRW:
            return amount.toLocaleString();
        case Currency.USD:
            return amount.toFixed(2);
        default:
            return '-';
    }
}

export function changePriceCurrency(amount: number, fromCurrency: Currency, toCurrency: Currency): number {
    if (fromCurrency === toCurrency) return amount;

    const ratioPerDollar = {
        [Currency.KRW]: 1300,
        [Currency.USD]: 1,
    };

    if (fromCurrency === Currency.USD && toCurrency === Currency.KRW) {
        return amount * 1.0 * ratioPerDollar[Currency.KRW];
    } else if (fromCurrency === Currency.KRW && toCurrency === Currency.USD) {
        return (amount * 1.0) / ratioPerDollar[Currency.KRW];
    }
    return amount;
}

// export async function parseEmailPrice(
//     accessToken: string,
//     provider: ProviderNames,
//     email: GmailContent,
//     content: string[] | undefined,
//     attachments: GmailContentPayloadPartAttachment[],
// ): Promise<Price> {
//     switch (provider) {
//         case ProviderNames.Slack:
//             return parseSlackPrice(email);
//         case ProviderNames.Google:
//             return parseGooglePrice(accessToken, email, attachments);
//         case ProviderNames.Hancom:
//             return parseHancomPrice(email, content, attachments);
//         case ProviderNames.BespinGlobal:
//             return parseBespinGlobalPrice(accessToken, email, attachments);
//         case ProviderNames.Trello:
//             return parseTrelloPrice(email);
//         case ProviderNames.Balsamiq:
//             return parseBalsamiqPrice(email);
//         case ProviderNames.JetBrains:
//             return parseJetBrainsPrice(accessToken, email, attachments);
//         case ProviderNames.NHNCloud:
//             return parseNHNCloudPrice(email);
//         case ProviderNames.Github:
//             return parseGithubPrice(email, content);
//         case ProviderNames.Typeform:
//             return parseTypeformPrice(email, content);
//         case ProviderNames.AWS:
//             return parseAWSPrice(accessToken, email, attachments);
//         case ProviderNames.FacebookAds:
//             return parseFacebookAdsPrice(email);
//         default:
//             return {text: '', amount: 0.0, currency: Currency.KRW, hide: true};
//     }
// }
//
// function parseSlackPrice(email: GmailContent): Price {
//     const matched = email.snippet.match(/US\$\d+\.\d+/);
//     const text = matched ? matched[0] : '';
//     const amount = parseFloat(text.replace('US$', ''));
//     return {text, amount, currency: Currency.USD};
// }
//
// async function parseGooglePrice(
//     accessToken: string,
//     email: GmailContent,
//     attachments: GmailContentPayloadPartAttachment[],
// ): Promise<Price> {
//     const messageId = email.id;
//     if (!attachments[0]) {
//         return {text: '', amount: 0.0, currency: Currency.USD, hide: true};
//     }
//
//     const attachmentId = attachments[0].body.attachmentId; // 첨부파일 목록 중 첫 번째 파일이 인보이스 PDF 파일임.
//     const attachment = await getAttachment({accessToken, messageId, attachmentId});
//     const textContent = await getPdfText(attachment.data);
//
//     const words = textContent.split(' ');
//     let text = '';
//     words.forEach((word, i) => {
//         // 합계 라는 글자 앞에 나오는 금액이 합계 금액임.
//         // 그 중에서도 문서 전체에서 최종적으로 나오는 합계 금액이 전상품 합산 합계 금액으로 신뢰 할 수 있음.
//         if (word === '합계') text = words[i - 1];
//     });
//     const amount = parseFloat(text.replace('US$', ''));
//     if (isNaN(amount)) {
//         console.log('words', words);
//     }
//     return {text, amount, currency: Currency.USD};
// }
//
// async function parseHancomPrice(
//     email: GmailContent,
//     content: string[] | undefined,
//     attachments: GmailContentPayloadPartAttachment[],
// ): Promise<Price> {
//     const defaultPrice = {text: '', amount: 0.0, currency: Currency.KRW, hide: true};
//
//     if (!content) return defaultPrice;
//     if (!content[0].includes('요금이 정기 결제되었습니다.')) return defaultPrice;
//
//     const matched = content[0].match(/결제금액: ([\d,]+원)/);
//     const text = matched ? matched[1] : '';
//     const amount = parseFloat(text.replace(/\D/g, ''));
//     return {text, amount, currency: Currency.KRW};
// }
//
// async function parseBespinGlobalPrice(
//     accessToken: string,
//     email: GmailContent,
//     attachments: GmailContentPayloadPartAttachment[],
// ): Promise<Price> {
//     const messageId = email.id;
//     const attachmentId = attachments[0].body.attachmentId; // 첨부파일 목록 중 첫 번째 파일이 인보이스 PDF 파일임.
//     const attachment = await getAttachment({accessToken, messageId, attachmentId});
//     const textContent = await getPdfText(attachment.data);
//     const matched = textContent.match(/[\d,\.]+ KRW/g);
//     const text = matched ? matched[0] : '';
//     const amount = parseFloat(text.replace(/\D/g, ''));
//     return {text, amount, currency: Currency.KRW};
// }
//
// function parseTrelloPrice(email: GmailContent): Price {
//     const text = email.snippet.replace(/.*We have charged (.*) to your.*/, '$1');
//     const amount = parseFloat(text.replace('$', ''));
//     return {text, amount, currency: Currency.USD};
// }
//
// function parseBalsamiqPrice(email: GmailContent): Price {
//     const text = email.snippet.replace(/.*has been charged (.*)\..*/, '$1');
//     const amount = parseFloat(text.replace('USD $', ''));
//     return {text, amount, currency: Currency.USD};
// }
//
// async function parseJetBrainsPrice(
//     accessToken: string,
//     email: GmailContent,
//     attachments: GmailContentPayloadPartAttachment[],
// ): Promise<Price> {
//     const messageId = email.id;
//     const attachmentId = attachments[0].body.attachmentId; // 첨부파일 목록 중 첫 번째 파일이 인보이스 PDF 파일임.
//     const attachment = await getAttachment({accessToken, messageId, attachmentId});
//     const textContent = await getPdfText(attachment.data);
//     const matched = textContent.match(/Total:\s+([\d,\.]+ USD)/);
//     const text = matched ? matched[1] : '';
//     const amount = parseFloat(text.replace(' USD', ''));
//     return {text, amount, currency: Currency.USD};
// }
//
// function parseNHNCloudPrice(email: GmailContent): Price {
//     if (email.snippet.includes('결제할 금액은 ')) {
//         const matched = email.snippet.match(/결제할 금액은 ([\d\,]+원)\s?입니다/);
//         const text = matched ? matched[1] : '';
//         const amount = parseFloat(text.replace(/\D/g, ''));
//         return {text, amount, currency: Currency.KRW};
//     } else {
//         if (!email.snippet.startsWith('결제 완료')) {
//             return {text: '', amount: 0.0, currency: Currency.KRW, hide: true};
//         }
//         const matched = email.snippet.match(/서비스 이용 금액 ([\d\,]+원)이 결제 완료되었습니다/);
//         const text = matched ? matched[1] : '';
//         const amount = parseFloat(text.replace(/\D/g, ''));
//         return {text, amount, currency: Currency.KRW};
//     }
// }
//
// function parseGithubPrice(email: GmailContent, content: string[] | undefined): Price {
//     if (!content) {
//         return {text: '', amount: 0.0, currency: Currency.USD, hide: true};
//     }
//     const matched = content[0].match(/Total: (\$[\d,\.]+ USD)/);
//     const text = matched ? matched[1] : '';
//     const amount = parseFloat(text.replace(/(\$|USD|\s)/g, ''));
//     return {text, amount, currency: Currency.USD};
// }
//
// function parseTypeformPrice(email: GmailContent, content: string[] | undefined): Price {
//     if (!content) {
//         return {text: '', amount: 0.0, currency: Currency.USD, hide: true};
//     }
//     const matched = content[0].match(/Invoiced amount[^$]+(\$[\d,\.]+)/);
//     const text = matched ? matched[1] : '';
//     const amount = parseFloat(text.replace('$', ''));
//     return {text, amount, currency: Currency.USD};
// }
//
// async function parseAWSPrice(
//     accessToken: string,
//     email: GmailContent,
//     attachments: GmailContentPayloadPartAttachment[],
// ): Promise<Price> {
//     const messageId = email.id;
//     const attachmentId = attachments[0].body.attachmentId; // 첨부파일 목록 중 첫 번째 파일이 인보이스 PDF 파일임.
//     const attachment = await getAttachment({accessToken, messageId, attachmentId});
//     const textContent = await getPdfText(attachment.data);
//     const matched = textContent.match(/Total for this invoice .+ (KRW [\d,]+)\s+Detail/);
//     const text = matched ? matched[1] : '';
//     const amount = parseFloat(text.replace(/\D/g, ''));
//     return {text, amount, currency: Currency.KRW};
// }
//
// function parseFacebookAdsPrice(email: GmailContent): Price {
//     const text = email.snippet.replace(/.*결제 요약 청구 금액 (₩[\d,]+) .*/, '$1');
//     const amount = parseFloat(text.replace(/\D/g, ''));
//     return {text, amount, currency: Currency.KRW};
// }
