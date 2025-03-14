import {memo} from 'react';
import {usePost} from '^models/Post/hook';
import {Mail} from 'lucide-react';

export const OpinionButton = memo(() => {
    const {post} = usePost();

    if (!post) return <></>;

    return (
        <button className="btn">
            <Mail size={18} />
            <span>의견 남기기</span>
        </button>
    );
});
