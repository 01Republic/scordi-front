import {FormControl as FormControl2} from './FormControl';
import {RequiredFormControl as Required2} from './RequiredFormControl';

import {TopLeftLabel, RequiredTopLeftLabel} from './TopLeftLabel';
import {BottomLeftHint} from './BottomLeftHint';

export const FormControl = Object.assign(FormControl2, {
    TopLeftLabel,
    BottomLeftHint,
});

export const RequiredFormControl = Object.assign(Required2, {
    RequiredTopLeftLabel,
    BottomLeftHint,
});
