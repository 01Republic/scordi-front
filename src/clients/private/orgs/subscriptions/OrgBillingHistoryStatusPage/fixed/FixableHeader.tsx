import {Pin} from 'lucide-react';

interface FixableHeaderProps {
    Columns: (() => JSX.Element)[];
    setPos?: (pos: number) => any;
}

export const FixableHeader = (props: FixableHeaderProps) => {
    const {Columns, setPos} = props;

    return (
        <>
            {Columns.map((Column, i) => (
                <th key={i} className="group !relative cursor-default !bg-slate-100">
                    <Column />
                    {setPos && (
                        <div className="absolute top-0 bottom-0 right-4 peer-[.text-right]:-right-1 flex items-center justify-center">
                            <div
                                className="my-auto p-1 cursor-pointer hidden group-hover:block text-gray-400 hover:text-black transition-all"
                                onClick={() => setPos(i)}
                            >
                                <Pin />
                            </div>
                        </div>
                    )}
                </th>
            ))}
        </>
    );
};
