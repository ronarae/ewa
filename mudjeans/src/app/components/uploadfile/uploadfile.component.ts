import {Component, OnInit} from '@angular/core';
import * as XLSX from 'xlsx';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {FileUploadService} from '../../services/file-upload.service';

// import {type} from 'os';
@Component({
    selector: 'app-uploadfile',
    templateUrl: './uploadfile.component.html',
    styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent implements OnInit {
    data: [][];

    percentCompleted = 0;
    isUploaded = false;
    fileName = '';
    fileType = '';

    constructor(private fileUploadService: FileUploadService) {
    }

    // tslint:disable-next-line:typedef
    readSalesAnalysis(e: any) {
        let docname = (document.getElementById('salesAnalysisInput') as HTMLInputElement).value;
        docname = docname.toLowerCase();
        // Check if the docname contains the "sales" and "analysis"
        if (docname.includes('sales') && docname.includes('analysis')) {
            const target: DataTransfer = (e.target) as DataTransfer;
            if (target.files.length !== 1) {
                throw new Error('Cannot use multiple files');
            }
            const reader: FileReader = new FileReader();
            reader.onload = (event: any) => {
                const bstr: string = event.target.result;
                const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
                const wsname: string = wb.SheetNames[0];
                const ws: XLSX.WorkSheet = wb.Sheets[wsname];
                this.data = (XLSX.utils.sheet_to_json(ws, {header: 1}));
                // Delete first row (empty)
                this.deleteRow(0, this.data, 1);
                for (let i = 0; i < this.data.length; i++) {
                    // delete column C until P
                    this.deleteColumn(i, 2, this.data, 14);
                    // delete column S until W
                    this.deleteColumn(i, 4, this.data, 5);
                }
            };
            reader.readAsBinaryString(target.files[0]);
            this.fileUploadService.uploadWithProgress(this.data);
        } else {
            alert('Uploaded file is not a sale analysis, try again');
        }
    }
    deleteRow(row: number, array: [][], deleteCount: number): void{
        array.splice(row, deleteCount);
    }
    deleteColumn(row: number, column: number, array: [][], deleteCount: number): void{
        array[row].splice(column, deleteCount);
    }
    // tslint:disable-next-line:typedef
    upload(files: File[]) {
        const file = files[0];
        console.log('filename: ' + file.name);
        this.isUploaded = false;
        this.fileName = '';
        this.fileType = '';
        const formData = new FormData();
        formData.append('file', file);
        this.fileUploadService.uploadWithProgress(formData)
            .subscribe(event => {
                if (event.type === HttpEventType.UploadProgress) {
                    this.percentCompleted = Math.round(100 * event.loaded / event.total);
                } else if (event instanceof HttpResponse) {
                    this.isUploaded = true;
                    this.fileName = event.body.fileName;
                    this.fileType = event.body.fileType;
                }
            });
        console.log('END');
    }
    ngOnInit(): void {
    }

}
