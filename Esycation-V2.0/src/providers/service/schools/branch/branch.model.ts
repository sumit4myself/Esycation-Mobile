export class Branch {
  id: number = null;
  name: string = null;
  code: string = null;
  contactDetailsId: ContactDetails = new ContactDetails();
}

export class ContactDetails {
  id: number = null;
  phoneNumber1: any = null;
  addressLine1: string = null;
  city: string = null;
  state: string = null;
  pinCode: number = null;
}
