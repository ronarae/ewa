import {Component, OnInit} from '@angular/core';
import * as XLSX from 'xlsx';

// import {type} from 'os';
@Component({
    selector: 'app-uploadfile',
    templateUrl: './uploadfile.component.html',
    styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent implements OnInit {
    data: [][];

    constructor() {
    }

    // tslint:disable-next-line:typedef
    readPOFile(e: any) {
        const target: DataTransfer = (e.target) as DataTransfer;
        if (target.files.length !== 1) {
            throw new Error('Cannot use multiple files');
        }
        const reader: FileReader = new FileReader();
        // tslint:disable-next-line:no-shadowed-variable
        reader.onload = (e: any) => {
            const bstr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
            const wsname: string = wb.SheetNames[0];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];
            this.data = (XLSX.utils.sheet_to_json(ws, {header: 1}));
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < this.data.length; i++) {
                const productcode = this.data[i][0];
                const description = this.data[i][1];
                const fabric = this.data[i][2];
                const size = this.data[i][3];
                const orderfix = this.data[i][4];
                console.log(productcode);
            }
        };
        reader.readAsBinaryString(target.files[0]);
    }

    ngOnInit(): void {
    }

}
