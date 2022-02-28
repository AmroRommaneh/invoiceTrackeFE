import { User } from "./User";

export interface Invoice{


     invoiceId : number;
    userId : number ;
    dateOfCreation : Date;
    amount:number;
    externalInvoiceId :number;
    user :User;
    
}