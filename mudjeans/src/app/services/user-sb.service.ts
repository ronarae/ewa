import {Injectable} from '@angular/core';
import {User} from "../models/User";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Jean} from "../models/Jean";
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserSbService {
    public readonly BACKEND_URL = environment.apiUrl + "/users";
    public users: User[];

    constructor(private httpClient: HttpClient) {
        this.users = [];
        this.restGetUser().subscribe(
            (data) => {
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < data.length; i++) {
                    this.users.push(User.trueCopy(data[i]));
                }
            },
            (error) => {
                alert('Error:' + error);
            }
        );
    }

    findAll(): User[] {
        return this.users;
    }

    deleteById(id: number) {
        this.restDeleteUser(id).subscribe(() => {console.log('deleted'); });
        const index = this.users.findIndex((x) => x.id === id);
        if (index === -1) {
            return null;
        } else {
            return this.users.splice(index, 1)[0];
        }
    }

    save(user: User) {
        const id = this.users.findIndex((x) => x.id === user.id);
        // jean not found
        if (id === -1) {
            // user.id = this.findAll()[this.findAll().length - 1].id + 1;
            this.users.push(user);
            this.restPutUser(user).subscribe((data) => console.log(data));
        } else {
            this.users[id] = user;
            this.restPutUser(user).subscribe((data) => console.log(data));
        }
    }

    public restGetUser(): Observable<User[]> {
        return this.httpClient.get<User[]>(this.BACKEND_URL);
    }

    private restPutUser(user: User): Observable<User> {
        return this.httpClient.post<User>(this.BACKEND_URL, user);
    }

    private restDeleteUser(id: number): Observable<any> {
        const url = `${this.BACKEND_URL}/${id}`;
        return this.httpClient.delete(url);
    }
}
