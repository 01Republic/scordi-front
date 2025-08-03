import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {ChevronRight, DatabaseBackup, LucideIcon} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';

export enum BankCreateMethod {
    // (자동) 은행 계정 연동
    Auto = 'AUTO',
    // (수동) 계좌 직접 입력
    Manual = 'MANUAL',
}

interface BankCreateMethodModalProps {
    isOpened: boolean;
    onClose: () => any;
    onSelect: (cardCreateMethod: BankCreateMethod) => any;
}

export const BankCreateMethodModal = memo((props: BankCreateMethodModalProps) => {
    const {t} = useTranslation('assets');
    const {isOpened, onClose, onSelect} = props;

    return (
        <SlideUpModal open={isOpened} onClose={onClose} size="md">
            <h3 className="font-bold text-xl">{t('bankAccount.modals.createMethod.title') as string}</h3>

            <div className="py-4 flex flex-col gap-3">
                {/* TODO: 공동인증서로 불러오기 기능 완료시 복구 */}
                {/*<BankCreateMethodOption*/}
                {/*    Icon={Database}*/}
                {/*    title="이체내역 불러오기"*/}
                {/*    desc="공동인증서로 간편하게 불러와요."*/}
                {/*    onClick={() => {*/}
                {/*        onClose();*/}
                {/*        onSelect(BankCreateMethod.Auto);*/}
                {/*    }}*/}
                {/*/>*/}
                <BankCreateMethodOption
                    Icon={DatabaseBackup}
                    title={t('bankAccount.modals.createMethod.manual') as string}
                    desc={t('bankAccount.modals.createMethod.description') as string}
                    onClick={() => {
                        onClose();
                        onSelect(BankCreateMethod.Manual);
                    }}
                />
            </div>
        </SlideUpModal>
    );
});
BankCreateMethodModal.displayName = 'BankCreateMethodModal';

interface Props {
    Icon: LucideIcon;
    title: string;
    desc: string;
    onClick: () => any;
}

export const BankCreateMethodOption = (props: Props) => {
    const {Icon, title, desc, onClick} = props;

    return (
        <div
            className="flex items-center -mx-3 px-3 py-3 rounded-box cursor-pointer group hover:bg-scordi-50 transition-all"
            onClick={onClick}
        >
            <div className="">
                <Icon size={24} />
            </div>

            <div className="flex-auto px-3">
                <p className="text-14">{title}</p>
                <p className="text-12 text-gray-400">{desc}</p>
            </div>

            <div>
                <ChevronRight className="text-gray-400 group-hover:text-black transition-all" />
            </div>
        </div>
    );
};
