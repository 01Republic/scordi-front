import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: '스코디 Scordi - 우리 회사 SaaS 관리, 클릭 하나로 끝내보세요',
    description:
        '스코디는 흩어진 SaaS를 클릭 한 번으로 모으고 결제부터 멤버, 구독, 계정까지 한 곳에서 관리하는 올인원 SaaS 관리 솔루션입니다.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body className="antialiased">{children}</body>
        </html>
    );
}
