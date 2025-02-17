import {ReactComponentLike} from 'prop-types';
import {WithChildren} from '^types/global.type';
import {Paginated} from '^types/utils/paginated.dto';
import {Table} from '^v3/share/table/Table';
import {useRouter} from 'next/router';
import {useEffect} from 'react';

interface ListTableProps<Dto> {
    onReady?: () => any;

    // hook controls
    items: Dto[];
    isLoading?: boolean;
    // reload: () => Promise<any>;
    // orderBy: (sortKey: string, value: ("ASC" | "DESC")) => Promise<any>;

    // Use to prevent truncation of popup components (such as date pickers).
    addBottomPadding?: boolean;

    // Components
    Header?: ReactComponentLike;
    Row: (props: {item: Dto}) => JSX.Element;
}

export const ListTable = <Dto,>(props: ListTableProps<Dto>) => {
    const router = useRouter();
    const {onReady, isLoading, items, addBottomPadding = false} = props;
    const {Header, Row} = props;

    useEffect(() => {
        if (!router.isReady) return;
        if (onReady) onReady();
    }, [router.isReady]);

    return (
        <div className="card bg-white border rounded-md">
            <div className="overflow-x-auto w-full">
                <Table isLoading={isLoading}>
                    {Header && (
                        <thead className="[--rounded-box:0.375rem]">
                            <Header />
                        </thead>
                    )}

                    <tbody className="[--rounded-box:0.375rem]">
                        {items.map((item, i) => (
                            <Row key={i} item={item} />
                        ))}

                        {addBottomPadding && items.length <= 6 && <tr className="h-[400px] w-full"></tr>}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};
ListTable.displayName = 'ListTable';
