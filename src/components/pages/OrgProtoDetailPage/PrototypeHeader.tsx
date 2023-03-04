import {memo, useEffect} from 'react';
import {prototypeIdParamsState, useRouterIdParamState} from '^atoms/common';
import {useApplicationPrototype} from '^hooks/useApplicationPrototypes';

export const PrototypeHeader = memo(() => {
    const [proto, mutation] = useApplicationPrototype();

    useEffect(() => {
        mutation(undefined);
    }, []);

    if (!proto) return <></>;

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
                        by <span className="text-gray-900">{proto.companyName}</span>
                    </p>
                </div>

                {/* one-liner */}
                <div>
                    <span className="btn btn-primary btn-sm btn-weekly hover-no capitalize">{proto.tagline}</span>
                </div>
            </div>
        </section>
    );
});
