import {memo} from 'react';
import {useModal} from '^v3/share/modals/useModal';
import {reportMemberItemModalIsShow, subjectReportMemberItem} from './atom';
import {useRecoilValue} from 'recoil';
import {ReportMemberAppItem} from '^tasting/tabs/panes/SyncWorkspaceApp/results/ReportMemberItemModal/AppItem';

export const ReportMemberItemModal = memo(function ReportMemberItemModal() {
    const {Modal, CloseButton} = useModal({isShowAtom: reportMemberItemModalIsShow});
    const subjectMemberItem = useRecoilValue(subjectReportMemberItem);
    const uniqueApps = subjectMemberItem?.appsInUniq() || [];

    return (
        <Modal>
            <h3 className="text-xl font-semibold mb-4">{subjectMemberItem?.email}</h3>
            <CloseButton className="absolute top-4 right-4" />

            <ul className="menu menu-compact lg:menu-normal bg-base-100">
                {uniqueApps.map((app, i) => (
                    <ReportMemberAppItem app={app} key={i} />
                ))}
            </ul>

            <hr />

            <p className="py-3 text-xl font-semibold flex items-center justify-between">
                <span></span>
                <span>
                    <b className="text-scordi">{uniqueApps.length.toLocaleString()} 개</b>의 서비스를 이용하고 있어요
                </span>
            </p>
        </Modal>
    );
});
