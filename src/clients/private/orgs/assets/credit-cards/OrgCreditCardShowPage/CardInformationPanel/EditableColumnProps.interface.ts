export interface EditableColumnProps<T, IsOptional extends true | false = false> {
    isEditMode: boolean;
    isLoading: boolean;
    value?: T;
    defaultValue?: T;
    onChange: IsOptional extends true ? (value?: T) => any : (value: T) => any;
}
