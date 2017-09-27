/**
 * Imports
 */
import AccountAPI from './account';
import CartsAPI from './carts';
import CheckoutsAPI from './checkouts';
import CollectionsAPI from './collections';
import ContentsAPI from './contents';
import CustomersAPI from './customers';
import GroupMedianoAPI from './groupMediano';
import GroupChicoAPI from './groupChico';
import GroupGrandeAPI from './groupGrande';
import FilesAPI from './files';
import OrdersAPI from './orders';
import ProductsAPI from './products';

/**
 * Main API wrapper that provides access to all the available resources
 */
class API {
    constructor({options, getAuthToken}) {
        this.account = new AccountAPI({options: options.atlas, getAuthToken});
        this.cart = new CartsAPI({options: options.atlas, getAuthToken});
        this.checkouts = new CheckoutsAPI({options: options.atlas, getAuthToken});
        this.collections = new CollectionsAPI({options: options.atlas, getAuthToken});
        this.contents = new ContentsAPI({options: options.atlas, getAuthToken});
        this.groupChico = new GroupChicoAPI({options: options.atlas, getAuthToken});
        this.groupMediano = new GroupMedianoAPI({options: options.atlas, getAuthToken});
        this.groupGrande = new GroupGrandeAPI({options: options.atlas, getAuthToken});
        this.customers = new CustomersAPI({options: options.atlas, getAuthToken});
        this.files = new FilesAPI({options: options.atlas, getAuthToken});
        this.orders = new OrdersAPI({options: options.atlas, getAuthToken});
        this.products = new ProductsAPI({options: options.atlas, getAuthToken});
    }
}

/**
 * Export
 */
export default API;
