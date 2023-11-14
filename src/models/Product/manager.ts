import {BasicManager} from '^models/BasicManager';
import {ProductDto} from '^types/product.type';

export class ProductManager extends BasicManager<ProductDto> {
    findById(id: number) {
        return this.find((product) => product.id === id);
    }
}
