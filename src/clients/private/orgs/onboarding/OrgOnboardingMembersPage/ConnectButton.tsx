import {NextImage} from '^components/NextImage';
import {Button} from '^public/components/ui/button';

interface ConnectButtonProps {
    src: string;
    alt: string;
    text: string;
    onClick: () => void;
}

export const ConnectButton = (props: ConnectButtonProps) => {
    const {src, alt, text, onClick} = props;

    return (
        <Button variant="outline" size="xl" className="hover:shadow-md transition-all btn-animation" onClick={onClick}>
            <NextImage src={src} alt={alt} width={20} height={20} loading="lazy" />
            {text}
        </Button>
    );
};
