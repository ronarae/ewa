import {Jean} from "./Jean";

export class OrderJean {
    jean: Jean;
    quantity: number;

    constructor(jean: Jean, quantity: number) {
        this.jean = jean;
        this.quantity = quantity;
    }

    public static trueCopy(orderJean: OrderJean): OrderJean {
        // @ts-ignore
        return (orderJean == null ? null : Object.assign(new OrderJean(), orderJean));
    }
}
