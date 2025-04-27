import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '^public/components/ui/alert-dialog';
import {Info} from 'lucide-react';

interface ConfirmSubscriptionDialogProps {
    onConfirm: () => void;
}

export const ConfirmSubscriptionDialog = ({onConfirm}: ConfirmSubscriptionDialogProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger className="w-full bg-scordi text-white rounded-md py-2 px-3 text-sm">
                반영하기
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white z-[100] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl">
                <AlertDialogHeader>
                    <AlertDialogTitle>연결된 구독을 반영할까요?</AlertDialogTitle>
                    <AlertDialogDescription className="pt-2">
                        최종적으로 반영하기 버튼을 눌러야 구독리스트에 업데이트 돼요.
                        <span className="flex items-center gap-2 bg-scordi-50 rounded-md py-2 px-3 my-3">
                            <Info size={16} />
                            오늘 완료하지 않은 미분류 내역은 반영하기를 눌러도 확인할 수 있어요!
                        </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-200 text-gray-500 w-full h-12">취소</AlertDialogCancel>
                    <AlertDialogAction className="bg-scordi text-white w-full h-12" onClick={onConfirm}>
                        반영하기
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
