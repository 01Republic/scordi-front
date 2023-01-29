import React, {memo, ReactNode} from 'react';
import {WithChildren} from '^types/global.type';

type ContentTableProps = {
    thead: ReactNode;
} & WithChildren;

export const ContentTable = memo((props: ContentTableProps) => {
    const {thead, children} = props;

    return (
        <div className={`ContentLayout--ContentTable overflow-x-auto`}>
            <table className="table w-full">
                <thead>{thead}</thead>
                <tbody>{children}</tbody>
                {/*<tfoot>fds</tfoot>*/}
            </table>
        </div>
    );
});
