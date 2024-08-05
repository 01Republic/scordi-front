import React from 'react';
import {BarChart} from './BarChart';
import {Label} from './Label';

export const MonthlyGraphs = () => {
    return (
        <div className="card_shadow p-5">
            <Label className="text-gray-600" text="월 평균 비용" />
            <div className="flex items-end space-x-2 text-gray-600">
                <h2 className="text-3xl font-bold text-gray-900">
                    {(222222).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </h2>
                <p>원</p>
            </div>
            <BarChart />
        </div>
    );
};
