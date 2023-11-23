import {atom, useSetRecoilState} from 'recoil';
import {ReportDto} from './dto/report.dto';
import {ReportGroupedByProductDto} from './dto/view-types/group-by-product/report.grouped-by-product.dto';
import {ReportGroupedByProductItemDto} from './dto/view-types/group-by-product/report.grouped-by-product-item.dto';
import {addNewMemberService, removeMemberService, removeProductService} from './features';
import {useModal} from '^v3/share/modals/useModal';

/**
 * SyncWorkspaceApp 구독찾기 데모를 위한
 * 전용 상태를 관리합니다.
 */

export enum ReportLoadingStatus {
    NotLoaded,
    Loading,
    Loaded,
    // Success,
    // Failure,
}

export const reportLoadingStatus = atom<ReportLoadingStatus>({
    key: 'tasting/reportLoadingStatus',
    default: ReportLoadingStatus.NotLoaded,
});

export const reportState = atom<ReportDto | null>({
    key: 'reportState',
    default: null,
});

export const reportGroupedByProductState = atom<ReportGroupedByProductDto | null>({
    key: 'reportGroupedByProductState',
    default: null,
});

export const subjectReportProductItem = atom<ReportGroupedByProductItemDto | null>({
    key: 'subjectReportProductItem',
    default: null,
});

export const reportItemModalIsShow = atom<boolean>({
    key: 'reportItemModalIsShow',
    default: false,
});

export const useReportInDemo = () => {
    const setReport = useSetRecoilState(reportState);
    const setSubjectItem = useSetRecoilState(subjectReportProductItem);
    const {close: closeModal} = useModal({isShowAtom: reportItemModalIsShow});

    /**
     * SubjectItem(모달에 표시된 SaaS)에 멤버를 추가합니다.
     * --
     * 최초 데이터인 리포트를 업데이트하면, 필요한 컴포넌트들에 순차적으로 변경이 전파하는 구조입니다.
     *  - 리포트 변경을 SyncWorkspaceAppLoadedBody 의 useEffect 가 감지해 ReportByProduct 를 업데이트 합니다.
     *  - ReportByProduct 가 업데이퇴면,
     *  - 변경을 ProductItemList 의 useEffect 가 감지해 SubjectItem 을 업데이트 합니다.
     *
     * @param reportProductItem
     * @param inputValue
     */
    const addMember = (reportProductItem: ReportGroupedByProductItemDto, inputValue: string) => {
        setReport((oldReport) => addNewMemberService(oldReport, reportProductItem, inputValue));
    };

    /**
     * SubjectItem(모달에 표시된 SaaS)의 멤버를 제거합니다.
     * --
     * 최초 데이터인 리포트를 업데이트하면, 필요한 컴포넌트들에 순차적으로 변경이 전파하는 구조입니다.
     *  - 리포트 변경을 SyncWorkspaceAppLoadedBody 의 useEffect 가 감지해 ReportByProduct 를 업데이트 합니다.
     *  - ReportByProduct 가 업데이퇴면,
     *  - 변경을 ProductItemList 의 useEffect 가 감지해 SubjectItem 을 업데이트 합니다.
     *
     * @param reportProductItem
     * @param email
     */
    const removeMember = (reportProductItem: ReportGroupedByProductItemDto, email: string) => {
        setReport((oldReport) => removeMemberService(oldReport, reportProductItem, email));
    };

    const removeProduct = (reportProductItem: ReportGroupedByProductItemDto) => {
        closeModal();
        setReport((oldReport) => removeProductService(oldReport, reportProductItem));
        setSubjectItem(null);
    };

    return {
        productHandler: {remove: removeProduct},
        memberHandler: {add: addMember, remove: removeMember},
    };
};
