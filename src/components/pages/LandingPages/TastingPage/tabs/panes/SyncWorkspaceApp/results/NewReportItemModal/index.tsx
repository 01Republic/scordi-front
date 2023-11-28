import React, {memo} from 'react';
import {useModal} from '^v3/share/modals/useModal';
import {newReportItemModalIsShow} from './atom';
import {ModalTopbar} from '^v3/share/modals/ModalTopbar';
import {MobileSection} from '^components/pages/v3/share/sections/MobileSection';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';

export const NewReportItemModal = memo(function NewReportItemModal() {
    const {Modal} = useModal({isShowAtom: newReportItemModalIsShow});

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
            <ModalTopbar backBtnOnClick={close} topbarPosition="sticky" />

            <MobileSection.List>
                {/* 아이템 섹션 통자로 한개 짜리 모달. 즉 이 아이템 내부가 사실상 모달 내 Body */}
                <MobileSection.Item className="border-none">
                    <MobileSection.Padding>
                        <div className="flex items-center gap-3 mb-[2rem]">
                            <h3 className="">이름만 알려주세요</h3>
                        </div>

                        <div>
                            <div className="form-control w-full">
                                <label className="label px-0">
                                    <span className="label-text">서비스명</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder=""
                                    className="input input-underline w-full px-0 text-lg font-semibold"
                                />
                                <span />
                                <label className="label">
                                    {/*<span className="label-text-alt">Bottom Left label</span>*/}
                                </label>
                            </div>
                        </div>
                    </MobileSection.Padding>
                </MobileSection.Item>

                <ModalLikeBottomBar
                    style={{
                        backgroundImage: 'linear-gradient(transparent 0%, white 20%, white)',
                    }}
                >
                    <button className="btn btn-lg btn-block rounded-box btn-scordi">다음</button>
                </ModalLikeBottomBar>
            </MobileSection.List>
        </Modal>
    );
});
