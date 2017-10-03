import {PageMetadata} from '../common/PageMetadata'

export class PagedResponse {
    
        public contents:any[];
        public metadata:PageMetadata;

        constructor(){

        }

    public static getInstance():PagedResponse{
            return new PagedResponse();
    }    
}   