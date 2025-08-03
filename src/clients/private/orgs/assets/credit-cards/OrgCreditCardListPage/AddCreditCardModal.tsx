import {orgIdParamState} from '^atoms/common';
import {CardAutoCreateModal, CardCreateMethod, CardCreateMethodModal} from '^clients/private/_modals/credit-cards';
import {OrgCreditCardNewPageRoute} from '^pages/orgs/[id]/creditCards/new';
import {Plus} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {useRouter} from 'next/router';
import {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';

interface AddCreditCardModalProps {
    reload: () => any;
}

export const AddCreditCardModal = memo((props: AddCreditCardModalProps) => {
    const {t} = useTranslation('assets');
    const {reload} = props;
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const [isCardCreateMethodModalOpen, setIsCardCreateMethodModalOpen] = useState(false);
    const [isCardAutoCreateModalOpen, setIsCardAutoCreateModalOpen] = useState(false);

    return (
        <>
            <button
                tabIndex={0}
                className="btn btn-scordi gap-2 mb-1 no-animation btn-animation"
                onClick={() => setIsCardCreateMethodModalOpen(true)}
            >
                <Plus />
                <span className="mr-1.5">{t('creditCard.list.addButton') as string}</span>
            </button>

            {/* 결제수단 등록 > 등록 방법 선택 */}
            <CardCreateMethodModal
                isOpened={isCardCreateMethodModalOpen}
                onClose={() => setIsCardCreateMethodModalOpen(false)}
                onSelect={(createMethod) => {
                    switch (createMethod) {
                        case CardCreateMethod.Auto:
                            return setIsCardAutoCreateModalOpen(true);
                        case CardCreateMethod.Manual:
                        default:
                            setIsCardAutoCreateModalOpen(false);
                            return router.push(OrgCreditCardNewPageRoute.path(orgId));
                    }
                }}
            />

            {/* 결제수단 등록 > 자동 등록 */}
            <CardAutoCreateModal
                isOpened={isCardAutoCreateModalOpen}
                onClose={() => {
                    setIsCardAutoCreateModalOpen(false);
                    reload();
                }}
                onCreate={() => {
                    setIsCardAutoCreateModalOpen(false);
                    reload();
                }}
            />
        </>
    );
});
