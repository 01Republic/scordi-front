import React, {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {useRouter} from 'next/router';
import {orgIdParamState} from '^atoms/common';
import {V3OrgConnectsPageRoute} from '^pages/v3/orgs/[orgId]/connects';
import {useModal} from '^v3/share/modals';
import {newFormForGeneralInfoModalAtom} from '^v3/share/modals/NewSubscriptionModalManually/atom';
import {Loader, Pencil, Plus, Server} from 'lucide-react';

export const NewSubscriptionDropdown = memo(() => {
    const {open: newSubscriptionManuallyModalOpen} = useModal(newFormForGeneralInfoModalAtom);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);

    const onClick = () => {
        if (isLoading) return;

        setIsLoading(true);
        router.push(V3OrgConnectsPageRoute.path(orgId));
    };

    return (
        <div className="dropdown dropdown-end">
            <button className="btn btn-scordi m-1 gap-2 whitespace-nowrap flex-nowrap mt-8 md:mt-0 btn-lg md:btn-md w-full md:w-auto">
                새 구독 등록 <Plus />
            </button>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-sm">
                <li onClick={() => !isLoading && onClick()}>
                    <a className="flex">
                        {isLoading ? (
                            <Loader className="animate-spin mx-auto" size={20} />
                        ) : (
                            <>
                                <Server size={16} />
                                데이터 연결로 불러오기
                            </>
                        )}
                    </a>
                </li>
                <li onClick={newSubscriptionManuallyModalOpen}>
                    <a className="flex">
                        <Pencil size={16} />
                        그냥 직접 입력할래요
                    </a>
                </li>
            </ul>
        </div>
    );
});
