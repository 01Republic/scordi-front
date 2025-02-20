export interface BankAccountAttrSelectPropsType<T> {
    defaultValue?: T;
    onChange?: (option?: T) => any;
    isLoading?: boolean;
}
