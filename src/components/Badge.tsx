import React from "react";

enum PaymentCycle {
  YEAR = "매년",
  MONTH = "매월",
  ONETIME = "1회",
}

interface BadgeProps {
  paymentCycle: PaymentCycle;
}

export const Badge: React.FC<BadgeProps> = ({ paymentCycle }) => {
  return (
    <div
      className={`rounded px-2 py-1 text-center font-semibold ${
        paymentCycle === PaymentCycle.YEAR
          ? "bg-pink-50 text-pink-500"
          : paymentCycle === PaymentCycle.MONTH
          ? "bg-yellow-50 text-yellow-500"
          : paymentCycle === PaymentCycle.ONETIME && "bg-blue-50 text-blue-500"
      }`}
    >
      {paymentCycle}
    </div>
  );
};
