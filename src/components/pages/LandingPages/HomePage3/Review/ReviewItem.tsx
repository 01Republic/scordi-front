import {memo} from 'react';

interface ReviewItemProps {
    company: string;
    reviewer: string;
    role: string;
}

export const ReviewItem = memo((props: ReviewItemProps) => {
    const {company, reviewer, role} = props;

    return (
        <div className="card card-side bg-white border">
            {/*<figure><img src="/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie"/></figure>*/}
            <div className="card-body">
                <h2 className="card-title">New movie is released!</h2>
                <p className="mb-4">Click the button to watch on Jetflix app.</p>
                <div className="card-actions justify-end">
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
