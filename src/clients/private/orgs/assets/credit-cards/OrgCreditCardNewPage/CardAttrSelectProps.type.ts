export interface CardAttrSelectPropsType<T> {
    defaultValue?: T;
    onChange?: (option?: T) => any;
    isLoading?: boolean;
}
