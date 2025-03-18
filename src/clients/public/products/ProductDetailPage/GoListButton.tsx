import {memo} from 'react';
import {useRouter} from 'next/router';
import {ProductListPageRoute} from '^pages/products';
import {List} from 'lucide-react';

export const GoListButton = memo(() => {
    const router = useRouter();

    return (
        <button className="btn" onClick={() => router.push(ProductListPageRoute.path())}>
            <List size={18} />
            <span>목록으로</span>
        </button>
    );
});
