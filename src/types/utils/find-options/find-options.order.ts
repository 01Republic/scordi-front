type FindOptionsOrderValue =
    | 'ASC'
    | 'DESC'
    | 'asc'
    | 'desc'
    | 1
    | -1
    | {
          direction?: 'asc' | 'desc' | 'ASC' | 'DESC';
          nulls?: 'first' | 'last' | 'FIRST' | 'LAST';
      };

type FindOptionsOrderProperty<Property> = Property extends Promise<infer I>
    ? FindOptionsOrderProperty<NonNullable<I>>
    : Property extends Array<infer I>
    ? FindOptionsOrderProperty<NonNullable<I>>
    : Property extends Function
    ? never
    : Property extends Buffer
    ? FindOptionsOrderValue
    : Property extends Date
    ? FindOptionsOrderValue
    : // : Property extends ObjectID
    // ? FindOptionsOrderValue
    Property extends object
    ? FindOptionsOrder<Property>
    : FindOptionsOrderValue;

export type FindOptionsOrder<Entity> = {
    [P in keyof Entity]?: P extends 'toString' ? unknown : FindOptionsOrderProperty<NonNullable<Entity[P]>>;
};
