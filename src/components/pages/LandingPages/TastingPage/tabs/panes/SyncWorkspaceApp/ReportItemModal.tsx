import React, {memo} from 'react';
import {useModal} from '^v3/share/modals/useModal';
import {
    reportItemModalIsShow,
    subjectReportProductItem,
} from '^components/pages/LandingPages/TastingPage/tabs/panes/SyncWorkspaceApp/atom';
import {useRecoilState} from 'recoil';
import {Avatar} from '^components/Avatar';
import {mm_dd, yyyy_mm_dd} from '^utils/dateTime';
import {currencyFormat} from '^api/tasting.api/gmail/agent/parse-email-price';
import {LinkTo} from '^components/util/LinkTo';
import {MdOutlineWatchLater} from 'react-icons/md';

export const ReportItemModal = memo(function ReportItemModal() {
    const {setIsShow, Modal, CloseButton} = useModal({isShowAtom: reportItemModalIsShow});
    const [subjectItem, setSubjectItem] = useRecoilState(subjectReportProductItem);

    return (
        <Modal>
            <h3 className="text-xl font-semibold mb-4">
                <Avatar
                    src={subjectItem?.product?.image}
                    className="w-9 h-9 outline outline-offset-1 outline-slate-100"
                />
                <span className="ml-3">{subjectItem?.appName}</span>
            </h3>
            <CloseButton className="absolute top-4 right-4" />

            <ul className="menu menu-compact lg:menu-normal bg-base-100">
                {(subjectItem?.members || []).map((member, i) => (
                    <li key={i}>
                        <div className="!w-auto gap-4 px-4 py-3 -mx-4 hover:bg-neutral btn-like no-selectable">
                            <Avatar className="w-9 h-9 outline outline-offset-1 outline-slate-100" />

                            <div className="flex-1">
                                <p className="leading-none font-light text-xs underline">{member.email}</p>
                                <p className="font-semibold text-gray-800">
                                    <span className="text-xs mr-2">
                                        <MdOutlineWatchLater size={10} />
                                    </span>
                                    <span className="text-xs text-gray-500 font-normal mr-2">Last</span>
                                    <span>{yyyy_mm_dd(member.lastAuthorizedTime)}</span>
                                </p>
                            </div>

                            {/*<p className="text-[16px]">*/}
                            {/*    <small className="mr-0.5">{symbol}</small>*/}
                            {/*    <span className="font-semibold">{currencyFormat(price, displayCurrency)}</span>*/}
                            {/*</p>*/}
                        </div>
                    </li>
                ))}

                <li>
                    <LinkTo
                        href="#"
                        onClick={() => alert('구성원 등록 기능은 곧 도와드릴게요!')}
                        className="btn btn-block rounded-box btn-scordi-light-200 !text-gray-600 btn-lg my-4"
                    >
                        혹시 누락된 구성원이 더 있나요?
                    </LinkTo>
                </li>
            </ul>

            <hr />

            <p className="py-3 text-xl font-semibold flex items-center justify-end">
                <span className="mr-2">총</span>
                <span className="font-bold text-scordi">{(subjectItem?.members.length || 0).toLocaleString()} 명</span>
                <span>이 쓰고 있어요</span>
            </p>
        </Modal>
    );
});
