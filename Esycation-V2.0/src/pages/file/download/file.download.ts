import { Component, Input } from '@angular/core';
import { IonicPage, Platform } from 'ionic-angular';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { ServerConfig } from "../../../providers/config";
import { CommonServices } from '../../../providers/service/common/common.service';
import { FileOpener } from '@ionic-native/file-opener';
declare var cordova: any;
@IonicPage()
@Component({
    selector: 'file-download',
    template: '<span (click)="downloadFile()">{{fname}} </span>',
    providers: [Transfer, TransferObject, File]
})
export class FileDownlaodComponent {


    storageDirectory: string = '';
    dwonLoadPath: String = ServerConfig.imagePath();

    @Input()
    public fileId: number = null;

    @Input("fileName")
    public fname: any = null;

    constructor(public platform: Platform, private transfer: Transfer,
        public commonServices: CommonServices,
        private fileOpener: FileOpener) {
        this.platform.ready().then(() => {

            if (!this.platform.is('cordova')) {
                return false;
            }
            if (this.platform.is('ios')) {
                this.storageDirectory = cordova.file.documentsDirectory;
            }
            else if (this.platform.is('android')) {
                this.storageDirectory = cordova.file.externalRootDirectory;
            }
            else {
                return false;
            }
        });
    }


    downloadFile() {

        this.platform.ready().then(() => {
            const fileTransfer: TransferObject = this.transfer.create();
            const dwonLoadPath = this.dwonLoadPath + "" + this.fileId;
            let destinationPath = this.storageDirectory + this.fname;
            fileTransfer.download(dwonLoadPath, destinationPath).then((entry) => {
                if (entry) {
                    // this.commonServices.showAlert("File",JSON.stringify(entry));
                    // entry.getFile(this.storageDirectory, this.fname, false);
                    this.fileOpener.open(destinationPath, 'image/jpeg')
                        .then(() => console.log('File is opened'))
                        .catch(e => console.log('Error openening file', e));
                    //this.commonServices.presentToast("File dwonload successfully", null, "success");
                }
            }, (error) => {
                console.error("Error :", error)
                this.commonServices.presentToast("Something went wrong.", null, "error");
            });

        });
    }

}