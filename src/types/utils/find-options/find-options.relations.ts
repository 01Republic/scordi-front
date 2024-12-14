type PrimitiveType = string | number | undefined | null | boolean | Date | Function;

type RelationPropertyName<T> = {
    [K in keyof T]: T[K] extends PrimitiveType ? never : K;
}[keyof T];

/**
 * 아직 직접적으로 관계정의된 속성만을 식별할 수 있고, 관계된 객체에서 정의하고 있는 속성을 식별하지는 못합니다.
 * 중첩된 키를 가져올 수 있어야 하는데, 아직 중첩된 키에 대한 구현이 완전하지 않습니다.
 *
 * 예를 들면 이런 에러가 생깁니다.
 *
 * Type '"teamMember.membership"' is not assignable to type 'RelationPropertyName<TeamMembershipDto>'.
 *
 *              relations: ['teamMember', 'teamMember.membership'],
 *                                        ~~~~~~~~~~~~~~~~~~~~~~~
 */
export type FindOptionsRelations<T> = RelationPropertyName<T>[];
