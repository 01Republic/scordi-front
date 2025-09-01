import {PinOff} from 'lucide-react';
import React from 'react';

interface FixedHeaderProps {
    Columns: (() => JSX.Element)[];
    setPos?: (pos: number) => any;
}

export const FixedHeader = (props: FixedHeaderProps) => {
    const {Columns, setPos} = props;

    return (
        <th className="!bg-slate-100 p-0 !z-10">
            <div className={`w-full flex items-center min-w-max border-r-2`}>
                {Columns.map((Column, i) => (
                    <div key={i} className="p-4 text-start min-w-fit group relative cursor-default">
                        <Column />
                        {setPos && (
                            <div className="absolute top-0 bottom-0 right-4 peer-[.text-right]:-right-1 flex items-center justify-center">
                                <div
                                    className="my-auto p-1 cursor-pointer hidden group-hover:block text-gray-400 hover:text-black transition-all"
                                    onClick={() => setPos(i)}
                                >
                                    <PinOff />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </th>
    );
};
