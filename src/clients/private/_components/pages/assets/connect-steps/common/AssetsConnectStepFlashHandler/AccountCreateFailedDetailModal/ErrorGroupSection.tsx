import React, {memo} from 'react';
import {CodefApiResultCode} from '^models/CodefAccount/codef-common';
import {CodefApiAccountItemDto} from '^models/CodefAccount/type/CodefApiAccountItemDto';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {CodefRequestBusinessType} from '^models/CodefAccount/type/enums';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {Company} from './Company';
import Tippy from '@tippyjs/react';

interface ErrorGroupSectionProps {
    title: string;
    errors: CodefApiAccountItemDto[];
}

export const ErrorGroupSection = memo((props: ErrorGroupSectionProps) => {
    const {title, errors} = props;

    // const title = getErrorGroupTitle(code) || errors[0].message;
    const cards = companyTypeof(errors, CodefRequestBusinessType.Card);
    const banks = companyTypeof(errors, CodefRequestBusinessType.Bank);

    return (
        <section>
            <h3 className="text-18 font-semibold mb-3">{title}</h3>

            <div className="bg-gray-50 py-2 px-2.5 rounded-md">
                {cards.length > 0 && (
                    <div className="mb-3">
                        <h4 className="text-14 font-semibold mb-2.5 flex items-center gap-1">
                            <span>카드</span>
                            <small>({cards.length})</small>
                        </h4>
                        <div className="flex items-center gap-2 flex-wrap">
                            {cards.map((error, i) => {
                                const company = getCompany(error);

                                return (
                                    <div key={i} onClick={() => console.log(error)}>
                                        <Company company={company}>
                                            <div className="flex items-center gap-1">
                                                <div>{company?.displayName}</div>

                                                {error.code === CodefApiResultCode.ORGANIZATION_OFFICE_NOT_OPENED && (
                                                    <div className="text-red-500">
                                                        ({error.extraMessage.replace(/not|\(|\)/gi, '')})
                                                    </div>
                                                )}
                                            </div>
                                        </Company>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {banks.length > 0 && (
                    <div className="mb-3">
                        <h4 className="text-14 font-semibold mb-2.5 flex items-center gap-1">
                            <span>은행</span>
                            <small>({banks.length})</small>
                        </h4>
                        <div className="flex items-center gap-2 flex-wrap">
                            {banks.map((error, i) => {
                                const company = getCompany(error);

                                return (
                                    <div key={i} onClick={() => console.log(error)}>
                                        <Company company={company}>
                                            <div className="flex items-center gap-1">
                                                <div>{company?.displayName}</div>

                                                {error.code === CodefApiResultCode.ORGANIZATION_OFFICE_NOT_OPENED && (
                                                    <div className="text-red-500">
                                                        ({error.extraMessage.replace(/not|\(|\)/gi, '')})
                                                    </div>
                                                )}
                                            </div>
                                        </Company>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
});

// CodefApiResultCode.SERVICE_NOT_FOUND, // 인증서로 로그인하는 기능이 제공되지 않는 기관
// CodefApiResultCode.UNREGISTERED_CERTIFICATE, // (기관에서 인증서가 확인되지 않음) (이 기관에 그런 인증서 없음 (like 존재하지않는 아이디))
// CodefApiResultCode.UNREGISTERED_OR_DELETED_CERTIFICATE, // (기관에서 인증서가 확인되지 않음) (이 기관에 그런 인증서 없음 (like 존재하지않는 아이디))
// CodefApiResultCode.CERTIFICATION_CREATE_FAILED, // (기관에서 인증서가 확인되지 않음)

// CodefApiResultCode.ORG_NOT_FOUND, // (기관에서 인증서가 확인되지 않음) (이 기관에 그런 인증서 없음 (like 존재하지않는 아이디))
// CodefApiResultCode.ORGANIZATION_ACTION_UNSUPPORTED, // (기관에서 인증서가 확인되지 않음) (이 기관에 그런 인증서 없음 (like 존재하지않는 아이디))
// CodefApiResultCode.CHECK_ORG_AGAIN, // (기관에서 인증서가 확인되지 않음) (이 기관에 그런 인증서 없음 (like 존재하지않는 아이디))
// CodefApiResultCode.SIGNATURE_DATA_INVALID, // (기관에서 인증서가 확인되지 않음) (이 기관에 그런 인증서 없음 (like 존재하지않는 아이디))
// CodefApiResultCode.CERTIFICATE_PROCESS_ERROR, // (기관에서 인증서가 확인되지 않음) (이 기관에 그런 인증서 없음 (like 존재하지않는 아이디))
export function getErrorGroupTitle(code: CodefApiResultCode) {
    switch (code) {
        case CodefApiResultCode.UNREGISTERED_CERTIFICATE:
        case CodefApiResultCode.UNREGISTERED_OR_DELETED_CERTIFICATE:
        case CodefApiResultCode.CERTIFICATION_CREATE_FAILED:
        case CodefApiResultCode.ORG_NOT_FOUND:
        case CodefApiResultCode.ORGANIZATION_ACTION_UNSUPPORTED:
        case CodefApiResultCode.CHECK_ORG_AGAIN:
        case CodefApiResultCode.SIGNATURE_DATA_INVALID:
        case CodefApiResultCode.CERTIFICATE_PROCESS_ERROR:
            return '여기엔 인증서가 등록되어있지 않아요.';
        case CodefApiResultCode.ORGANIZATION_OFFICE_NOT_OPENED:
            return '점검시간이에요.';
        case CodefApiResultCode.SERVICE_NOT_FOUND:
            return '기능지원이 잠시 어려워요.';
        default:
            return '기타';
    }
}

function getCompany(error: CodefApiAccountItemDto) {
    if (error.businessType === CodefRequestBusinessType.Bank) {
        return BankAccountsStaticData.findOne(error.organization);
    } else {
        return CardAccountsStaticData.findOne(error.organization);
    }
}

function companyTypeof(errors: CodefApiAccountItemDto[], businessType: CodefRequestBusinessType) {
    return errors.filter((error) => error.businessType === businessType);
}
