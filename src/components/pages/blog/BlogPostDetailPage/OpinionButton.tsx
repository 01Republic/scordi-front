import {memo} from 'react';
import {usePost} from '^hooks/usePosts';
import {AiFillMail} from 'react-icons/ai';

export const OpinionButton = memo(() => {
    const {post} = usePost();

    if (!post) return <></>;

    return (
        <button className="btn">
            <AiFillMail size={18} />
            <span>의견 남기기</span>
        </button>
    );
});
