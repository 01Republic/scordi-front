import {IoFlash} from '@react-icons/all-files/io5/IoFlash';
import React from 'react';
import {ProductDto} from '^models/Product/type';

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
            {/*  <IoFlash /> Connect App*/}
            {/*</button>*/}
        </div>
    );
};
