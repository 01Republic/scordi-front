import {memo} from 'react';
import {ReactNodeLike} from 'prop-types';

interface ReviewItemProps {
    company: string;
    reviewer: string;
    role: string;
    logo: string;
    content: ReactNodeLike;
    duration: number;
}

export const ReviewItem = memo((props: ReviewItemProps) => {
    const {logo, company, reviewer, role, content, duration} = props;

    return (
        <div
            className="card card-side bg-white shadow-xl"
            data-aos-anchor-placement="bottom-bottom"
            data-aos-duration={duration}
        >
            {/*<figure><img src="/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie"/></figure>*/}
            <div className="card-body">
                <div className="text-right mb-6">
                    <img
                        className="inline"
                        src={logo}
                        alt={`${reviewer}'s review`}
                        draggable={false}
                        loading="lazy"
                        style={{height: '30px'}}
                    />
                </div>
                <div className="mb-auto">{content}</div>
                <div className="card-actions justify-end pt-4">
                    <div>
                        {reviewer}님 |{' '}
                        <span className="text-gray-500">
                            <b>{company}</b> {role}
                        </span>
                    </div>
                    {/*    <button className="btn btn-primary">Watch</button>*/}
                </div>
            </div>
        </div>
    );
});
ReviewItem.displayName = 'ReviewItem';
