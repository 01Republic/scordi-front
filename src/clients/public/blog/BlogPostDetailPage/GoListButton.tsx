import {memo} from 'react';
import {PostListPageRoute} from '^pages/posts';
import {useRouter} from 'next/router';
import {List} from 'lucide-react';

export const GoListButton = memo(() => {
    const router = useRouter();

    return (
        <button className="btn" onClick={() => router.push(PostListPageRoute.path())}>
            <List size={18} />
            <span>목록으로</span>
        </button>
    );
});
