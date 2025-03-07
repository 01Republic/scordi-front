import React, {memo} from 'react';
import {AccountDto} from '^models/Account/types';
import CopyToClipboard from 'react-copy-to-clipboard';
import {useAccountEditModal} from './AccountEditModal/hook';
import {Avatar} from '^components/Avatar';
import {useToast} from '^hooks/useToast';
import {ChevronRight, Copy, Key} from 'lucide-react';

interface AccountItemProps {
    account: AccountDto;
    hideProduct?: boolean;
}

export const AccountItem = memo((props: AccountItemProps) => {
    const {account, hideProduct = false} = props;
    const accountEditModal = useAccountEditModal();
    const {toast} = useToast();

    const {product} = account;
    const decrypted = account.decryptSign();

    const copyBtnClick = (id: number) => {
        toast.info('비밀번호를 복사했어요', `account-${id}`);
    };

    if (!account || !product) return <></>;

    return (
        <li className="px-3 mb-2 relative" data-account-id={account.id} data-product-id={product.id}>
            <div onClick={() => accountEditModal.show(account)} className="btn-like gap-4 p-4 hover:bg-slate-200">
                {hideProduct ? (
                    <div className="">
                        <div className="btn btn-square">
                            <Key />
                        </div>
                    </div>
                ) : (
                    <Avatar src={product.image} draggable={false} className="w-7 ring-1 ring-offset-1" loading="lazy" />
                )}

                <div className="flex-1">
                    <p className="text-[16px] font-[500] flex items-center">
                        <span>{decrypted.email}</span>
                        <ChevronRight size={22} />
                    </p>
                    <p className="text-sm text-gray-500">
                        {hideProduct ? (
                            <span>
                                업데이트: {account.updatedAt.getMonth() + 1}월 {account.updatedAt.getDate()}일
                            </span>
                        ) : (
                            <span>{product.name()}</span>
                        )}

                        {account.memo && (
                            <>
                                <span className="mx-2">|</span>
                                <span>{account.memo}</span>
                            </>
                        )}
                    </p>
                </div>
            </div>
            <div className="px-3 absolute top-0 bottom-0 right-0 flex items-stretch">
                <div className="flex gap-2 justify-around items-center btn-like-follow">
                    <div>
                        {/*<AvatarGroup*/}
                        {/*    size={6}*/}
                        {/*    spaceSize="-15px"*/}
                        {/*    urls={permittedMembers.map((member) => member.profileImageUrl)}*/}
                        {/*    onClick={() => console.log(permittedMembers)}*/}
                        {/*/>*/}
                    </div>
                    <CopyToClipboard text={decrypted.password} onCopy={() => copyBtnClick(account.id)}>
                        <button className="btn btn-square btn-ghost">
                            <Copy className="text-[22px]" />
                        </button>
                    </CopyToClipboard>
                </div>
            </div>
        </li>
    );
});
