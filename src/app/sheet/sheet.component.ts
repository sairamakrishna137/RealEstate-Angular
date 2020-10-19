import { Component, OnInit } from '@angular/core';

import * as XLSX from 'ts-xlsx';
import { LoanInfo } from '../loan-info';
import { ObjectMap } from '../object-map';
import { SheetServiceService } from '../sheet-service.service';

type AOA = any[][];

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.css']
})
export class SheetComponent implements OnInit {
  datacheck: any
  isSpecial:any
  msg: any
  isShowDivIf: any
  noerror: number=0
  counter:number=0
  headerloanInfo: LoanInfo[]=[]
  loanInfokey: LoanInfo[]=[]
  loanObjs=new ObjectMap(0,"");borrowerObj=new ObjectMap(1,"");dateOfBirthObj=new ObjectMap(0,"");propAddressObj=new ObjectMap(1,"");costObj=new ObjectMap(0,"");floodRiskObj=new ObjectMap(1,""); 
  loanErrrormap={loan:this.loanObjs,borrower:this.borrowerObj,dateOfBirth:this.dateOfBirthObj,propAddress:this.propAddressObj,cost:this.costObj,floodRisk:this.floodRiskObj}
  constructor(private sheetService: SheetServiceService) {
  }
  ngOnInit() {
  }

  data: AOA = [[]];
  loanInfo: LoanInfo[];
  fileName: string = 'SheetJS.xlsx';
  arrayBuffer: any;
  tableData: any;
  file: File;
  incomingfile(event: any) {
    this.tableData = null
    this.isShowDivIf = false
    this.file = event.target.files[0];
  }

 /* click on choose file Button 
 Load the file from from and display the Data on UI*/
  onFileChange() {
    this.isShowDivIf = false
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
     
      /* save data */
      this.tableData = <AOA>(XLSX.utils.sheet_to_json(worksheet, { header: 1 }));
      this.Validate();
    }
    if (this.file != null) {
      fileReader.readAsArrayBuffer(this.file);
    }
    else {
      this.isShowDivIf = true
    }
    
  }

   /* click on save data Button 
 Save all the data which is displaying on the UI
 1) get the data from UI
 2) store into the Object
 3) call the spring boot service
 4) save into mysql database*/
  save() {
    console.log("Save data",this.loanInfokey)
    this.sheetService.saveAll(this.loanInfokey).subscribe( suc => {
      this.datacheck=true
      this.msg="Data is Stored Succesfully into DataBase"
      this.isSpecial =true
  },
  err => {
    this.isSpecial =false
    this.datacheck=true
    this.msg="Data is Not Stored into DataBase(Please Check service)"
  });
  }


  Validate(){
    var i = 0;
      for (let index = 0; index < this.tableData.length; index++) {
      var array = this.tableData[index]
      var loanInfos=new LoanInfo(0,"","","",0,"")
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
          if (index == 0) {
            if(!isNaN(element)){
              loanInfos.loanNo = element;
            }else{
              loanInfos.loanNo = element;
              this.noerror=this.noerror+1
              this.loanErrrormap.loan.value="Loan No: Number"
              this.loanErrrormap.loan.key=this.loanErrrormap.loan.key+1
            }
          }
          if (index == 1) {
            if(!isNaN(element)){
              loanInfos.borrower = element;
              this.loanErrrormap.borrower.value="Borrower Name: Text"
              this.loanErrrormap.borrower.key=this.loanErrrormap.borrower.key+1
              this.noerror=this.noerror+1
            }else{
              loanInfos.borrower = element;
            }
          }
          if (index == 2) {
            if(this.isValidDate(element)){
              loanInfos.dateOfBirth = element;
            }else{
              this.loanErrrormap.dateOfBirth.value="DOB: MM/dd/yyyy"
              this.loanErrrormap.dateOfBirth.key=this.loanErrrormap.dateOfBirth.key+1
              this.noerror=this.noerror+1
              loanInfos.dateOfBirth = element;
            }
          }
          if (index == 3) {
            if(!isNaN(element)){
              this.loanErrrormap.propAddress.value="Prop Address: Text"
              this.loanErrrormap.propAddress.key=this.loanErrrormap.propAddress.key+1
              this.noerror=this.noerror+1
              loanInfos.propAddress = element;
            }else{
              loanInfos.propAddress = element;
            }
          }
          if (index == 4) {
            if(!isNaN(element)){
              loanInfos.cost = element;
            }else{
              this.loanErrrormap.cost.value="Cost: Number"
              this.loanErrrormap.cost.key=this.loanErrrormap.cost.key+1
              this.noerror=this.noerror+1
              loanInfos.cost = element;
            }
          }
          if (index == 5) {
            if(!isNaN(element)){
              this.loanErrrormap.floodRisk.value="Flood Risk: Text"
              this.loanErrrormap.floodRisk.key=this.loanErrrormap.floodRisk.key+1
              this.noerror=this.noerror+1
              loanInfos.floodRisk = element;
            }else{
              loanInfos.floodRisk = element;
            }
          }
      }
      if(loanInfos.loanNo==0 || index==0){
        this.headerloanInfo.push(loanInfos)
      }else{
        this.loanInfokey.push(loanInfos)    
      }
    }
    this.tableData.forEach(element => {
      if(element.length==0){
        this.counter=this.counter+1
      }
    });
    if(this.counter==this.tableData.length){
      this.noerror=this.noerror+1
    }
    console.log("Load data",this.tableData)
  }

  isValidDate(dateString)
  {
      // First check for the pattern
      if(!/^\d{1,2}\/\d{1,2}\/\d{2}$/.test(dateString)){
        return false;
      }else{
        return true;
      }
        
  }

}
