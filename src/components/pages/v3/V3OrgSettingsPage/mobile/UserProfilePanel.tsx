import React, {memo} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {Avatar} from '^components/Avatar';
import {currentUserAtom} from '^models/User/atom';
import {useRecoilValue} from 'recoil';
import {useToast} from '^hooks/useToast';
import {ChevronRight} from 'lucide-react';

export const UserProfilePanel = memo(() => {
    const currentUser = useRecoilValue(currentUserAtom);
    const {toast} = useToast();

    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <div
                    onClick={() => toast.info('준비중입니다.')}
                    className="flex items-center gap-6 px-3 py-2.5 -mx-3 bg-base-100 text-gray-700 cursor-pointer hover:bg-neutral"
                >
                    <Avatar
                        src={currentUser?.profileImgUrl}
                        className="w-16 h-16 outline outline-offset-1 outline-slate-100"
                    />
                    <div className="flex-1">
                        <h1 className="text-xl text-500">{currentUser?.name}</h1>
                        {/* TODO: currentUser에서 직급 가져올 수 없음 수정 예정 */}
                        <p className="text-[16px]">
                            <small className="mr-0.5"></small>
                        </p>
                    </div>
                    <ChevronRight size={28} />
                </div>
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
