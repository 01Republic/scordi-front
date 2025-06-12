export type OmitProp<Type, Key extends keyof Type> = Pick<Type, Exclude<keyof Type, Key>>;

export type RequiredProp<Type, Key extends keyof Type> = Type & {
    [Property in Key]-?: Type[Property];
};

export type NonNullableProp<Type, Key extends keyof Type> = Type & {
    [Property in Key]-?: NonNullable<Type[Property]>;
};

export type PartialProp<Type, Key extends keyof Type> = OmitProp<Type, Key> & Partial<Pick<Type, Key>>;
