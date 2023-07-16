import {memo} from 'react';
import {usePost} from '^hooks/usePosts';
import {BiLink} from 'react-icons/bi';
import {toast} from 'react-toastify';
import {CopyToClipboard} from 'react-copy-to-clipboard';

export const ShareButton = memo(() => {
    const {post} = usePost();

    if (!post) return <></>;

    const showToast = () => {
        toast.info('복사되었습니다.', {
            position: 'bottom-center',
        });
    };

    return (
        <CopyToClipboard text={window.location.href} onCopy={() => showToast()}>
            <button className="btn">
                <BiLink size={18} />
                <span>공유하기</span>
            </button>
        </CopyToClipboard>
    );
});
