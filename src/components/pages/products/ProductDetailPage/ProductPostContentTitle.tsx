import {memo} from 'react';
import {GrShare} from 'react-icons/gr';
import {ApplicationPrototypeDto} from '^types/applicationPrototype.type';
import {usePrototypePostContent} from '^hooks/useApplicationPrototypes';

export const ProductPostContentTitle = memo((props: {prototype: ApplicationPrototypeDto}) => {
    const {prototype} = props;
    const [post] = prototype.posts;
    if (!post) return <></>;
    const {makeContent} = usePrototypePostContent();

    const {thumbnailUrl, logoImgUrl, homePageUrl, title, subTitle, tagNames} = makeContent(prototype);

    return (
        <div>
            <div className="pb-5 border-none">
                <img src={thumbnailUrl} alt="thumbnail of this post" loading="lazy" draggable={false} />
            </div>
            <div className="flex justify-between">
                <div className="flex gap-4 sm:gap-6 items-center">
                    <div className="avatar ring-1 ring-gray-300 ring-offset-2 bg-white">
                        <div className="w-[40px] sm:w-16 rounded-full">
                            <img src={logoImgUrl} alt="logo image of this product" loading="lazy" draggable={false} />
                        </div>
                    </div>
                    <h2 className="text-center font-semibold text-gray-800 leading-[1.4] text-[28px] sm:text-[52px]">
                        {title}
                    </h2>
                </div>

                <div>
                    {homePageUrl && (
                        <a role="button" className="btn sm:btn-lg" href={homePageUrl} target="_blank">
                            <GrShare />
                        </a>
                    )}
                </div>
            </div>

            <div className="py-5 text-[16px]">
                <span>{subTitle}</span>
            </div>
            <div className="flex flex-row gap-2">
                {tagNames.map((tagName, i) => (
                    <div className="badge badge-sm sm:badge-md badge-ghost" key={i}>
                        {tagName}
                    </div>
                ))}
            </div>
        </div>
    );
});
