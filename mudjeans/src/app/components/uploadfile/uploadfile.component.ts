import {Component, OnInit} from '@angular/core';
import * as XLSX from 'xlsx';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {FileUploadService} from '../../services/file-upload.service';
import {ToastrService} from "ngx-toastr";

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

    constructor(private fileUploadService: FileUploadService, private toastr: ToastrService) {
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
                    this.toastr.success("File uploaded succesfully");
                }
            });
    }

    ngOnInit(): void {}

}

