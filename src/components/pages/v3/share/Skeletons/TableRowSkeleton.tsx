export const TableRowSkeleton = () => {
    const TableRow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <>
            {TableRow.map(() => (
                <tr>
                    <td className="flex gap-2 items-center">
                        <div className="skeleton !w-10 !h-10 rounded-full" />
                        <div className="skeleton !w-36 border" />
                    </td>
                    <td className="py-5">
                        <div className="skeleton border" />
                    </td>
                    <td className="py-5">
                        <div className="skeleton border" />
                    </td>
                    <td className="py-5">
                        <div className="skeleton border" />
                    </td>
                    <td className="flex gap-2 items-center">
                        <div className="skeleton !w-10 !h-10 rounded-full" />
                        <div className="flex-1 gap-1">
                            <div className="skeleton !w-28 border mb-1" />
                            <div className="skeleton !w-20 border" />
                        </div>
                    </td>
                    <td className="py-5">
                        <div className="skeleton  border !w-10" />
                    </td>
                    <td className="py-5">
                        <div className="skeleton  border !w-28" />
                    </td>
                    <td className="flex gap-2 items-center">
                        <div className="skeleton !w-10 !h-10 rounded-full" />
                        <div className="flex-1 gap-1">
                            <div className="skeleton !w-20 border mb-1" />
                            <div className="skeleton !w-32 border" />
                        </div>
                    </td>
                </tr>
            ))}
        </>
    );
};
