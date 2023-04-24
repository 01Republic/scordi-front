import React, {memo} from 'react';

export const LandingPageForMarketerModal = memo(() => {
    return (
        <>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <div className="card flex-shrink-0 w-full bg-base-100">
                        <div className="card-body p-5">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">성함</span>
                                </label>
                                <input type="text" placeholder="홍길동" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">회사명</span>
                                </label>
                                <input type="text" placeholder="제로원리퍼블릭" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">연락처</span>
                                </label>
                                <input type="text" placeholder="010-1234-5678" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">이메일</span>
                                </label>
                                <input type="text" placeholder="hello@01republic.io" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">제출하기</button>
                            </div>
                        </div>
                    </div>
                </label>
            </label>
        </>
    );
});
