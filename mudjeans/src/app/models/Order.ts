import {Jean} from "./Jean";

export class Order {
    idOrder: number;
    note: string;
    date: Date;
    idUser: string;
    status: string;
    idReviewer: number;
    jeansArray: Jean[];

    constructor(idOrder: number, note: string, date: Date, idUser: string, status: string, idReviewer: number) {
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
    public addJean(jean: Jean): void {
        this.jeansArray.push(jean);
    }

}