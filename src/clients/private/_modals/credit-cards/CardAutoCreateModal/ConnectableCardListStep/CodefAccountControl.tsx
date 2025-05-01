import React, {Dispatch, memo, SetStateAction} from 'react';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CodefAccountFetchCardsResult} from '^models/CodefAccount/hooks/fetchCodefCardsByAccountInSafe';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {confirm2, confirmed} from '^components/util/dialog';
import {errorToast} from '^api/api';
import {codefAccountApi} from '^models/CodefAccount/api';
import {toast} from 'react-hot-toast';

interface CodefAccountControlProps {
    cardCompany: CardAccountsStaticData;
    codefAccountFetchCardsResult: CodefAccountFetchCardsResult;
    onEditButtonClick: () => any;
    onDestroy: () => any;
}

export const CodefAccountControl = memo((props: CodefAccountControlProps) => {
    const {cardCompany, codefAccountFetchCardsResult, onEditButtonClick, onDestroy} = props;
    const {codefAccount, error} = codefAccountFetchCardsResult;
    const errorData = error?.response?.data;
    const errorCode = errorData?.data?.result?.code || '';

    return (
        <div className="flex items-center gap-4 mb-2">
            <div className="flex flex-1 items-center gap-2">
                <div>
                    <img
                        src={cardCompany.logo}
                        alt={cardCompany.displayName}
                        className="avatar w-8 h-8"
                        loading="lazy"
                    />
                </div>

                <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                        <div className="text-14 font-medium leading-none">{cardCompany.displayName}</div>
                        <div className="text-12 leading-none text-gray-400">
                            등록: {format(codefAccount.createdAt, 'yy년 MM/dd', {locale: ko})}
                        </div>
                    </div>
                    {errorData && <p className="text-12 leading-none text-red-500">{errorData.message}</p>}
                </div>
            </div>

            <div className="ml-auto flex items-center gap-2">
                <MoreDropdown offset={[0, 0]}>
                    {({hide}) => {
                        const destroy = () => {
                            const confirmDestroy = () => {
                                return confirm2(
                                    '계정을 정말 삭제할까요?',
                                    <div className="text-16">
                                        <div>이 계정과 연결된 카드 연동이 모두 해제됩니다.</div>
                                        <div className="mt-4">그래도 삭제할까요?</div>
                                    </div>,
                                );
                            };

                            const {orgId, id} = codefAccount;
                            return confirmed(confirmDestroy())
                                .then(() => codefAccountApi.destroy(orgId, id))
                                .then(() => toast.success('계정을 삭제했어요'))
                                .then(() => onDestroy())
                                .catch(errorToast);
                        };

                        return (
                            <MoreDropdown.Content>
                                <MoreDropdown.MenuItem
                                    onClick={() => {
                                        onEditButtonClick();
                                        hide();
                                    }}
                                >
                                    수정
                                </MoreDropdown.MenuItem>
                                <MoreDropdown.MenuItem
                                    onClick={() => {
                                        hide();
                                        destroy();
                                    }}
                                >
                                    삭제
                                </MoreDropdown.MenuItem>
                            </MoreDropdown.Content>
                        );
                    }}
                </MoreDropdown>
            </div>
        </div>
    );
});
CodefAccountControl.displayName = 'CodefAccountControl';
