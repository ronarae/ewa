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
                console.log('DATA: ' + data.length);
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < data.length; i++) {
                    this.jeans.push(Jean.trueCopy(data[i]));
                }
                console.log('Jean length: ' + this.jeans.length);
                console.log(data[0]);
            },
            (error) => {
                alert('Error:' + error);
            }
        );
    }

    findAll(): Jean[] {
        console.log('Jean length in function: ' + this.jeans.length);
        return this.jeans;
    }

    findById(productCode: string): Jean {
        return this.jeans.find((x) => x.productCode === productCode);
    }

    save(jeans: Jean): void {
        const id = this.jeans.findIndex((x) => x.productCode === jeans.productCode);
        // jean not found
        if (id === -1) {
            this.jeans.push(jeans);
            this.restPostJean(jeans).subscribe((data) => console.log(data));
        } else {
            this.jeans[id] = jeans;
            this.restPutJean(jeans).subscribe((data) => console.log(data));
        }
    }


    deleteById(productcode: string): Jean {
        this.restDeleteJean(productcode).subscribe(() => {console.log('deleted'); });
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
        const url = `http://localhost:8085/jeans/`;
        return this.httpClient.put<Jean>(url, jean);
    }

    private restDeleteJean(productcode: string): Observable<any> {
        const url = `http://localhost:8085/jeans/${productcode}`;
        return this.httpClient.delete(url);
    }


}
