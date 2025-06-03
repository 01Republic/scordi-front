import {memo} from 'react';
import {useSetRecoilState} from 'recoil';
import {Plus} from 'lucide-react';
import {BaseLayout} from '^clients/private/_layouts/BaseLayout';
import {useMembershipInHeader2} from '^models/Membership/hook';
import {useCurrentUser} from '^models/User/hook';
import {OrgItem} from '^clients/private/orgs/OrgListPage/OrgItem';
import {OrgCreatePageRoute} from '^pages/orgs/new';
import {LinkTo} from '^components/util/LinkTo';
import {BaseNav} from '^clients/private/_layouts/BaseLayout/BaseNav';
import {useKeyPressIn} from '^hooks/useEventListener';
import {orgListAltModeAtom} from './atom';

export const OrgListPage = memo(function OrgListPage() {
    const setAltMode = useSetRecoilState(orgListAltModeAtom);
    const {currentUser} = useCurrentUser();
    const {data, search, isSuccess} = useMembershipInHeader2(currentUser?.id, {
        relations: ['organization'],
        where: {userId: currentUser?.id},
        includeAdmin: true,
        itemsPerPage: 0,
        order: {id: 'DESC'},
    });

    const {items, pagination} = data;

    useKeyPressIn({
        deps: [currentUser?.id, isSuccess],
        activated: (evt) => evt.ctrlKey && evt.shiftKey && evt.altKey,
        listener: [() => setAltMode(true), () => setAltMode(false)],
        enable: !!currentUser?.id && isSuccess,
    });

    return (
        <BaseLayout workspace={false}>
            <BaseNav />
            <main className="w-full h-screen bg-gray-50 flex items-center justify-center">
                <div className="px-4 w-full max-h-[80vh] overflow-scroll no-scrollbar">
                    <div className="w-full max-w-lg mx-auto sticky top-0 z-10 py-8 mb-4 bg-gray-50">
                        <h1 className="text-2xl text-center">내 워크스페이스 목록</h1>
                    </div>

                    <div className="w-full max-w-lg mx-auto flex flex-col gap-3">
                        {items.map((membership) => (
                            <OrgItem
                                key={membership.id}
                                membership={membership}
                                isLastVisited={membership.organizationId === currentUser?.lastSignedOrgId}
                            />
                        ))}
                    </div>

                    <div className="w-full max-w-lg mx-auto sticky bottom-0 z-10 py-2 bg-gray-50">
                        <LinkTo
                            href={OrgCreatePageRoute.path()}
                            className={`btn btn-lg btn-block btn-ghost hover:bg-scordi-light-100 hover:text-scordi flex items-center justify-start gap-2 capitalize text-16 font-medium no-underline no-animation`}
                            displayLoading={false}
                        >
                            <Plus />
                            <span>새 워크스페이스 만들기</span>
                        </LinkTo>
                    </div>
                </div>
            </main>
        </BaseLayout>
    );
});
