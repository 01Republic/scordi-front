import {memo, useEffect, useState} from 'react';
import {orgIdParamState, productIdParamsState, useRouterIdParamState} from '^atoms/common';
import {useProduct} from '^hooks/useProducts';
import {WithChildren} from '^types/global.type';
import {useRecoilState, useRecoilValue} from 'recoil';
import {getSubscriptions} from '^api/subscription.api';
import {errorNotify} from '^utils/toast-notify';
import {subscriptionsForThisPrototypeAtom} from './OrgProtoDetailPage.desktop';

export const PrototypeHeader = memo((props: WithChildren) => {
    const {children} = props;
    const organizationId = useRecoilValue(orgIdParamState);
    const [proto, mutation] = useProduct();
    const [apps, setApps] = useRecoilState(subscriptionsForThisPrototypeAtom);

    useEffect(() => {
        mutation(undefined);
    }, []);

    useEffect(() => {
        if (!organizationId || isNaN(organizationId)) return;
        if (!proto) return;

        const where = {organizationId, productId: proto.id};
        getSubscriptions({where})
            .then((res) => res.data.items)
            .then(setApps)
            .catch(errorNotify);
    }, [organizationId, proto]);

    if (!proto) return <></>;

    return (
        <section id="PrototypeHeader" className="flex mb-10 justify-between items-center">
            <div className="flex gap-6">
                {/* logo */}
                <div>
                    <img src={proto.image} width={56} height={56} alt={`${proto.name} logo`} />
                </div>

                {/* title */}
                <div className="flex flex-col justify-between">
                    <p className="text-[2rem] leading-none text-gray-900 font-semibold">{proto.name}</p>
                    <p className="text-lg leading-none text-gray-400 capitalize">
                        by <span className="text-gray-900">{proto.companyName}</span>
                    </p>
                </div>

                {/* one-liner */}
                <div>
                    <span className="btn btn-primary btn-sm btn-weekly hover-no capitalize">{proto.tagline}</span>
                </div>
            </div>

            <div>
                <p className="capitalize text-gray-500 underline cursor-default">
                    now {apps.length} subscription exist.
                </p>
            </div>
        </section>
    );
});
