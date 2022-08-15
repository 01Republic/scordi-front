import { FC } from "react";
import NumberInput from "../NumberInput";
import { AnimationLayout } from "./ModalAnimationLayout";

interface AddPaymentAmountModalProps {
  open: boolean;
  onClose: () => void;
}

export const AddPaymentAmountModal: FC<AddPaymentAmountModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <AnimationLayout open={open} onClose={onClose}>
      <div className="my-8 w-full max-w-sm transform space-y-3 overflow-hidden rounded-lg bg-white p-6 text-center shadow-xl transition-all">
        <h3 className="text-center text-xl font-semibold">결제금액 입력</h3>
        <NumberInput label={"결제 금액"} suffix={"원"} />
        <p>또는</p>
        <div className="grid h-28 grid-cols-1 place-content-center border border-dashed text-center text-sm text-gray-600">
          인보이스 파일을 드롭해주세요.
        </div>
        <button
          className="btn btn-primary btn-block"
          onClick={() => {
            alert("저장되었습니다.");
            onClose();
          }}
        >
          저장하기
        </button>
      </div>
    </AnimationLayout>
  );
};
