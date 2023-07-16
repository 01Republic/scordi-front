import {memo} from 'react';
import {PostListPageRoute} from '^pages/posts';
import {useRouter} from 'next/router';
import {BsList} from 'react-icons/bs';

export const GoListButton = memo(() => {
    const router = useRouter();

    return (
        <button className="btn" onClick={() => router.push(PostListPageRoute.path())}>
            <BsList size={18} />
            <span>목록으로</span>
        </button>
    );
});
