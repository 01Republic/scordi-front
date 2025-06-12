import React, {memo} from 'react';

interface ConnectNewAccountButtonProps {
    onClick: () => any;
    disabled?: boolean;
}

export const ConnectNewAccountButton = memo((props: ConnectNewAccountButtonProps) => {
    const {onClick, disabled = false} = props;

    return (
        <button
            type="button"
            className={`btn btn-block btn-scordi no-animation btn-animation disabled:btn-disabled2`}
            disabled={disabled}
            onClick={onClick}
        >
            새로운 카드사 계정으로 불러오기
        </button>
    );
});
ConnectNewAccountButton.displayName = 'ConnectNewAccountButton';
