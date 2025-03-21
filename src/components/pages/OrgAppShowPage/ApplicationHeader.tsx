import React, {memo} from 'react';
import {useCurrentSubscription} from '^models/Subscription/hook';
import {WithChildren} from '^types/global.type';
import {useRouter} from 'next/router';
import {OrgProtoDetailPageRoute} from 'src/pages/orgs/[id]/products/[productId]';
import {ApplicationLogo} from './ApplicationLogo';
import {ExternalLink} from 'lucide-react';

export const ApplicationHeader = memo((props: WithChildren) => {
    const {children} = props;
    const router = useRouter();
    const {currentSubscription: subscription} = useCurrentSubscription();

    if (!subscription) return <></>;

    const {workspace, product} = subscription;
    const {slug = '', displayName = ''} = workspace || {};

    const goToProtoDetailPage = () =>
        router.push(OrgProtoDetailPageRoute.path(subscription.organizationId, subscription.productId));

    const orgPageUrl = eval(`\`${product.orgPageUrlScheme}\``) as string;
    const open = (url: string) => (url ? window.open(url, '_blank') : alert('This service linkage is not ready :('));

    return (
        <section id="PrototypeHeader" className="flex mb-10 justify-between items-center">
            <div className="flex gap-6">
                {/* logo */}
                <ApplicationLogo subscription={subscription} />

                {/* title */}
                <div className="flex flex-col justify-between">
                    <p className="text-[2rem] leading-none text-gray-900 font-semibold">{displayName}</p>
                    <p className="text-lg leading-none text-gray-400 capitalize flex gap-2">
                        <span>On</span>
                        <span
                            className="text-gray-900 cursor-pointer hover:underline"
                            onClick={() => goToProtoDetailPage()}
                        >
                            {product.nameEn}
                        </span>
                        <span className="text-sm normal-case">
                            {/*<OutLink href="https://github.com/organizations/ATOZ-TEAM/settings/profile" />*/}
                        </span>
                    </p>
                </div>

                {/* one-liner */}
                <div>
                    <span className="btn btn-primary btn-sm btn-weekly hover-no capitalize">{product.tagline}</span>
                </div>
            </div>

            <div className="flex gap-2 items-center">
                <button className="btn btn-gray" onClick={() => open(orgPageUrl)}>
                    <ExternalLink size={20} />
                </button>
                {children}
            </div>
        </section>
    );
});
