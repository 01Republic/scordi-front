import {memo} from 'react';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const TableSkeleton = memo(() => {
    return (
        <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
            <table className="table w-full">
                <thead>
                    <tr className="p-4 bg-slate-100">
                        <th className="w-[300px] rounded-tl-md">
                            <Skeleton height={10} width={48} />
                        </th>
                        <th className="w-[250px]">
                            <Skeleton height={10} width={48} />
                        </th>
                        <th className="w-[250px]">
                            <Skeleton height={10} width={48} />
                        </th>
                        <th className="w-[170px]">
                            <Skeleton height={10} width={48} />
                        </th>
                        <th className="rounded-tr-md">
                            <Skeleton height={10} width={48} />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {[1, 2, 3, 4].map((k) => (
                        <tr key={k}>
                            <td className="flex gap-2 items-center w-[300px]">
                                <Skeleton circle={true} height={32} width={32} />
                                <Skeleton height={10} width={160} />
                            </td>
                            <td className="w-[250px]">
                                <Skeleton height={10} width={96} />
                            </td>
                            <td className="w-[250px]">
                                <Skeleton height={10} width={96} />
                            </td>
                            <td className="w-[170px]">
                                <Skeleton height={10} width={48} />
                            </td>
                            <td>
                                <Skeleton height={10} width={48} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </SkeletonTheme>
    );
});
TableSkeleton.displayName = 'TableSkeleton';
