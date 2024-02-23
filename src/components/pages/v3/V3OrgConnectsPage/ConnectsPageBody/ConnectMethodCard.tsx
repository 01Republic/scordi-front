import {memo} from 'react';
import {LinkTo} from '^components/util/LinkTo';

interface ConnectMethodCardProps {
    logo: string;
    title: string;
    comment?: string;
    disabled?: boolean;
    href?: string;
    onClick?: () => any;
}

export const ConnectMethodCard = memo((props: ConnectMethodCardProps) => {
    const {logo, title, comment, disabled = false, href, onClick} = props;

    return (
        <LinkTo href={href} className="no-anim animate-soft-pulse">
            <div
                className={`card card-body p-6 bg-base-100 shadow-xl transition no-selectable ${
                    disabled ? 'cursor-not-allowed opacity-30' : 'hover:shadow-2xl cursor-pointer btn-animation'
                }`}
                onClick={onClick}
            >
                <img src={logo} alt="" className="avatar w-[40px] h-[40px] mb-2" />
                <p className="card-title text-16">{title}</p>
                {comment && <p className="text-gray-500 text-14">{comment}</p>}
            </div>
        </LinkTo>
    );
});
ConnectMethodCard.displayName = 'ConnectMethodCard';
