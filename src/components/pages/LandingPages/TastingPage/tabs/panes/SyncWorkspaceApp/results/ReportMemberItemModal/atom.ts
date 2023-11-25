import {atom, useRecoilState, useSetRecoilState} from 'recoil';
import {ReportItemDto} from '../../dto/report-item.dto';
import {reportState} from '^components/pages/LandingPages/TastingPage/tabs/panes/SyncWorkspaceApp/atom';
import {useModal} from '^v3/share/modals/useModal';

export const reportMemberItemModalIsShow = atom<boolean>({
    key: 'reportMemberItemModalIsShow',
    default: false,
});

export const subjectReportMemberItem = atom<ReportItemDto | null>({
    key: 'subjectReportMemberItem',
    default: null,
});

export const useReportMemberItemModal = () => {
    const [report, setReport] = useRecoilState(reportState);
    const {open} = useModal({isShowAtom: reportMemberItemModalIsShow});
    const setSubjectMemberItem = useSetRecoilState(subjectReportMemberItem);

    const openModal = (email: string) => {
        if (!report) return;
        const memberItem = report.items.find((member) => member.email === email);
        setSubjectMemberItem(memberItem || null);
        open();
    };

    return {openModal};
};
