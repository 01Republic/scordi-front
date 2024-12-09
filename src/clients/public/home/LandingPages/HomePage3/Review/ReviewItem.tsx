import {memo} from 'react';
import {ReactNodeElement} from '^types/global.type';

interface ReviewItemProps {
    company: string;
    reviewer: string;
    role: string;
    logo: string;
    title: ReactNodeElement;
    content: ReactNodeElement;
    duration: number;
}

export const ReviewItem = memo((props: ReviewItemProps) => {
    const {logo, company, reviewer, role, title, content, duration} = props;

    return (
        <div
            className="card card-side bg-white shadow-xl"
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
            data-aos-duration={duration}
        >
            <div className="card-body">
                <div className="w-full flex items-center justify-between gap-4 mb-6">
                    <img
                        className="inline"
                        src={logo}
                        alt={`${reviewer}'s review`}
                        draggable={false}
                        loading="lazy"
                        style={{maxHeight: '30px', maxWidth: 'calc(40% - 1rem)'}}
                    />

                    <div className="min-w-[50%]">
                        <p className="text-[16px] font-bold">{reviewer} 님</p>
                        <p className="text-gray-500">
                            {company} {role}
                        </p>
                    </div>
                </div>
                <div className="mb-auto">
                    <img className="mb-2" src="/images/landing/review-flag.png" alt="review-mark" loading="lazy" />
                    <p className="text-[18px] font-extrabold" style={{lineHeight: '26px'}}>
                        {title}
                    </p>
                    <br />
                    <pre className="text-[16px]" style={{whiteSpace: 'pre-line', fontFamily: 'inherit'}}>
                        {content}
                    </pre>
                </div>
            </div>
        </div>
    );
});
ReviewItem.displayName = 'ReviewItem';
