import React, {memo} from 'react';
import {ArrowRight, Mail} from 'lucide-react';

interface EmailLoginButtonProps {
    onClick: () => void;
    className?: string;
    buttonText?: string;
}

export const EmailLoginButton = memo((props: EmailLoginButtonProps) => {
    const {onClick, className = '', buttonText = '이메일로 로그인하기'} = props;
    return (
        <button
            onClick={onClick}
            className="btn btn-lg btn-block btn-outline flex items-center justify-between shadow font-medium normal-case p-4 bg-white border-gray-150 text-gray-700 hover:bg-white hover:border-primary hover:text-slate-700 focus:bg-scordi-50 active:bg-primary-100"
        >
            <div className="flex items-center gap-4 pl-2">
                <Mail className="size-6 text-primaryColor-700" />
                {buttonText}
            </div>
            <ArrowRight />
        </button>
    );
});
