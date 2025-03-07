import React, {memo} from 'react';
import {AlertTriangle, CheckCircle} from 'lucide-react';

interface ValidateMessageProps {
    value: string;
    resultLength: number;
}

export const ValidateMessage = memo((props: ValidateMessageProps) => {
    const {value, resultLength} = props;

    return (
        <div className="mb-4">
            <div className="flex items-center gap-4">
                <p>검색결과: {resultLength}개</p>
                <p>
                    {resultLength === 1 ? (
                        <span className="flex gap-2 items-center">
                            <CheckCircle className="text-success" />
                            {value.split(' ').length < 3 && (
                                <span className="text-11 text-orange-500">
                                    조건을 충족하지만 너무 짧습니다. 3단어 이상 포함해주세요. (권장사항)
                                </span>
                            )}
                        </span>
                    ) : (
                        <span className="flex gap-2 items-center">
                            <AlertTriangle className="text-error" />
                            <span className="text-11 text-error">검색결과는 1개여아만 합니다.</span>
                        </span>
                    )}
                </p>
            </div>
        </div>
    );
});
ValidateMessage.displayName = 'ValidateMessage';
