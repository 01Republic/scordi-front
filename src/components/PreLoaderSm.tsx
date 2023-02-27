export interface PreLoaderSmProps {
    text?: string;
}

export const PreLoaderSm = (props: PreLoaderSmProps) => {
    const {text} = props;
    return (
        <div className="flex justify-center p-20">
            <button className="btn btn-lg text-white loading bg-primary">{text ?? 'loading'}</button>
        </div>
    );
};
