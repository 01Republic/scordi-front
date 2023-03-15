import {memo} from 'react';
import {useCurrentApplication} from '^hooks/useApplications';
import {WithChildren} from '^types/global.type';
import {useRouter} from 'next/router';
import {OrgProtoDetailPageRoute} from '^pages/orgs/[id]/prototypes/[protoId]';

export const ApplicationHeader = memo((props: WithChildren) => {
    const {children} = props;
    const router = useRouter();
    const {currentApplication: app} = useCurrentApplication();

    if (!app) return <></>;

    const proto = app.prototype;
    const goToProtoDetailPage = () => router.push(OrgProtoDetailPageRoute.path(app.organizationId, app.prototypeId));

    return (
        <section id="PrototypeHeader" className="flex mb-10 justify-between items-center">
            <div className="flex gap-6">
                {/* logo */}
                <div>
                    <img src={proto.image} width={56} height={56} alt={`${proto.name} logo`} />
                </div>

                {/* title */}
                <div className="flex flex-col justify-between">
                    <p className="text-[2rem] leading-none text-gray-900 font-semibold">
                        Subscription of "{app.displayName}"
                    </p>
                    <p className="text-lg leading-none text-gray-400 capitalize flex gap-2">
                        <span>On</span>
                        <span
                            className="text-gray-900 cursor-pointer hover:underline"
                            onClick={() => goToProtoDetailPage()}
                        >
                            {proto.name}
                        </span>
                        <span className="text-sm normal-case">
                            {/*<OutLink href="https://github.com/organizations/ATOZ-TEAM/settings/profile" />*/}
                        </span>
                    </p>
                </div>

                {/* one-liner */}
                <div>
                    <span className="btn btn-primary btn-sm btn-weekly hover-no capitalize">{proto.tagline}</span>
                </div>
            </div>

            {children}
        </section>
    );
});
