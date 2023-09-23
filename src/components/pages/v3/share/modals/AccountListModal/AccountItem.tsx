import React, {memo} from 'react';
import {BiChevronRight, BiCopy} from 'react-icons/bi';
import {BsChevronRight} from 'react-icons/bs';
import {FaKey, FaRegCopy} from 'react-icons/fa6';
import {AccountDto} from '^types/account.type';
import {yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {dayjs} from '^utils/dayjs';
import {Avatar} from '^components/Avatar';
import {AvatarGroup} from '^v3/share/AvatarGroup';

interface AccountItemProps {
    account: AccountDto;
}

export const AccountItem = memo((props: AccountItemProps) => {
    const {account} = props;
    const {product, permittedMembers = []} = account;

    const decrypted = account.decryptSign();

    const copyBtnClick = () => {
        console.log(decrypted);
    };

    return (
        <li className="px-2 mb-2 relative" data-id={account.id}>
            <div onClick={() => console.log(account, decrypted)} className="btn-like gap-4 p-4 hover:bg-slate-200">
                <div className="hidden sm:block">
                    <div className="btn btn-square">
                        <FaKey />
                    </div>
                </div>
                <div className="flex-1">
                    <p className="text-[16px] font-[500] flex items-center">
                        <span>{decrypted.email}</span>
                        <BiChevronRight size={22} />
                    </p>
                    <p className="text-sm text-gray-500">
                        <span>
                            업데이트: {account.updatedAt.getMonth() + 1}월 {account.updatedAt.getDate()}일
                        </span>
                        {account.memo && (
                            <>
                                <span className="mx-2">|</span>
                                <span>{account.memo}</span>
                            </>
                        )}
                    </p>
                </div>
            </div>
            <div className="px-2 absolute top-0 bottom-0 right-0 flex items-stretch">
                <div className="flex gap-2 justify-around items-center btn-like-follow">
                    <div>
                        {/*<AvatarGroup*/}
                        {/*    size={6}*/}
                        {/*    spaceSize="-15px"*/}
                        {/*    urls={permittedMembers.map((member) => member.profileImageUrl)}*/}
                        {/*    onClick={() => console.log(permittedMembers)}*/}
                        {/*/>*/}
                    </div>

                    <button className="btn btn-square btn-ghost" onClick={copyBtnClick}>
                        <BiCopy className="text-[22px]" />
                    </button>
                </div>
            </div>
        </li>
    );
});
