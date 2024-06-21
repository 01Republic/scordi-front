export interface ListTableHeaderProps {
    orderBy: (sortKey: string, value: 'ASC' | 'DESC') => Promise<any>;
}
