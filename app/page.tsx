import Link from 'next/link';
import {redirect} from 'next/navigation';
import {deployEnv} from '^config/environments';

export default function LandingPage() {
    if (deployEnv === 'production') {
        redirect('https://www.scordi.io');
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100">
            <div className="text-center p-8 rounded-lg shadow-lg bg-white">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">
                    Scordi <span className="text-blue-500">({deployEnv})</span>
                </h1>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <Link
                        href="/users/login"
                        className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        로그인
                    </Link>
                    <Link
                        href="https://blog.scordi.io"
                        className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        블로그
                    </Link>
                    <Link
                        href="/products"
                        className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        SaaS 컬렉션
                    </Link>
                </div>
            </div>
        </div>
    );
}
