import {OrderJean} from "./OrderJean";

export class Order {
    idOrder: number;
    note: string;
    date: Date;
    idUser: string;
    status: string;
    idReviewer: string;
    jeansArray: OrderJean[];

    constructor(idOrder: number, note: string, date: Date, idUser: string, status: string, idReviewer: string) {
        this.idOrder = idOrder;
        this.note = note;
        this.date = date;
        this.idUser = idUser;
        this.status = status;
        this.idReviewer = idReviewer;
        this.jeansArray = [];
    }

    public static trueCopy(order: Order): Order {
        // @ts-ignore
        return (order == null ? null : Object.assign(new Order(), order));
    }

    // tslint:disable-next-line:typedef
    public addJean(orderJean: OrderJean): void {
        this.jeansArray.push(orderJean);
}

}
