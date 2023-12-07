import {MemoExoticComponent} from 'react';
import {Group} from './Group';
import {Button} from './Button';
import {ButtonGroupRadio as ButtonGroupRadio2, ButtonGroupRadioProps} from './ButtonGroupRadio';

const ButtonGroupRadio3 = <V extends unknown>(props: ButtonGroupRadioProps<V>) => {
    const Component = ButtonGroupRadio2 as MemoExoticComponent<(props: ButtonGroupRadioProps<V>) => JSX.Element>;
    return <Component {...props} />;
};

export const ButtonGroupRadio = Object.assign(ButtonGroupRadio3, {
    Group,
    Button,
});
