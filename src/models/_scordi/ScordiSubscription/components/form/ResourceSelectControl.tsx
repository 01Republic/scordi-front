import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {ResourceColumn} from '^admin/share';
import {ScordiPlanNextStrategy} from '^models/_scordi/ScordiPlan/type';
import {ChevronDown} from 'lucide-react';

interface ResourceSelectControlProps<T extends {id: number}>
    extends WithChildren<(props: {resource: T}) => JSX.Element> {
    resource?: T;
    readOnly?: boolean;
}

export const ResourceSelectControl = <T extends {id: number}>(props: ResourceSelectControlProps<T>) => {
    const {resource, readOnly = false, children} = props;

    return (
        <div
            className={`input input-bordered w-full flex items-center transition-all ${
                readOnly ? 'bg-gray-100 cursor-not-allowed pointer-events-none' : 'hover:bg-gray-50 cursor-pointer'
            }`}
        >
            {resource ? (
                <div className="flex items-center justify-between w-full">
                    <ResourceColumn resource={resource}>
                        {typeof children === 'function' ? children({resource}) : children}
                    </ResourceColumn>

                    <div>
                        <ChevronDown className={`${readOnly ? 'opacity-50' : ''}`} />
                    </div>
                </div>
            ) : (
                <div>
                    <div>비어있음</div>
                </div>
            )}
        </div>
    );
};
