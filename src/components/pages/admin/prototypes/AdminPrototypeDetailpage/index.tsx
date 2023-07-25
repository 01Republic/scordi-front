import {AdminDetailPageLayout} from '^components/pages/admin/layouts/DetailPageLayout';
import {AdminPrototypesPageRoute} from '^pages/admin/prototypes';
import {Fragment, memo, useEffect} from 'react';
import {atom, useRecoilState, useRecoilValue} from 'recoil';
import {useRouter} from 'next/router';
import {ApplicationPrototypeDto} from '^types/applicationPrototype.type';
import {applicationPrototypeApi} from '^api/applicationPrototype.api';
import {ContentTabNav} from '^layouts/ContentLayout';
import {PrototypeInfoTabContent} from 'src/components/pages/admin/prototypes/AdminPrototypeDetailpage/PrototypeInfoTabContent';
import {PrototypeSettingTabContent} from 'src/components/pages/admin/prototypes/AdminPrototypeDetailpage/PrototypeSettingTabContent';

export const adminPrototypeDetail = atom<ApplicationPrototypeDto | null>({
    key: 'adminPrototypeDetail',
    default: null,
});

export const navTabIndex = atom({
    key: 'adminPrototypeDetailPage/NavTabIndex',
    default: 0,
});

export const AdminPrototypeDetailPage = memo(() => {
    const router = useRouter();
    const prototypeId = Number(router.query.id);
    const [prototype, setPrototype] = useRecoilState(adminPrototypeDetail);
    const tabIndex = useRecoilValue(navTabIndex);

    useEffect(() => {
        if (!prototypeId || isNaN(prototypeId)) return;
        applicationPrototypeApi.show(prototypeId).then((res) => setPrototype(res.data));
    }, [prototypeId]);

    if (!prototype) return <>Prototype(#{router.query.id}) Not Found.</>;

    const tabs = [
        {label: '기본정보', Component: PrototypeInfoTabContent},
        {label: '설정', Component: PrototypeSettingTabContent},
        //
    ];

    const TabContentComponent = tabs[tabIndex]?.Component || Fragment;

    return (
        <AdminDetailPageLayout
            title="앱 상세"
            breadcrumbs={[
                {text: '앱 관리'},
                {text: '앱 목록', href: AdminPrototypesPageRoute.path()},
                {text: '앱 상세'},
                //
            ]}
            tabNav={<ContentTabNav resetIndex={true} tabs={tabs.map((tab) => tab.label)} recoilState={navTabIndex} />}
        >
            <div className="container pt-10 px-2 sm:px-4">
                <TabContentComponent />
            </div>
        </AdminDetailPageLayout>
    );
});
