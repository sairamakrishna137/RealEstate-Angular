export class LoanInfo {

     loanNo: number;
    borrower: string;
     dateOfBirth: string;
    propAddress: string;
    cost: number;
    floodRisk: string;

    constructor(loanNo:number, borrower:string, dateOfBirth:string,propAddress:string,cost:number,floodRisk:string){
        this.loanNo = loanNo;
        this.borrower = borrower;
        this.dateOfBirth = dateOfBirth;
        this.propAddress = propAddress;
        this.cost = cost;
        this.floodRisk=floodRisk;
      }
}
