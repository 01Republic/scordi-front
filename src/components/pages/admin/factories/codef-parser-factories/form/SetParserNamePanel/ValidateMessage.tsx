import React, {memo} from 'react';
import {FaCheckCircle, FaExclamationTriangle} from 'react-icons/fa';

interface ValidateMessageProps {
    value: string;
    invalidMsg: string;
    similarLength: number;
    matchedLength: number;
}

export const ValidateMessage = memo((props: ValidateMessageProps) => {
    const {value, invalidMsg, similarLength, matchedLength} = props;

    return (
        <div className="flex items-center justify-between mb-4">
            <div>
                {!!value && (
                    <div className="flex items-center gap-4">
                        {matchedLength ? (
                            <>
                                <FaExclamationTriangle className="text-error" />
                                <p className="text-11 text-error font-semibold">이미 사용중인 이름입니다.</p>
                            </>
                        ) : invalidMsg ? (
                            <>
                                <FaExclamationTriangle className="text-error" />
                                <p className="text-11 text-error font-semibold">사용할 수 없는 이름입니다.</p>
                            </>
                        ) : (
                            <>
                                <FaCheckCircle className="text-success" />
                                <p className="text-11 text-success font-semibold">사용할 수 있습니다.</p>
                            </>
                        )}
                    </div>
                )}
            </div>

            <div>
                <p className="text-11 text-red-400">
                    {invalidMsg ? (
                        <span>{invalidMsg}</span>
                    ) : !!similarLength ? (
                        <span>비슷한 이름이 {similarLength}개 있음에 유의하세요.</span>
                    ) : (
                        <></>
                    )}
                </p>
            </div>
        </div>
    );
});
ValidateMessage.displayName = 'ValidateMessage';
