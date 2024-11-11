import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {ReactComponentLike} from 'prop-types';
import {Table} from '^v3/share/table/Table';

interface List2TableProps<Dto> {
    className?: string;
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

export const ListTable2 = <Dto,>(props: List2TableProps<Dto>) => {
    const router = useRouter();
    const {className = '', onReady, isLoading, items} = props;
    const {Header, Row} = props;

    useEffect(() => {
        if (!router.isReady) return;
        if (onReady) onReady();
    }, [router.isReady]);

    return (
        <div className={`${className}`}>
            <div className="overflow-x-auto w-full">
                <Table isLoading={isLoading}>
                    {Header && (
                        <thead>
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
ListTable2.displayName = 'ListTable2';
