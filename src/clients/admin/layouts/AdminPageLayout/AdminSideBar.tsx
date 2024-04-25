import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {AdminUsersPageRoute} from '^pages/admin/users';
import {AdminPostsPageRoute} from '^pages/admin/posts';
import {useCurrentUser} from '^models/User/hook';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import {PiSignOut} from 'react-icons/pi';
import {AiOutlineHome} from '@react-icons/all-files/ai/AiOutlineHome';
import {AdminProductsPageRoute} from '^pages/admin/products';
import {BizOpsWorkflowListRoute} from '^pages/admin/biz-ops/manual/workflows';
import {AdminOrgsPageRoute} from '^pages/admin/orgs';
import {LinkTo} from '^components/util/LinkTo';
import {CodefParserListPageRoute} from '^pages/admin/factories/codef-parsers';

interface AdminSideBarProps extends WithChildren {}

export const AdminSideBar = memo((props: AdminSideBarProps) => {
    const {children} = props;
    const {currentUser, logout} = useCurrentUser();

    return (
        <div className="w-60 bg-base-100 text-base-content flex flex-col">
            <div className="p-4 bg-scordi text-white font-bold text-2xl text-center">scordi admin</div>
            <ul className="menu p-4">
                {/*Sidebar content here*/}
                <li>
                    <LinkTo text="조직관리" href={AdminOrgsPageRoute.path()} />
                </li>
                <li>
                    <LinkTo text="회원관리" href={AdminUsersPageRoute.path()} />
                </li>
                <li>
                    <LinkTo text="블로그 관리" href={AdminPostsPageRoute.path()} />
                </li>
                <li>
                    <LinkTo text="앱 관리" href={AdminProductsPageRoute.path()} />
                </li>
                <li>
                    <LinkTo text="BizOps Workflows" href={BizOpsWorkflowListRoute.path()} />
                </li>
                <li>
                    <LinkTo text="파서 공장" href={CodefParserListPageRoute.path()} />
                </li>
            </ul>

            <ul className="menu p-4 mt-auto gap-2">
                {currentUser ? (
                    <>
                        <li>
                            <LinkTo
                                href={V3OrgHomePageRoute.path(currentUser.lastSignedOrgId)}
                                className="btn btn-block btn-scordi-light"
                            >
                                <AiOutlineHome />
                                <span className="">서비스로</span>
                            </LinkTo>
                        </li>
                        <li>
                            <a className="btn btn-block" onClick={logout}>
                                <PiSignOut />
                                <span className="">로그아웃</span>
                            </a>
                        </li>
                    </>
                ) : (
                    <li>
                        {/* CANNOT REACH HERE / Because if not logged in, force move out to login page. */}
                        <a className="btn btn-block btn-scordi">로그인</a>
                    </li>
                )}
            </ul>
        </div>
    );
});
