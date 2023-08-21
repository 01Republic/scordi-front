import {memo} from 'react';
import {useRouter} from 'next/router';
import {BsList} from 'react-icons/bs';
import {ProductPostListPageRoute} from '^pages/products';

export const GoListButton = memo(() => {
    const router = useRouter();

    return (
        <button className="btn" onClick={() => router.push(ProductPostListPageRoute.path())}>
            <BsList size={18} />
            <span>목록으로</span>
        </button>
    );
});
