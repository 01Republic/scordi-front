import {memo} from 'react';
import {usePost} from '^models/Post/hook';
import {toast} from 'react-toastify';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {isPageLoadedAtom} from '^pages/posts/[id]';
import {useRecoilValue} from 'recoil';
import {Link} from 'lucide-react';

export const ShareButton = memo(() => {
    const {post} = usePost();
    const isLoaded = useRecoilValue(isPageLoadedAtom);

    if (!post) return <></>;
    if (!isLoaded) return <></>;

    const showToast = () => {
        toast.info('복사되었습니다.', {
            position: 'bottom-center',
        });
    };

    return (
        <CopyToClipboard text={window ? window.location.href : ''} onCopy={() => showToast()}>
            <button className="btn">
                <Link size={18} />
                <span>공유하기</span>
            </button>
        </CopyToClipboard>
    );
});
