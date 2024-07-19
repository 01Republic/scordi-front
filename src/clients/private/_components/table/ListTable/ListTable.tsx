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

    // Components
    Header?: ReactComponentLike;
    Row: (props: {item: Dto}) => JSX.Element;
}

export const ListTable = <Dto,>(props: ListTableProps<Dto>) => {
    const router = useRouter();
    const {onReady, isLoading, items} = props;
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

                    <tbody>
                        {items.map((item, i) => (
                            <Row key={i} item={item} />
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};
ListTable.displayName = 'ListTable';
