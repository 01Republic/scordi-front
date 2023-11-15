import {memo} from 'react';
import {PostAuthorDto} from '^models/Post/type/authorType';
import {PostDto} from '^models/Post/type';

interface AuthorCardProps {
    post: PostDto;
    author: PostAuthorDto;
}

export const AuthorCard = memo((props: AuthorCardProps) => {
    const {post, author} = props;

    return (
        <div className="flex bg-neutral rounded-box">
            <div className="card-body sm:flex-row gap-8 items-start text-center sm:text-left">
                <div className="w-full sm:w-auto">
                    <div className="avatar">
                        <div className="rounded-full">
                            <img
                                src={author.profileImg}
                                alt={`"${author.name}"'s profile image`}
                                className="!w-[125px]"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <h2 className="text-xl mb-[1em]">{author.name}</h2>
                    <p className="text-[18px] leading-[1.6] w-full whitespace-pre-wrap">{author.introduce}</p>
                </div>
            </div>
        </div>
    );
});
