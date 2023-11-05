import {ButtonHTMLAttributes, DetailedHTMLProps, memo} from 'react';
import {useModal} from '^v3/share/modals/useModal';
import {inquiryModalAtom} from '^components/pages/LandingPages/HomePage2/InquiryModal';

interface CTAButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export const CTAButton = memo((props: CTAButtonProps) => {
    const {className, children, ...properties} = props;
    const {open} = useModal(inquiryModalAtom);

    // const onClick = () => router.push(UserLoginPageRoute.path());
    const onClick = () => open();

    return (
        <button type="button" className={className} onClick={onClick} {...properties}>
            {children || '도입 문의하기'}
        </button>
    );
});
