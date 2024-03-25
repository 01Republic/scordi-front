export class QueryUnitDto {
    fo: boolean;
    bo: boolean;
    text: string;
}

export class CreateParserDto {
    serviceName: string;
    searchText: QueryUnitDto;
    resMemberStoreName: QueryUnitDto;
}
