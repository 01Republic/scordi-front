import React, {memo, useState} from 'react';
import {IconType} from '@react-icons/all-files';
import {FcDataBackup, FcDataRecovery} from 'react-icons/fc';
import {toast} from 'react-hot-toast';
import {useOrgIdParam} from '^atoms/common';
import {
    ListPageDropdown,
    ListPageDropdownButton,
    ListPageDropdownMenu,
    ListPageDropdownMenuItem,
} from '^clients/private/_layouts/_shared/ListPageMainDropdown';
import {swalHTML} from '^components/util/dialog';
import {GoogleGmailOAuthButton} from '^components/pages/UsersLogin/GoogleLoginBtn';
import {useGoogleLoginForInvoiceAccountSelect} from '^models/InvoiceAccount/hook';
import {InvoiceAccountCreateInManualSwalForm} from '^models/InvoiceAccount/components';
import {InvoiceAccountAutoCreateModal} from '^clients/private/_modals/invoice-accounts';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';

interface AddInvoiceAccountDropdownProps {
    reload: () => any;
}

export const AddInvoiceAccountDropdown = memo((props: AddInvoiceAccountDropdownProps) => {
    const orgId = useOrgIdParam();
    const [isCreateAutoModalOpened, setCreateAutoModalOpened] = useState(false);

    const {setCode} = useGoogleLoginForInvoiceAccountSelect();
    const {reload} = props;

    return (
        <ListPageDropdown>
            <ListPageDropdownButton text="청구서 메일 추가" />

            <ListPageDropdownMenu>
                <GoogleGmailOAuthButton
                    onCode={(code) => {
                        setCode(code);
                        setCreateAutoModalOpened(true);
                    }}
                >
                    <CreateMethodOption
                        Icon={FcDataBackup}
                        title="청구서 메일 불러오기"
                        desc="구글 로그인으로 한 번에 불러와요"
                    />
                </GoogleGmailOAuthButton>

                <CreateMethodOption
                    Icon={FcDataRecovery}
                    title="직접 추가하기"
                    desc="이메일 주소를 입력한 뒤 추가해요"
                    onClick={() => {
                        swalHTML(<InvoiceAccountCreateInManualSwalForm orgId={orgId} onSave={() => reload()} />);
                    }}
                />
            </ListPageDropdownMenu>

            <InvoiceAccountAutoCreateModal
                isOpened={isCreateAutoModalOpened}
                onClose={() => setCreateAutoModalOpened(false)}
                onCreate={(data: InvoiceAccountDto) => {
                    toast.success(`${data.email} \n메일로 청구서를 불러왔어요.`);
                    setCreateAutoModalOpened(false);
                    return reload();
                }}
                onRetry={() => setCreateAutoModalOpened(true)}
            />
        </ListPageDropdown>
    );
});

interface Props {
    Icon: IconType;
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
                <div>
                    <Icon fontSize={20} />
                </div>

                <div className="flex-auto">
                    <p className="text-13">{title}</p>
                    <p className="text-11 text-gray-400 group-hover:text-scordi-400 whitespace-nowrap">{desc}</p>
                </div>
            </div>
        </ListPageDropdownMenuItem>
    );
});
