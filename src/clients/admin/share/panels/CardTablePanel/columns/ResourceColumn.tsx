import {WithChildren} from '^types/global.type';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {LinkTo, LinkToProps} from '^components/util/LinkTo';

type Dto = {
    id: number;
};

interface ResourceColumnProps<T extends Dto> extends WithChildren {
    resource?: T;
    className?: string;
    href?: LinkToProps['href'];
    onClick?: LinkToProps['onClick'];
    onContextMenu?: LinkToProps['onContextMenu'];
}

export const ResourceColumn = <T extends Dto>(props: ResourceColumnProps<T>) => {
    const {resource, className = '', href, onClick, onContextMenu, children} = props;

    return (
        <LinkTo
            href={href}
            onClick={onClick}
            onContextMenu={(e) => {
                e.preventDefault();
                onContextMenu && onContextMenu(e);
            }}
            className={`flex items-center gap-1 -m-1 p-1 border border-transparent rounded-md transition-all text-13 ${className} ${
                href || onClick ? '!cursor-pointer hover:border-gray-300' : ''
            }`}
        >
            {resource && <TagUI className="bg-gray-200">{resource.id}</TagUI>}
            <div>{children}</div>
        </LinkTo>
    );
};
