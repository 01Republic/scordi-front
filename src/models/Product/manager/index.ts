import {BasicManager} from '^models/BasicManager';
import {ProductDto} from '^models/Product/type';

export class ProductManager extends BasicManager<ProductDto> {
    findById(id: number) {
        return this.find((product) => product.id === id);
    }
}
