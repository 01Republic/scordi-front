import React from 'react';
import {ProductDto} from '^models/Product/type';
import {Zap} from 'lucide-react';

interface ConnectProfileProps {
    protoApp: ProductDto;
}

export const ConnectProfile = ({protoApp}: ConnectProfileProps) => {
    return (
        <div className="flex flex-col gap-4">
            <img
                src={protoApp.image}
                alt={`${protoApp.nameEn} Logo`}
                width={210}
                height={210}
                className="bg-white rounded-xl p-3 shadow"
            />
            {/*<button className="btn btn-secondary btn-block text-lg gap-2">*/}
            {/*  <Zap /> Connect App*/}
            {/*</button>*/}
        </div>
    );
};
