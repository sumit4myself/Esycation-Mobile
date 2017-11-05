export interface ProfileInterface{

	id:number;
    module:string;
    name:string;
    imageId:string;
    dob:string;
	address1:string;
	address2:string;
	city:string;
	state:string;
	pinCode:number;
	bloodGroup:string;
	mobile:string;
	email:string;
	gender:string;
	adharNumber:number;
	inTime:string;
	outTime:string;
}

export class Profile implements ProfileInterface{

    id:number=null;
    module:string=null;
    name:string=null;
    imageId:string=null;
    dob:string=null;
	address1:string=null;
	address2:string=null;
	city:string=null;
	state:string=null;
	pinCode:number=null;
	bloodGroup:string=null;
	mobile:string=null;
	email:string=null;
	gender:string=null;
	inTime:string=null;
	outTime:string=null;
	adharNumber:number=null;

	constructor(){}

	public static getInstance():Profile{
		return new Profile();
	}
	
}