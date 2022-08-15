import { useRouter } from "next/router";
import { Icon } from "./Icon";

interface AdminHeaderProps {
  title: string;
  back?: boolean;
  inputSpace?: any;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  title,
  back,
  inputSpace,
}) => {
  const router = useRouter();
  return (
    <div className="sticky top-0 flex h-14 flex-shrink-0 items-center justify-between bg-white px-4 shadow">
      <div className="flex items-center space-x-3 text-lg font-semibold">
        {back && (
          <Icon.ArrowLeft
            className="cursor-pointer"
            onClick={() => router.back()}
          />
        )}
        <div>{title}</div>
      </div>
      {inputSpace}
    </div>
  );
};
