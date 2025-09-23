// 논리 연산자
export enum LogicalOperator {
    AND = 'and',
    OR = 'or',
}

// 출력
export const t_logicalOperator = (op: LogicalOperator) =>
    ({
        [LogicalOperator.AND]: '및',
        [LogicalOperator.OR]: '또는',
    }[op]);
