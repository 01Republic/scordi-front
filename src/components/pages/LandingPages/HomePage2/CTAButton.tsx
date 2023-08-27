import {ButtonHTMLAttributes, DetailedHTMLProps, memo} from 'react';
import {useRouter} from 'next/router';
import {UserLoginPageRoute} from '^pages/users/login';

interface CTAButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export const CTAButton = memo((props: CTAButtonProps) => {
    const router = useRouter();
    const {className, children, ...properties} = props;

    const onClick = () => router.push(UserLoginPageRoute.path());

    return (
        <button type="button" className={className} onClick={onClick} {...properties}>
            {children || '100개 고객사 한정 무료'}
        </button>
    );
});
