import { customersListMockHandlers } from "./mockHandlers/customersMockHandlers";
import { productsListMockHandlers } from "./mockHandlers/productListMockHandler";

export const handlers = [
    ...customersListMockHandlers,
    ...productsListMockHandlers
]