import {memo} from 'react';
import {usePost} from '^hooks/usePosts';
import {Avatar} from '^components/Avatar';
import {ShareButton} from './ShareButton';
import {OpinionButton} from './OpinionButton';

export const BlogPostDetailBody = memo(() => {
    const {post} = usePost();

    if (!post) return <></>;

    return (
        <div className="article-body">
            <div className="article-content" dangerouslySetInnerHTML={{__html: post.content}} />

            <div className="article-share flex flex-row-reverse items-start justify-between">
                <OpinionButton />
                <ShareButton />
            </div>

            <div className="article-author">
                <Avatar className="avatar-img" />
                <span className="author-name">{'scordi'}</span>
                <p className="author-introduce">{`애널리스트, 작가. 유튜브 <채상욱의 부동산 심부름센터(채부심)> 운영자, 국토부 대체투자위원회 위원. 지난 10년간 하나금융투자 건설/부동산 애널리스트로 일하며 부동산과 관련된 다양한 조사와 분석을 해왔다. 대학에서 건축학을 전공하고 2000년대 초 건설업계에 발을 들인 이후 자본시장에서 건설/부동산 기업들과 산업을 분석하는 자료를 발표하며 시장과 소통하고 있다.`}</p>

                {/*<button className="btn btn-scordi-light-100 mt-10 !text-scordi !hover:text-scordi-700">*/}
                {/*    저자의 글 더 보기*/}
                {/*</button>*/}
            </div>
        </div>
    );
});
