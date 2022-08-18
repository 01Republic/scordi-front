import React, { useState } from "react";
import { Icon } from "../../../components/Icon";
import { Label } from "../../../components/Label";
import { TextField } from "../../../components/TextField";

interface AddServiceProps {
  GoBack: () => void;
  SetPayment: () => void;
}

export const AddService: React.FC<AddServiceProps> = ({
  GoBack,
  SetPayment,
}) => {
  const [imgPath, setImaPath] = useState<File | null | undefined>();

  return (
    <div className="space-y-4">
      <div className="space-y-0.5">
        <div className="flex items-center space-x-2">
          <Icon.ArrowLeft onClick={GoBack} className="cursor-pointer" />
          <h3 className="text-xl font-semibold">서비스 선택</h3>
        </div>
        <p className="text-sm text-gray-600">
          아직 자동으로 결제 정보를 불러오지 못하는 서비스에요.
          <br />
          서비스를 수동으로 등록해 주시면, 빠르게 추가할게요.
        </p>
      </div>

      <div className="space-y-3 overflow-y-auto pb-4">
        <TextField
          label="서비스명 *"
          placeholder="서비스명을 입력해주세요."
          labelClassname="py-0"
        />
        <div className="space-y-5">
          <Label text="서비스 아이콘 (선택)" />
          <label htmlFor="imgPath">
            {!imgPath && (
              <div className="w-32 h-32 grid place-items-center rounded border text-gray-500">
                <div className="flex flex-col items-center space-y-2 text-center text-xs">
                  <Icon.FileUpload className="w-8 h-8" />
                  <p>
                    이미지를
                    <br />
                    업로드해주세요.
                  </p>
                </div>
              </div>
            )}

            {imgPath && (
              <>
                <div className="w-32 h-32 relative overflow-hidden rounded-md">
                  <img
                    className="absolute h-full w-full object-cover"
                    src={URL.createObjectURL(imgPath) || ""}
                    alt=""
                  />
                </div>
              </>
            )}
          </label>
          <input
            type="file"
            id="imgPath"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              e.target.validity.valid && setImaPath(e.target.files?.item(0));
            }}
          />
        </div>

        <TextField
          label="홈페이지 주소 (선택)"
          placeholder="홈페이지 주소를 입력해주세요."
          labelClassname="py-0"
        />

        <button className="btn btn-primary w-full" onClick={SetPayment}>
          다음
        </button>
      </div>
    </div>
  );
};
