import {orgIdParamState} from '^atoms/common';
import {CardAutoCreateModal} from '^clients/private/_modals/credit-cards';
import {OrgBankAccountNewPageRoute} from '^pages/orgs/[id]/bankAccounts/new';
import {Plus} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {useRouter} from 'next/router';
import {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {BankCreateMethod, BankCreateMethodModal} from './BankCreateMethodModal';

interface AddBankAccountModalProps {
    reload: () => any;
}

export const AddBankAccountModal = memo((props: AddBankAccountModalProps) => {
    const {t} = useTranslation('assets');
    const {reload} = props;
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const [isBankCreateMethodModalOpen, setIsBankCreateMethodModalOpen] = useState(false);
    const [isBankAutoCreateModalOpen, setIsBankAutoCreateModalOpen] = useState(false);

    return (
        <>
            <button
                tabIndex={0}
                className="btn btn-scordi gap-2 mb-1 no-animation btn-animation"
                onClick={() => setIsBankCreateMethodModalOpen(true)}
            >
                <Plus />
                <span className="mr-1.5">{t('bankAccount.list.addButton') as string}</span>
            </button>

            {/* 결제수단 등록 > 등록 방법 선택 */}
            <BankCreateMethodModal
                isOpened={isBankCreateMethodModalOpen}
                onClose={() => setIsBankCreateMethodModalOpen(false)}
                onSelect={(createMethod) => {
                    switch (createMethod) {
                        case BankCreateMethod.Auto:
                            return setIsBankAutoCreateModalOpen(true);
                        case BankCreateMethod.Manual:
                        default:
                            setIsBankAutoCreateModalOpen(false);
                            return router.push(OrgBankAccountNewPageRoute.path(orgId));
                    }
                }}
            />

            {/* 결제수단 등록 > 자동 등록 */}
            <CardAutoCreateModal
                isOpened={isBankAutoCreateModalOpen}
                onClose={() => {
                    setIsBankAutoCreateModalOpen(false);
                    reload();
                }}
                onCreate={() => {
                    setIsBankAutoCreateModalOpen(false);
                    reload();
                }}
            />
        </>
    );
});
