import {memo} from 'react';
import {useRouter} from 'next/router';
import {ArrowLeft} from 'lucide-react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {OrgSubscriptionSelectPageRoute} from '^pages/orgs/[id]/subscriptions/select';

interface ActionHeaderProps {}

export const ActionHeader = memo((props: ActionHeaderProps) => {
    const {} = props;
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);

    return (
        <div className="flex w-full items-center justify-between text-16 font-normal text-neutral-600">
            <button
                className="flex gap-1 items-center cursor-pointer" //
                onClick={() => router.back()}
            >
                <ArrowLeft className="size-6 text-neutral-600" />
                뒤로가기
            </button>
            <button
                type="button"
                className="cursor-pointer"
                onClick={() => router.push(OrgSubscriptionSelectPageRoute.path(orgId))}
            >
                수동으로 등록하기
            </button>
        </div>
    );
});
