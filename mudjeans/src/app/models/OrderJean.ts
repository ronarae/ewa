import {Order} from "./Order";
import {Jean} from "./Jean";

export class OrderJean {
    order: Order;
    jean: Jean;
    quantity: number;

    constructor(order: Order, jean: Jean, quantity: number) {
        this.order = order;
        this.jean = jean;
        this.quantity = quantity;
    }

    public static trueCopy(orderJean: OrderJean): OrderJean {
        // @ts-ignore
        return (orderJean == null ? null : Object.assign(new OrderJean(), orderJean));
    }
}