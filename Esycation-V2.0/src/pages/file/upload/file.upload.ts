import { Component, OnInit } from '@angular/core';
import { IonicPage, ActionSheetController } from 'ionic-angular';
import { ServerConfig } from "../../../providers/config";
import { CommonServices } from '../../../providers/service/common/common.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileService } from '../../../providers/service/file/file.service';
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { UserSessionService } from "../../../providers/service/core/user.session.service";
import { File } from '../../../providers/model/file/model.file';
//import { Observable } from 'rxjs/Rx';
@IonicPage()
@Component({
    selector: 'file-upload',
    template: '<span (click)="onClickUploadFile()">Upload</span>',
})
export class FileUploadComponent implements OnInit {


    storageDirectory: string = '';
    filePath: string = ServerConfig.imagePath();

    cameraOptions: CameraOptions;
    constructor(private commonServices: CommonServices,
        private camera: Camera,
        private fileService: FileService,
        private actionSheetCtrl: ActionSheetController,
        private session: UserSessionService) {

        console.log(this.fileService);
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

        let actionSheet = this.actionSheetCtrl.create({
            title: 'Upload File from',
            buttons: [
                {
                    text: 'Camera',
                    handler: () => {
                        this.cameraOptions.sourceType = this.camera.PictureSourceType.CAMERA
                        this.uploadFile(this.cameraOptions);
                    }
                },
                {
                    text: 'Photo Library',
                    handler: () => {
                        this.cameraOptions.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY
                        this.uploadFile(this.cameraOptions);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                    }
                }
            ]
        });
        actionSheet.present();
    }


    uploadFile(cameraOptions: CameraOptions) {

        this.camera.getPicture(cameraOptions).then((imageData) => {

            this.fileService.uploadFile(this.prepareImageFile(imageData),
                this.session.findModule()).subscribe(data => {
                    this.commonServices.presentToast(data, null, "info");
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
        file.name = "test_" + this.session.findRemote() + ".jpeg";
        file.contentType = "image/jpeg";

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