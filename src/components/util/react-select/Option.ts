export abstract class BasicOption {
    abstract value: any;
    abstract label: any;
    __isNew__?: boolean;
}

export interface Option {
    label: any;
    value: any;
    __isNew__?: boolean;
}
