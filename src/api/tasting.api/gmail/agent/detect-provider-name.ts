import {GmailPermittedMetadata} from './get-email-metadata';
import {GmailContent} from '^api/tasting.api';

export enum ProviderNames {
    Slack = 'slack',
    Google = 'google',
    Hancom = 'hancom docs',
    BespinGlobal = 'bespin global',
    Trello = 'trello',
    Balsamiq = 'balsamiq cloud',
    JetBrains = 'JetBrains',
    NHNCloud = 'NHN Cloud',
    Github = 'Github',
    Typeform = 'Typeform',
    AWS = 'Amazon Web Service',
    FacebookAds = 'Meta for Business',
}

export function detectProviderName(email: GmailContent, metadata: GmailPermittedMetadata) {
    if (detectSlack(metadata)) return ProviderNames.Slack;
    if (detectGoogle(metadata)) return ProviderNames.Google;
    if (detectHancomDocs(metadata)) return ProviderNames.Hancom;
    if (detectBespinGlobal(metadata)) return ProviderNames.BespinGlobal;
    if (detectTrello(metadata)) return ProviderNames.Trello;
    if (detectBalsamiq(metadata)) return ProviderNames.Balsamiq;
    if (detectJetBrains(metadata)) return ProviderNames.JetBrains;
    if (detectNHNCloud(metadata)) return ProviderNames.NHNCloud;
    if (detectGithub(metadata)) return ProviderNames.Github;
    if (detectTypeform(metadata)) return ProviderNames.Typeform;
    if (detectAWS(metadata)) return ProviderNames.AWS;
    if (detectFacebookAds(metadata)) return ProviderNames.FacebookAds;

    // console.log('undetected', email, metadata);

    // false 로 응답하면 provider 가 식별되지 않음으로 간주합니다.
    // provider 가 식별되지 않으면 리스트 자체에서 제외됩니다.
    return false;
}

function detectSlack(metadata: GmailPermittedMetadata): boolean {
    return metadata.from.includes("'Slack' via Tax & Finance") || metadata.subject.includes('플랜이 갱신되었습니다');
}

function detectGoogle(metadata: GmailPermittedMetadata): boolean {
    return (
        metadata.subject.includes('인보이스가 발행되었습니다') ||
        metadata.from.includes("'Google Payments' via Tax & Finance")
    );
}

function detectHancomDocs(metadata: GmailPermittedMetadata): boolean {
    return metadata.from.includes('Hancom Docs');
}

function detectBespinGlobal(metadata: GmailPermittedMetadata): boolean {
    return metadata.from.includes('billingservice@bespinglobal.com');
}

function detectTrello(metadata: GmailPermittedMetadata): boolean {
    return metadata.from.includes('Trello') && metadata.subject.includes('Your Trello Account');
}

function detectBalsamiq(metadata: GmailPermittedMetadata): boolean {
    return metadata.subject.includes('Your subscription for Balsamiq Cloud has renewed');
}

function detectJetBrains(metadata: GmailPermittedMetadata): boolean {
    return metadata.from.startsWith('Invoice JetBrains');
}

function detectNHNCloud(metadata: GmailPermittedMetadata): boolean {
    return metadata.subject.startsWith('[NHN Cloud]') && !metadata.subject.startsWith('[NHN Cloud] [');
}

function detectGithub(metadata: GmailPermittedMetadata): boolean {
    return metadata.subject.startsWith('[GitHub] Payment Receipt for');
}

function detectTypeform(metadata: GmailPermittedMetadata): boolean {
    return metadata.from.includes('Typeform') && metadata.subject.includes('Here is your invoice');
}

function detectAWS(metadata: GmailPermittedMetadata): boolean {
    return metadata.from.includes('Amazon Web Services') && metadata.subject.includes('Invoice Available');
}

function detectFacebookAds(metadata: GmailPermittedMetadata): boolean {
    return metadata.from.includes('Meta for Business') && metadata.subject.includes('광고 영수증');
}
