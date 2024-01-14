import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {Loading} from '^v3/share/Loading';

interface TBodyProps extends WithChildren {
    entries: any[];
    cols: number;
    isLoading?: boolean;
}

export const TBody = memo((props: TBodyProps) => {
    const {entries, cols, isLoading = false, children} = props;

    return (
        <tbody>
            {!entries.length && isLoading && (
                <tr>
                    <td colSpan={cols}>
                        <div className="w-full flex items-center justify-center">
                            <Loading size="8" />
                        </div>
                    </td>
                </tr>
            )}
            {children}
        </tbody>
    );
});
TBody.displayName = 'TBody';
