import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IonicPage, ActionSheetController } from 'ionic-angular';
import { ServerConfig } from "../../../providers/config";
import { CommonServices } from '../../../providers/service/common/common.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileService } from '../../../providers/service/file/file.service';
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { UserSessionService } from "../../../providers/service/core/user.session.service";
import { File } from '../../../providers/model/file/model.file';
//import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';

@IonicPage()
@Component({
    selector: 'file-upload',
    template: ' <ion-avatar><span (click)="onClickUploadFile()"> ' +
        '<img class="profile-image" src="assets/img/attachFile.jpg"></span></ion-avatar>',
})
export class FileUploadComponent implements OnInit {


    storageDirectory: string = '';
    filePath: string = ServerConfig.imagePath();
    cameraOptions: CameraOptions;
    @Output() uploadFileDetails = new EventEmitter();

    constructor(private commonServices: CommonServices,
        private camera: Camera,
        private fileService: FileService,
        private actionSheetCtrl: ActionSheetController,
        private session: UserSessionService) {
    }

    ngOnInit() {
        this.cameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth: 350,
            targetHeight: 350,
            sourceType: this.camera.PictureSourceType.CAMERA,
            correctOrientation: true
        };
    }

    onClickUploadFile() {

        /*
        let d=this.fileDetails();
        d.id=35;
        d.name="sss.jpg";
        this.uploadFileDetails.emit(d);
        */
        
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Upload File from',
            buttons: [
                {
                    text: 'Camera',
                    icon: 'camera',
                    handler: () => {
                        this.cameraOptions.sourceType = this.camera.PictureSourceType.CAMERA
                        this.uploadFile(this.cameraOptions);
                    }
                },
                {
                    text: 'Photo Library',
                    icon: 'folder-open',
                    handler: () => {
                        this.cameraOptions.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY
                        this.uploadFile(this.cameraOptions);
                    }
                },
                {
                    text: 'Cancel',
                    icon: 'alert',
                    role: 'cancel',
                    handler: () => {
                    }
                }
            ]
        });
        actionSheet.present();
    }


    uploadFile(cameraOptions: CameraOptions) {

        let fileDetails = this.fileDetails();
        this.camera.getPicture(cameraOptions).then((imageData) => {
            let file = this.prepareImageFile(imageData);
            this.fileService.uploadFile(file,
                this.session.findModule()).subscribe(id => {
                    fileDetails.id = id;
                    fileDetails.name = file.name;
                    this.uploadFileDetails.emit(fileDetails);
                   // this.commonServices.presentToast(id, null, "info");
                }, error => {
                    this.commonServices.presentToast(error, null, "error")
                });
        }, (error) => {
            console.error(error);
        });

    }

    prepareImageFile(imageData: any): File {

        let file = new File();
        file.data = imageData;
        file.name = this.getFileName() + ".jpeg";
        file.contentType = "image/jpeg";

        return file;

    }

    getFileName(): string {

        let timeStamp = moment(new Date()).format("DD-MM-YYYY-HH-mm-ss");
        let random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
        return random + "_" + timeStamp;
    }

    fileDetails(): any {

        let file = {
            id: '',
            name: ''
        }
        return file;
    }

    /*
    fileTransfer(file: File, folder: string): Observable<any> {

        const fileTransfer: FileTransferObject = this.transfer.create();
        let filePath: string = ServerConfig.getPath() + "files/upload/" + folder + "/base64?overwrite=true"
        let response: any = null;
        let options: FileUploadOptions = {
            fileKey: '',
            fileName: '',
            chunkedMode: false,
            mimeType: "image/jpeg",
            headers: {}
        }
        options.fileKey = file.name;
        options.fileName = file.name;;
        fileTransfer.upload(file.data, filePath, options)
            .then((data) => {
                response = data;
            }, (err) => {
                response = err;
            });

        return Observable.create(observer => {
            observer.next(response);
            observer.complete();
        });
    }
    */
}