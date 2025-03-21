import {memo, useEffect} from 'react';
import {atom, useRecoilState, useSetRecoilState} from 'recoil';
import {useRouter} from 'next/router';
import {WithChildren} from '^types/global.type';
import {useCurrentUser} from '^models/User/hook';
import {Spinner} from '^components/util/loading';
import {AdminSideBar} from './AdminSideBar';
import 'tippy.js/dist/tippy.css';
import {Menu} from 'lucide-react';

interface AdminPageLayoutProps extends WithChildren {}

const adminSignedInState = atom<false | string>({
    key: 'adminSignedInState',
    default: false,
});

export const AdminPageLayout = memo((props: AdminPageLayoutProps) => {
    const {children} = props;
    const router = useRouter();
    const {currentUser} = useCurrentUser();
    const [signedAdminKey, setSignedAdminKey] = useRecoilState(adminSignedInState);

    const login = () => {
        const text = localStorage.getItem('signedAdmin') || prompt(`관리자 비밀번호를 입력해주세요.\n힌트: ㅎㅅㅇㄷ`);
        if (text && text === 'we can do it') {
            localStorage.setItem('signedAdmin', text);
            setSignedAdminKey(text);
        } else {
            alert('비밀번호가 맞지 않습니다.');
            login();
        }
    };

    useEffect(() => {
        if (!router.isReady) return;
        if (currentUser && !signedAdminKey) login();
    }, [router.isReady, currentUser, signedAdminKey]);

    if (!currentUser) {
        return (
            <div className="fixed flex items-center justify-center" style={{width: '100vw', height: '100vh'}}>
                <div>
                    <div className="mb-4">
                        <Spinner size={30} />
                    </div>
                    <p>로그인을 확인하고 있습니다.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/*Page content here*/}
                <label
                    htmlFor="my-drawer-2"
                    className="btn btn-sm btn-ghost absolute z-20 top-[10px] left-[4px] drawer-button lg:hidden"
                >
                    <Menu />
                </label>

                <div id="page-content" className="w-full block pb-40">
                    {children}
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <AdminSideBar />
            </div>
        </div>
    );
});
