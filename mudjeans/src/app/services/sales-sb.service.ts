import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Jean} from '../models/Jean';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {ToastrService} from "ngx-toastr";

// @ts-ignore
@Injectable({
    providedIn: 'root'
})
export class SalesSbService {
    public readonly BACKEND_URL = environment.apiUrl + "/jeans";

    public jeans: Jean[];

    constructor(private httpClient: HttpClient, private toastr: ToastrService) {
        this.jeans = [];
        this.restGetJean().subscribe(
            (data) => {
                console.log('DATA: ' + data.length);
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < data.length; i++) {
                    this.jeans.push(Jean.trueCopy(data[i]));
                }
            },
            (error) => {
                this.toastr.error(error.error);
            }
        );
    }

    findAll(): Jean[] {
        // console.log('Jean length in function: ' + this.jeans.length);
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

    public restGetJean(): Observable<Jean[]> {
        return this.httpClient.get<Jean[]>(this.BACKEND_URL);
    }

    private restPostJean(jean: Jean): Observable<Jean> {
        return this.httpClient.post<Jean>(this.BACKEND_URL, jean);
    }

    private restPutJean(jean: Jean): Observable<Jean> {
        const url = this.BACKEND_URL;
        return this.httpClient.put<Jean>(url, jean);
    }

    private restDeleteJean(productcode: string): Observable<any> {
        const url = `${this.BACKEND_URL}/${productcode}`;
        return this.httpClient.delete(url);
    }


}
