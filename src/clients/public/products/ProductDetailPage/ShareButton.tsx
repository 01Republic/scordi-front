import React, {memo} from 'react';
import {toast} from 'react-toastify';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {ProductDto} from '^models/Product/type';
import {Link} from 'lucide-react';

export const ShareButton = memo((props: {product: ProductDto}) => {
    const {product} = props;
    const [post] = product.posts;

    if (!post) return <></>;

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
