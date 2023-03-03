import {memo, useEffect, useState} from 'react';
import {useApplication} from '^hooks/useApplications';
import {ApplicationPrototypeDto} from '^types/applicationPrototype.type';

export const PrototypeHeader = memo(() => {
    const app = useApplication();
    const [proto, setProto] = useState<ApplicationPrototypeDto | null>(null);

    useEffect(() => {
        if (!app) return;

        setProto(app.prototype);
    }, [app]);

    if (!proto) return <></>;

    console.log(proto);

    return (
        <section id="PrototypeHeader" className="flex mb-10">
            <div className="flex gap-6">
                {/* logo */}
                <div>
                    <img src={proto.image} width={56} height={56} alt={`${proto.name} logo`} />
                </div>

                {/* title */}
                <div className="flex flex-col justify-between">
                    <p className="text-[2rem] leading-none text-gray-900 font-semibold">{proto.name}</p>
                    <p className="text-lg leading-none text-gray-400 capitalize">
                        by <span className="text-gray-900">amazon</span>
                    </p>
                </div>

                {/* one-liner */}
                <div>
                    <span className="btn btn-primary btn-sm btn-weekly hover-no capitalize">
                        Infrastructure-As-A-Service Solutions
                    </span>
                </div>
            </div>
        </section>
    );
});
