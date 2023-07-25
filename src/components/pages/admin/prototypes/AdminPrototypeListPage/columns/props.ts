import {ApplicationPrototypeDto, FindAllAppPrototypeQuery} from '^types/applicationPrototype.type';

export interface ColumnProps {
    prototype: ApplicationPrototypeDto;
    fetchData?: (params: FindAllAppPrototypeQuery) => any;
}
