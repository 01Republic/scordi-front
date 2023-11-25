import {ReportDto} from './dto/report.dto';
import {plainToInstance} from 'class-transformer';
import {toast as toaster} from 'react-hot-toast';
import {ReportItemAppDto} from './dto/report-item-app.dto';
import {ReportItemDto} from './dto/report-item.dto';
import {ReportGroupedByProductItemDto} from './dto/view-types/group-by-product/report.grouped-by-product-item.dto';

export const BLACK_LIST = [
    'Scordi with',
    'Google Chrome',
    'Scordi Dev',
    'Scordi-google-admin-test',
    'WOOWACON 2023',
    'iOS',
    'My Files',
    'iOS Account Manager',
    'Google Drive for desktop',
    'macOS',
    'Android device',
    'SAMSUNG Account',
    'Google APIs Explorer',
].map((str) => str.toLowerCase());

export function filterBlackList(reportList: ReportDto) {
    const {items: _, ...rest} = reportList;
    const items = reportList.items.map((item) => {
        const apps = [...item.apps].filter((app) => {
            const appName = app.appName.toLowerCase();
            return !BLACK_LIST.includes(appName);
        });
        return {...item, apps};
    });

    return plainToInstance(ReportDto, {items, ...rest});
}

/**
 * SubjectItem(모달에 표시된 SaaS)에 멤버를 추가합니다.
 * --
 * 최초 데이터인 리포트를 업데이트하면, 필요한 컴포넌트들에 순차적으로 변경이 전파하는 구조입니다.
 *  - 리포트 변경을 SyncWorkspaceAppLoadedBody 의 useEffect 가 감지해 ReportByProduct 를 업데이트 합니다.
 *  - ReportByProduct 가 업데이퇴면,
 *  - 변경을 ProductItemList 의 useEffect 가 감지해 SubjectItem 을 업데이트 합니다.
 */
export function addNewMemberService(
    oldReport: ReportDto | null,
    reportProductItem: ReportGroupedByProductItemDto,
    inputValue: string,
) {
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
}

/**
 * SubjectItem(모달에 표시된 SaaS)의 멤버를 제거합니다.
 * --
 * 최초 데이터인 리포트를 업데이트하면, 필요한 컴포넌트들에 순차적으로 변경이 전파하는 구조입니다.
 *  - 리포트 변경을 SyncWorkspaceAppLoadedBody 의 useEffect 가 감지해 ReportByProduct 를 업데이트 합니다.
 *  - ReportByProduct 가 업데이퇴면,
 *  - 변경을 ProductItemList 의 useEffect 가 감지해 SubjectItem 을 업데이트 합니다.
 */
export function removeMemberService(
    oldReport: ReportDto | null,
    reportProductItem: ReportGroupedByProductItemDto,
    email: string,
) {
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
}

export function addNewProductService(oldReport: ReportDto | null, appName: string) {
    if (!oldReport) return oldReport;
    const members = [...oldReport.items];

    const existedApp = oldReport.groupByProduct().items.find((app) => app.key === appName);
    if (existedApp) return oldReport;

    const currentApp = plainToInstance(ReportItemAppDto, {appName});
    currentApp.lastAuthorizedTime = new Date();
    currentApp.isPersisted = false;
    currentApp.isNew = true;

    const newMemberData = oldReport.items.find((it) => it.email === 'noname') || {
        email: 'noname',
        apps: [],
        isPersisted: false,
        isEdited: true,
    };
    const newMember = plainToInstance(ReportItemDto, {...newMemberData});
    newMember.apps = [...newMember.apps, currentApp];
    members.push(newMember);

    const newReport = plainToInstance(ReportDto, {...oldReport});
    newReport.items = members;

    return newReport;
}

export function removeProductService(oldReport: ReportDto | null, reportProductItem: ReportGroupedByProductItemDto) {
    if (!oldReport) return oldReport;
    const members = [...oldReport.items];

    // 멤버를 순회하면서
    // apps 에 제거하려는 서비스를 의미하는 app 을 찾아서 제거한다.
    // apps 가 빈 멤버가 발생하면, 멤버도 지운다. --->> 취소. 지우지 않음. 제품제거시 멤버 자체는 그대로 둔다.

    const newMembers = members.map((member) => {
        const dupMember = plainToInstance(ReportItemDto, {...member});
        dupMember.apps = member.apps.filter((app) => app.key !== reportProductItem.key);
        dupMember.isEdited = true;
        return dupMember;
    });

    const newReport = plainToInstance(ReportDto, {...oldReport});
    newReport.items = newMembers;

    return newReport;
}
