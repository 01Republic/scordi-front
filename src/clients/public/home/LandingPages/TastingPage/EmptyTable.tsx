import React, {memo} from 'react';
import {googleAuthForGmail} from '^api/tasting.api';

export const EmptyTable = memo(() => {
    return (
        <section className="container mb-24 px-4">
            <div className="w-full card bg-white shadow">
                <div className="card-body items-center justify-center py-[4rem]">
                    <div className="text-center">
                        <h3 className="text-xl mb-4">앗! 아직 결제 내역을 확인 할 수 없어요</h3>
                        <p className="text-16 font-light mb-6">
                            발견된 서비스가 없습니다. <br />
                            다른 계정을 추가해보세요!
                        </p>
                        <button
                            className="btn_google_signin_light w-[266px] h-[64px]"
                            onClick={() => googleAuthForGmail()}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
});
