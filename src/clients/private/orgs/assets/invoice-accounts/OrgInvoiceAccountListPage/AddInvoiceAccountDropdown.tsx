import {useOrgIdParam} from '^atoms/common';
import {
    ListPageDropdown,
    ListPageDropdownButton,
    ListPageDropdownMenu,
    ListPageDropdownMenuItem,
} from '^clients/private/_layouts/_shared/ListPageMainDropdown';
import {InvoiceAccountAutoCreateModal} from '^clients/private/_modals/invoice-accounts';
import {GoogleGmailOAuthButton} from '^components/pages/UsersLogin/GoogleLoginBtn';
import {swalHTML} from '^components/util/dialog';
import {InvoiceAccountCreateInManualSwalForm} from '^models/InvoiceAccount/components';
import {useGoogleLoginForInvoiceAccountSelect} from '^models/InvoiceAccount/hook';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {Database, DatabaseBackup, LucideIcon} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {memo, useState} from 'react';
import {toast} from 'react-hot-toast';

interface AddInvoiceAccountDropdownProps {
    reload: () => any;
}

export const AddInvoiceAccountDropdown = memo((props: AddInvoiceAccountDropdownProps) => {
    const {t} = useTranslation('assets');
    const orgId = useOrgIdParam();
    const [isCreateAutoModalOpened, setCreateAutoModalOpened] = useState(false);

    const {setCode} = useGoogleLoginForInvoiceAccountSelect();
    const {reload} = props;

    return (
        <ListPageDropdown>
            <ListPageDropdownButton text={t('invoiceAccount.list.addButton') as string} />

            <ListPageDropdownMenu>
                <GoogleGmailOAuthButton
                    onCode={(code) => {
                        setCode(code);
                        setCreateAutoModalOpened(true);
                    }}
                >
                    <CreateMethodOption
                        Icon={Database}
                        title={t('invoiceAccount.modals.add.autoImport') as string}
                        desc={t('invoiceAccount.modals.add.autoImportDesc') as string}
                    />
                </GoogleGmailOAuthButton>

                <CreateMethodOption
                    Icon={DatabaseBackup}
                    title={t('invoiceAccount.modals.add.manualAdd') as string}
                    desc={t('invoiceAccount.modals.add.manualAddDesc') as string}
                    onClick={() => {
                        swalHTML(<InvoiceAccountCreateInManualSwalForm orgId={orgId} onSave={() => reload()} />);
                    }}
                />
            </ListPageDropdownMenu>

            <InvoiceAccountAutoCreateModal
                isOpened={isCreateAutoModalOpened}
                onClose={() => setCreateAutoModalOpened(false)}
                onCreate={(data: InvoiceAccountDto) => {
                    toast.success(t('invoiceAccount.messages.importSuccess', {email: data.email}) as string);
                    setCreateAutoModalOpened(false);
                    return reload();
                }}
                onRetry={() => setCreateAutoModalOpened(true)}
            />
        </ListPageDropdown>
    );
});

interface Props {
    Icon: LucideIcon;
    title: string;
    desc: string;
    onClick?: () => any;
}

const CreateMethodOption = memo((props: Props) => {
    const {Icon, title, desc, onClick} = props;

    return (
        <ListPageDropdownMenuItem plain>
            <div
                onClick={onClick}
                className="py-2 px-4 group-hover:text-scordi group-hover:bg-scordi-light-50 transition-all flex items-center gap-3 cursor-pointer"
            >
                <Icon />

                <div className="flex-auto">
                    <p className="text-13">{title}</p>
                    <p className="text-11 text-gray-400 group-hover:text-scordi-400 whitespace-nowrap">{desc}</p>
                </div>
            </div>
        </ListPageDropdownMenuItem>
    );
});
