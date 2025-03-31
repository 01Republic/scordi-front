import {WithChildren} from '^types/global.type';

interface ListFilterProps extends WithChildren {}

export const ListFilter = (props: ListFilterProps) => {
    const {children} = props;

    return <>{children}</>;
};
