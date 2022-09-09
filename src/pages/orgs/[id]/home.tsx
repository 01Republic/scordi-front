import { useState } from "react";
import { AdminHeader } from "^components/AdminHeader";
import { Badge } from "^components/Badge";
import { GrowthText } from "^components/GrowthText";
import { AddPaymentAmountModal } from "^components/modal/AddPaymentAmountModal";
import { EditServiceModal } from "^components/modal/EditServiceModal";
import { ServiceModal } from "^components/modal/ServiceModal";
import { MonthlyContent } from "^components/MonthlyContent";
import { MonthlyGraphs } from "^components/MonthlyGraphs";
import { useRouter } from "next/router";
import { getOrgMainLayout } from '^layouts/org/mainLayout';
import { PageRoute } from '^types/pageRoute.type';

const tableLabel = [
  "제품",
  "요금제명",
  "주기",
  "다음 결제일",
  "이용자 수",
  "결제 비용",
  "전달 대비",
  "관리",
  "액션",
];

const itemDummy = [
  { id: 1, src: "https://source.unsplash.com/random", name: "notion" },
  { id: 2, src: "https://source.unsplash.com/random", name: "notion" },
  { id: 3, src: "https://source.unsplash.com/random", name: "notion" },
  { id: 4, src: "https://source.unsplash.com/random", name: "notion" },
  { id: 5, src: "https://source.unsplash.com/random", name: "notion" },
];

enum PaymentCycle {
  YEAR = "매년",
  MONTH = "매월",
  ONETIME = "1회",
}

export const OrgHomeRoute: PageRoute = {
  pathname: '/orgs/[id]/home',
  path: (orgId: number) => OrgHomeRoute.pathname.replace('[id]', String(orgId)),
}

export default function HomePage() {
  const router = useRouter();
  const organizationId = Number(router.query.id);
  const [addService, setAddService] = useState<boolean>(false);
  const [payment, setPayment] = useState<boolean>(false);
  const [editService, setEditService] = useState<boolean>(false);
  const servieItem = itemDummy[0];

  return (
    <>
      <ServiceModal open={addService} onClose={() => setAddService(false)} />
      <AddPaymentAmountModal open={payment} onClose={() => setPayment(false)} />
      <EditServiceModal
        open={editService}
        onClose={() => setEditService(false)}
        item={servieItem}
      />
      <div className="grid grid-cols-2 gap-5 p-4">
        <MonthlyGraphs />
        <MonthlyContent />
      </div>

      <div className="m-5 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h2 className="text-24 font-semibold">월별 결제</h2>

            <select className="select">
              <option disabled selected>
                Pick your favorite Simpson
              </option>
              <option>2022년 7월</option>
              <option>2022년 8월</option>
              <option>2022년 9월</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <button className="btn btn-outline h-10">엑셀 내보내기</button>
            <button
              className="btn btn-primary h-10"
              onClick={() => setAddService(true)}
            >
              +고정지출 추가
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
            <tr>
              {tableLabel.map((e) => (
                <th className="text-gray-600">{e}</th>
              ))}
            </tr>
            </thead>
            <tbody>
            {/* row 1 */}
            <tr>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://source.unsplash.com/random"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Hart Hagerty</div>
                  </div>
                </div>
              </td>
              <td>요금제명</td>
              <td>
                <Badge paymentCycle={PaymentCycle.YEAR} />
              </td>
              <td>
                15일 남음
                <br />
                <span className="text-sm text-gray-500">
                    6월 23일 결제예정
                  </span>
              </td>
              <td>
                {(10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}명
              </td>
              <td>
                {/* 결제 완료시 */}
                {/* <p>{(156000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    원</p> */}

                {/* 결제 전 */}
                <p
                  className="cursor-pointer text-gray-500"
                  onClick={() => setPayment(true)}
                >
                  {(156000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원 (결제전)
                </p>
              </td>
              <td>
                <GrowthText number={15} />
                <span className="text-sm text-gray-500">
                    {(156000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
              </td>
              <td>연동(준비중)</td>
              <th>
                <button
                  onClick={() => setEditService(true)}
                  className="btn btn-ghost btn-xs"
                >
                  Edit
                </button>
              </th>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

HomePage.getLayout = getOrgMainLayout;
