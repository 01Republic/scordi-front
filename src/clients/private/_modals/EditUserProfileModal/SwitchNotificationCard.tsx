interface SwitchNotificationCardProps {
    label: string;
    content: string;
    onSwitch: () => void;
    checked: boolean;
}

const SwitchNotificationCard = (props: SwitchNotificationCardProps) => {
    const {label, content, onSwitch, checked} = props;

    const handleChangeSwitch = () => {
        onSwitch();
    };

    return (
        <div className="rounded-2xl border border-stroke-gary p-4 flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <span className="text-14 font-medium">{label}</span>
                <input type="checkbox" className="toggle" onChange={handleChangeSwitch} checked={checked} />
            </div>
            <p className="text-12 text-gray-400">{content}</p>
        </div>
    );
};

export default SwitchNotificationCard;
