import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {isPageLoadedAtom} from '^pages/posts/[id]';
import {toast} from 'react-toastify';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {BiLink} from 'react-icons/bi';
import {ProductDto} from '^types/product.type';

export const ShareButton = memo((props: {product: ProductDto}) => {
    const {product} = props;
    const [post] = product.posts;
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
                <BiLink size={18} />
                <span>공유하기</span>
            </button>
        </CopyToClipboard>
    );
});
