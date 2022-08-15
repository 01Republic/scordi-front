import React from "react";
import { BetweenText } from "./BetweenText";
import { GrowthText } from "./GrowthText";
import { Label } from "./Label";

export const MonthlyContent = () => {
  return (
    <div className="card_shadow p-5">
      <Label className="text-gray-600" text="이번달 총비용" />

      <div className="mt-0.5 flex items-center justify-between">
        <div className="flex items-end space-x-2 text-gray-600">
          <h2 className="text-3xl font-bold text-gray-900">
            {(222222).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </h2>
          <span>원</span>
        </div>
        <GrowthText
          label="지난달 대비"
          number={15}
          className="font-semibold"
          hasPlusIcon
        />
      </div>

      <div className="mt-4 space-y-1.5">
        <BetweenText
          label="오늘까지 결제된 금액"
          number={13024000}
          className="font-semibold text-black"
        />
        <BetweenText label="남은 결제 금액" number={1224000} />
        <BetweenText label="지난달 총 결제액" number={1224000} />
        <BetweenText label="연간 총 예상 비용" number={1424000} />
      </div>
    </div>
  );
};
