interface FixedTdGroupProps {
    Columns: (() => JSX.Element)[];
}

export const FixedTdGroup = (props: FixedTdGroupProps) => {
    const {Columns} = props;

    return (
        <td className="sticky left-0 !bg-white p-0 min-w-fit z-10">
            <div className={`w-full flex items-center min-w-max border-r-2`}>
                {Columns.map((Column, i) => (
                    <div key={i} className="p-4 min-w-fit">
                        <Column />
                    </div>
                ))}
            </div>
        </td>
    );
};
