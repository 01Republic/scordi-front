import {atom, useSetRecoilState} from 'recoil';
import {ReportDto} from './dto/report.dto';
import {ReportGroupedByProductDto} from './dto/view-types/group-by-product/report.grouped-by-product.dto';
import {ReportGroupedByProductItemDto} from '^components/pages/LandingPages/TastingPage/tabs/panes/SyncWorkspaceApp/dto/view-types/group-by-product/report.grouped-by-product-item.dto';
import {plainToInstance} from 'class-transformer';
import {ReportItemDto} from '^components/pages/LandingPages/TastingPage/tabs/panes/SyncWorkspaceApp/dto/report-item.dto';
import {ReportItemAppDto} from '^components/pages/LandingPages/TastingPage/tabs/panes/SyncWorkspaceApp/dto/report-item-app.dto';
import {toast as toaster} from 'react-hot-toast';
import {toast} from 'react-toastify';

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

export const useReport = () => {
    const setReport = useSetRecoilState(reportState);

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
        setReport((oldReport) => {
            if (!oldReport) return oldReport;
            const members = [...oldReport.items];

            const member = members.find((m) => m.email === inputValue);

            if (member) {
                const app = member.apps.find((app) => app.appName === reportProductItem.appName);

                if (app) {
                    toaster('이 서비스에 이미 추가되어있습니다.');
                    return oldReport;
                }

                const currentApp = plainToInstance(ReportItemAppDto, {});
                currentApp.appName = reportProductItem.appName;
                currentApp.lastAuthorizedTime = new Date();
                currentApp.product = reportProductItem.product;

                const dupMember = plainToInstance(ReportItemDto, {...member});
                dupMember.apps = [...member.apps, currentApp];
                dupMember.isEdited = true;

                const index = members.indexOf(member);
                members.splice(index, 1, dupMember);
            } else {
                const currentApp = plainToInstance(ReportItemAppDto, {});
                currentApp.appName = reportProductItem.appName;
                currentApp.lastAuthorizedTime = new Date();
                currentApp.product = reportProductItem.product;

                const newMember = plainToInstance(ReportItemDto, {});
                newMember.email = inputValue;
                newMember.apps = [currentApp];
                newMember.isPersisted = false;
                newMember.isEdited = true;

                members.push(newMember);
            }

            const newReport = plainToInstance(ReportDto, {...oldReport});
            newReport.items = members;

            return newReport;
        });
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
        console.log('\n\n\n\n\n');
        console.log('reportProductItem', reportProductItem);
        console.log('email', email);
        console.log('\n\n');

        setReport((oldReport) => {
            if (!oldReport) return oldReport;
            const members = [...oldReport.items];

            const member = members.find((m) => m.email === email);
            console.log('member', member);

            // member 는 members 배열에 반드시 존재해야 합니다.
            // 이미 없는 member 는 취급하지 않습니다.
            if (!member) return oldReport;

            const app = member.apps.find((app) => app.key === reportProductItem.key);
            console.log('app', app);

            // app 은 배열에 반드시 존재해야 합니다.
            // 이미 없는 app 은 취급하지 않습니다.
            if (!app) return oldReport;

            const dupMember = plainToInstance(ReportItemDto, {...member});
            dupMember.apps = member.apps.filter((a) => a.key !== app.key);
            dupMember.isEdited = true;

            const index = members.indexOf(member);
            console.log('index', index);
            console.log('dupMember.apps.length', dupMember.apps.length);
            console.log('members.length', oldReport.items.length);
            // 최종적으로 이 멤버가 가지는 앱이 여전히 존해하면,
            dupMember.apps.length
                ? // 멤버정보를 업데이트하고
                  members.splice(index, 1, dupMember)
                : // 가지는 앱이 남아있지 않으면 멤버 자체를 제거합니다.
                  members.splice(index, 1);
            console.log('members.length', members.length);

            const newReport = plainToInstance(ReportDto, {...oldReport});
            newReport.items = members;

            return newReport;
        });
    };

    return {
        memberHandler: {add: addMember, remove: removeMember},
    };
};
