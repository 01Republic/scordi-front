import {MobileTopNav} from '^components/MobileTopNav';
import {AppIconButton} from '^components/AppIconButton';
import {TextInput} from '^components/TextInput';
import {DefaultButton} from '^components/Button';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import AddComplete, {AddCompletePageRoute} from '^pages/apps/add/complete';
import {getApplicationPrototype, getApplicationPrototypes} from '^api/applicationPrototype.api';
import {ApplicationPrototypeDto} from '^types/applicationPrototype.type';
import {AddAuto} from '^components/add/AddAuto';
import {AddManual} from '^components/add/AddManual';
import {AddPrepare} from '^components/add/AddPrepare';

export const AddServicePageRoute = {
    pathname: '/apps/add/:id',
    path: (id: string) => `/apps/add/${id}`,
};

const AddService = () => {
    const router = useRouter();
    const prototypeId = Number(router.query.id);
    const [target, setTarget] = useState<ApplicationPrototypeDto>({} as ApplicationPrototypeDto);

    useEffect(() => {
        if (router.isReady) {
            getApplicationPrototype(prototypeId).then((res) => {
                setTarget(res.data);
            });
        }
    }, [router.isReady]);

    if (!target) return null;
    return (
        <>
            <MobileTopNav title={'서비스 연동하기'} />
            {target.connectMethod === 'AUTO' && <AddAuto appInfo={target} />}
            {target.connectMethod === 'MANUAL' && <AddManual appInfo={target} />}
            {target.connectMethod === 'PREPARE' && <AddPrepare appInfo={target} />}
        </>
    );
};

export default AddService;
