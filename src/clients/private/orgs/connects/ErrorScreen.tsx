interface ErrorScreenProps {
    errorMsg: string;
    onReset: () => void;
}

export const ErrorScreen = ({errorMsg, onReset}: ErrorScreenProps) => (
    <div className="text-center h-lvh flex flex-col gap-4 items-center justify-center">
        <img src="/images/illustration/error.png" alt="error" className="w-[60px]" />
        <div className="text-2xl font-bold whitespace-pre-line">{errorMsg}</div>
        <button className="btn btn-md btn-scordi w-60" onClick={onReset}>
            이전으로 돌아가기
        </button>
    </div>
);
