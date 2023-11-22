import {ReportDto} from './dto/report.dto';
import {plainToInstance} from 'class-transformer';

export const BLACK_LIST = [
    'Scordi with admin api',
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
    // if (!reportList) return;

    const {items: _, ...rest} = reportList;
    const items = reportList.items.map((item) => {
        const apps = [...item.apps].filter((app) => {
            const appName = app.appName.toLowerCase();
            return !BLACK_LIST.includes(appName);
        });
        return {...item, apps};
    });

    return plainToInstance(ReportDto, {items, ...rest});

    // reportList.items.forEach((item) => {
    //     const apps = item.apps;
    //
    //     item.apps = apps.filter((app) => {
    //         const appName = app.appName.toLowerCase();
    //         return !lowBlackList.includes(appName);
    //     });
    // });
    //
    // setReportData(reportList);
    //
    // return reportList;
}
