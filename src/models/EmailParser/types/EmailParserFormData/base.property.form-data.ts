import {SelectedProperty} from './selected-property.enum';

export class BasePropertyFormData {
    selectedProperty: SelectedProperty;
    pattern: {value: string; captureIndex: number};
}
