import Select, {
    components,
    ContainerProps,
    ControlProps,
    MenuListProps,
    MenuProps,
    SingleValueProps,
} from 'react-select';

export const selectStylesOptions = {
    placeholder: () => ({
        display: 'none',
    }),

    dropdownIndicator: () => ({display: 'none'}),
    indicatorsContainer: () => ({display: 'none'}),
};

export const SelectContainer = (props: ContainerProps<any>) => {
    return (
        <components.SelectContainer {...props} className="">
            {props.children}
        </components.SelectContainer>
    );
};

export const Control = (props: ControlProps<any>) => {
    return (
        <components.Control {...props} className="!border-none !cursor-pointer text-sm">
            {props.children}
        </components.Control>
    );
};
export const Menu = (props: MenuProps<any>) => {
    return (
        <components.Menu {...props} className="!rounded-xl z-[1] py-2 shadow bg-base-100 rounded-box w-48 mt-1 text-sm">
            {props.children}
        </components.Menu>
    );
};

export const MenuList = (props: MenuListProps<any>) => {
    return (
        <components.MenuList {...props}>
            <div className="text-xs text-center text-gray-500 py-2">옵션 선택 또는 생성</div>
            {props.children}
        </components.MenuList>
    );
};

export const SingleValue = (props: SingleValueProps<any>) => {
    return (
        <components.SingleValue {...props}>
            <span className="btn btn-xs btn-outline btn-scordi px-5 font-normal">{props.children}</span>
        </components.SingleValue>
    );
};
