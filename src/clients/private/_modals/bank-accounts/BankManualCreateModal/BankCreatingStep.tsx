import React, {memo} from 'react';

export const BankCreatingStep = memo(() => {
    return (
        <div className="flex items-center justify-center" style={{height: 'calc(100vh - 3rem)'}}>
            <div className="pb-20">
                <div className="mb-8">
                    <progress className="progress bg-gray-100 progress-primary" />
                </div>
                <div className="text-center text-gray-400 font-medium">
                    <p className="text-16">결제수단을 추가하고 있어요</p>
                    <p className="text-16">잠시만 기다려주세요</p>
                </div>
            </div>
        </div>
    );
});
BankCreatingStep.displayName = 'BankCreatingStep';
