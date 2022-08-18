import { FC } from "react";
import { Icon } from "../Icon";
import PaymentNumberInput from "../PaymentNumberInput";
import { Select } from "../Select";
import { AnimationLayout } from "./ModalAnimationLayout";

interface Item {
  id: number;
  src: string;
  name: string;
}

interface EditServiceModalProps {
  open: boolean;
  onClose: () => void;
  item: Item;
}

export const EditServiceModal: FC<EditServiceModalProps> = ({
  open,
  onClose,
  item,
}) => {
  return (
    <AnimationLayout open={open} onClose={onClose}>
      <div className="my-8 w-full max-w-md transform space-y-3 overflow-hidden rounded-lg bg-white p-6 text-center shadow-xl transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img src={item.src} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{item.name}</div>
            </div>
          </div>
          <Icon.X onClick={onClose} className="cursor-pointer" />
        </div>

        <Select className="select">
          <option>월 정기결제</option>
          <option>연 정기결제</option>
        </Select>

        <Select label="결제 일자">
          <option>매월 25일</option>
        </Select>

        <Select label="청구 방식">
          <option>매월 다름 (종량제)</option>
          <option>매월 같음 (정액제)</option>
        </Select>

        <Select label="언제 결제하나요?">
          <option>선택1</option>
          <option>선택2</option>
        </Select>

        <Select label="결제 내역">
          <option>2022년</option>
          <option>2023년</option>
        </Select>

        <div className="h-52 space-y-3 overflow-y-auto">
          <PaymentNumberInput suffix={"원"} value={420} month="1월" />
        </div>

        <div className="flex items-center justify-end space-x-3">
          <button className="btn btn-outline btn-error">이 앱 삭제하기</button>
          <button
            className="btn btn-primary"
            onClick={() => {
              alert("저장되었습니다.");
              onClose();
            }}
          >
            저장하기
          </button>
        </div>
      </div>
    </AnimationLayout>
  );
};
