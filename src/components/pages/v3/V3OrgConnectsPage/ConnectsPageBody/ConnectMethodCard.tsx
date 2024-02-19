import {memo} from 'react';

interface ConnectMethodCardProps {
    logo: string;
    title: string;
    comment?: string;
    disabled?: boolean;
}

export const ConnectMethodCard = memo((props: ConnectMethodCardProps) => {
    const {logo, title, comment, disabled = false} = props;

    return (
        <div
            className={`card card-body p-6 bg-base-100 shadow-xl transition ${
                disabled ? 'cursor-not-allowed opacity-30' : 'hover:shadow-2xl cursor-pointer btn-animation'
            }`}
        >
            <img src={logo} alt="" className="avatar border w-[40px] h-[40px] mb-2" />
            <p className="card-title text-16">{title}</p>
            {comment && <p className="text-gray-500 text-14">{comment}</p>}
        </div>
    );
});
ConnectMethodCard.displayName = 'ConnectMethodCard';
