import {memo} from 'react';
import {FaChevronRight} from 'react-icons/fa6';
import {LinkTo} from '^components/util/LinkTo';

interface BreadcrumbProps {
    paths: ({text: string; href?: string; active?: boolean} | string)[];
}

export const Breadcrumb = memo((props: BreadcrumbProps) => {
    const {paths = []} = props;

    return (
        <div className="flex items-center gap-2 mb-1 text-14 -mx-1">
            {paths.map((path, i) => (
                <BreadcrumbItem i={i} path={path} key={i} />
            ))}
        </div>
    );
});
Breadcrumb.displayName = 'Breadcrumb';

interface BreadcrumbItemProps {
    i: number;
    path: {text: string; href?: string; active?: boolean} | string;
}

export const BreadcrumbItem = memo((props: BreadcrumbItemProps) => {
    const {i, path} = props;

    const active = typeof path === 'string' ? false : path.active || false;

    return (
        <>
            {i !== 0 && <FaChevronRight fontSize={10} className={`text-gray-500`} />}
            <div key={i} className={`p-1 ${active ? 'text-scordi' : 'text-gray-500'}`}>
                {typeof path === 'string' ? (
                    <span>{path}</span>
                ) : (
                    <LinkTo href={path.href} displayLoading={false}>
                        {path.text}
                    </LinkTo>
                )}
            </div>
        </>
    );
});
BreadcrumbItem.displayName = 'BreadcrumbItem';
