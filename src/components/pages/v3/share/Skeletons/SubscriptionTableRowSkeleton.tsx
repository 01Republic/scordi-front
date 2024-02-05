export const SubscriptionTableRowSkeleton = () => {
    const TableRow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <>
            {TableRow.map((i) => (
                <tr key={i}>
                    <td className="flex gap-2 items-center w-60">
                        <div className="skeleton !w-8 !h-8 rounded-full" />
                        <div className="skeleton !w-40" />
                    </td>
                    <td className="py-5 !w-10">
                        <div className="skeleton" />
                    </td>
                    <td className="py-5 !w-10">
                        <div className="skeleton" />
                    </td>
                    <td className="py-5 !w-10">
                        <div className="skeleton" />
                    </td>
                    <td className="flex gap-2 items-center w-40">
                        <div className="skeleton !w-8 !h-8 rounded-full" />
                        <div className="flex-1 gap-1">
                            <div className="skeleton mb-1" />
                            <div className="skeleton !w-10" />
                        </div>
                    </td>
                    <td className="py-5">
                        <div className="skeleton" />
                    </td>
                    <td className="py-5">
                        <div className="skeleton" />
                    </td>
                    <td className="flex gap-2 items-center w-40">
                        <div className="skeleton !w-8 !h-8 rounded-full" />
                        <div className="flex-1">
                            <div className="skeleton !w-10 mb-1" />
                            <div className="skeleton" />
                        </div>
                    </td>
                </tr>
            ))}
        </>
    );
};
