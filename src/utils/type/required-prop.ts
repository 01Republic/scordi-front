export type RequiredProp<Type, Key extends keyof Type> = Type & {
    [Property in Key]-?: Type[Property];
};

export type NonNullableProp<Type, Key extends keyof Type> = Type & {
    [Property in Key]-?: NonNullable<Type[Property]>;
};
