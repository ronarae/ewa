import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Jean} from '../models/Jean';
import {Observable} from 'rxjs';

// @ts-ignore
@Injectable({
    providedIn: 'root'
})
export class SalesSbService {
    public jeans: Jean[];

    constructor(private httpClient: HttpClient) {
        this.jeans = [];
        this.restGetJean().subscribe(
            (data) => {
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < data.length; i++) {
                    this.jeans.push(Jean.trueCopy(data[i]));
                }
            },
            (error) => {
                alert('Error:' + error);
            }
        );
    }

    findAll(): Jean[] {
        return this.jeans;
    }

    findById(productCode: string): Jean {
        return this.jeans.find((x) => x.productCode === productCode);
    }

    save(jeans: Jean): void {
        this.jeans[this.jeans.findIndex((x) => x.productCode === jeans.productCode)] = jeans;
        this.restPutJean(jeans).subscribe((data) => console.log(data));
    }

    deleteById(productcode: string): Jean {
        this.restDeleteJean(productcode);
        const index = this.jeans.findIndex((x) => x.productCode === productcode);
        if (index === -1) {
            return null;
        } else {
            return this.jeans.splice(index, 1)[0];
        }
    }

    private restGetJean(): Observable<Jean[]> {
        return this.httpClient.get<Jean[]>('http://localhost:8085/jeans');
    }

    private restPostJean(jean: Jean): Observable<Jean> {
        return this.httpClient.post<Jean>('http://localhost:8085/jeans', jean);
    }

    private restPutJean(jean: Jean): Observable<Jean> {
        const url = `http://localhost:8085/jeans/${jean.productCode}`;
        return this.httpClient.put<Jean>(url, jean);
    }

    private restDeleteJean(productcode: string): void {
        const url = `http://localhost:8085/jeans/${productcode}`;
        this.httpClient.delete(url);
    }


}
