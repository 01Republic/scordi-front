export function applyPropertyDecorators(...items: PropertyDecorator[]): PropertyDecorator {
    return (object, propertyName) => {
        items.forEach((item) => {
            item(object, propertyName);
        });
    };
}
