import "../styles/globals.css";
import "../styles/index.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SHOW_SIDEBAR_ROUTES } from "./routes";
import { useRouter } from "next/router";
import Building from "../../public/svg/building.svg";
import Check from "../../public/svg/check-fill.svg";
import People from "../../public/svg/people.svg";
import { Sidebar } from "../components/Sidebar";

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  return (
    <>
      <Head>
        <title>Payplo | 똑똑한 팀을 위한 SaaS 관리 솔루션</title>
      </Head>
      <div className="flex h-screen">
        {SHOW_SIDEBAR_ROUTES.includes(pathname) && (
          <Sidebar className="flex-shrink-0">
            <Sidebar.Title>payflow</Sidebar.Title>
            <Sidebar.Menu>
              <Sidebar.Menu.Item
                text="구독 내역"
                to="/home"
                icon={
                  <Check
                    className={
                      pathname === "/home" ? "fill-current text-gray-900" : ""
                    }
                  />
                }
              />
              <Sidebar.Menu.Item
                text="회사 정보"
                icon={<Building />}
                onClick={() => alert("준비중입니다.")}
              />
              <Sidebar.Menu.Item
                text="구성원 관리"
                icon={<People />}
                onClick={() => alert("준비중입니다.")}
              />
              <Sidebar.Menu.Item
                text="내 정보 수정"
                onClick={() => alert("준비중입니다.")}
              />
              <Sidebar.Menu.Item text="로그아웃" />
            </Sidebar.Menu>
          </Sidebar>
        )}
        <div className="flex-1 overflow-x-auto">
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}

export default MyApp;
