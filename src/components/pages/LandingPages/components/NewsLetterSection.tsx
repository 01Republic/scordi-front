import {memo} from 'react';
import {useModal} from '^v3/share/modals/useModal';
import {atom} from 'recoil';

export const NewsLetterSection = memo(() => {
    const {open} = useModal({isShowAtom: newsLetterTermsModalIsOpenAtom});

    return (
        <>
            <section className="w-full NewsLetterSection">
                <div className="card w-full image-full !rounded-none">
                    <figure>
                        <img
                            src="/images/illustration/news-letter-section-bg.svg"
                            alt="new letter section background"
                            draggable={false}
                            loading="lazy"
                        />
                    </figure>
                    <div className="card-body py-[3rem] items-center text-center">
                        <h2 className="title mb-4 text-[2rem] sm:text-[3rem] leading-[1.2]">
                            효율적인 관리는 <br /> 성장의 시작입니다.
                        </h2>
                        <p className="subtitle sm:text-[1.2rem] mb-4">
                            조직과 팀 운영 관리 & 업무 생산성 인사이트 받아보기
                        </p>

                        <div className="form-control w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
                            <label className="label">
                                <span className="label-text text-white">이메일 주소 *</span>
                            </label>
                            <input type="text" placeholder="info@site.com" className="input input-bordered mb-4" />

                            <div className="form-control mb-4">
                                <label className="label cursor-pointer justify-start gap-2 px-0">
                                    <input type="checkbox" className="checkbox bg-white checkbox-info" />
                                    <span className="label-text text-white">
                                        (필수){' '}
                                        <span
                                            className="cursor-pointer text-scordi-light hover:text-scordi"
                                            onClick={(e) => {
                                                open();
                                                e.stopPropagation();
                                                e.preventDefault();
                                            }}
                                        >
                                            개인정보 수집 및 이용
                                        </span>
                                        에 동의합니다.
                                    </span>
                                </label>
                            </div>

                            <button className="btn btn-scordi border-none">뉴스레터 구독하기</button>
                        </div>
                    </div>
                </div>
            </section>
            <NewsLetterTermsModal />
        </>
    );
});

export const newsLetterTermsModalIsOpenAtom = atom({
    key: 'newsLetterTermsModalIsOpenAtom',
    default: false,
});

const NewsLetterTermsModal = memo(() => {
    const {Modal, close} = useModal({isShowAtom: newsLetterTermsModalIsOpenAtom});

    return (
        <Modal>
            <h3 className="font-bold text-lg">개인정보 수집 및 이용</h3>
            <div className="py-4">
                <p className="">뉴스레터 발송을 위한 최소한의 개인정보를 수집하고 이용합니다.</p>
                <p className="">
                    수집된 정보는 발송 외 다른 목적으로 이용되지 않으며, 서비스가 종료되거나 구독을 해지할 경우 즉시
                    파기됩니다.
                </p>
            </div>
            <div className="modal-action">
                <span className="btn" onClick={() => close()}>
                    닫기
                </span>
            </div>
        </Modal>
    );
});
