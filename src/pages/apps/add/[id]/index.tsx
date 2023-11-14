import {MobileTopNav} from '^components/MobileTopNav';
import {AppIconButton} from '^components/AppIconButton';
import {TextInput} from '^components/TextInput';
import {DefaultButton} from '^components/Button';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {ProductDto} from '^models/Product/type';
import {AddAuto} from '^components/add/AddAuto';
import {AddManual} from '^components/add/AddManual';
import {AddPrepare} from '^components/add/AddPrepare';
import {getOrgMainLayout} from '^layouts/org/mainLayout';
import OrgMobileLayout from '^layouts/org/mobileLayout';
import {productApi} from '^models/Product/api';

export const AddServicePageRoute = {
    pathname: '/apps/add/:id',
    path: (id: number, orgId: number) => `/apps/add/${id}?orgId=${orgId}`,
};

const AddService = () => {
    const router = useRouter();
    const prototypeId = Number(router.query.id);
    const [target, setTarget] = useState<ProductDto>({} as ProductDto);

    useEffect(() => {
        if (router.isReady) {
            productApi.show(prototypeId).then((res) => {
                setTarget(res.data);
            });
        }
    }, [router.isReady]);

    if (!target) return <></>;

    return (
        <OrgMobileLayout>
            <MobileTopNav title={'서비스 연동하기'} />
            {target.connectMethod === 'AUTO' && <AddAuto appInfo={target} />}
            {target.connectMethod === 'MANUAL' && <AddManual appInfo={target} />}
            {target.connectMethod === 'PREPARE' && <AddPrepare appInfo={target} />}
        </OrgMobileLayout>
    );
};

export default AddService;
