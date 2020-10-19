import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SheetServiceService } from './sheet-service.service';
import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoanInfo } from './loan-info';

describe('Sheet Service', () => {

  let sheetService;
  let httpTestingController: HttpTestingController;

  const c = [
    { loanNo: 1, dateOfBirth: 'dateOfBirth',cost:"0",borrower:"borrower", propAddress:"propAddress",floodRisk:"floodRisk"},
    { loanNo: 2, dateOfBirth: 'dateOfBirthk',cost:"0",borrower:"borrower", propAddress:"propAddress",floodRisk:"floodRisk"},
    { loanNo: 3, dateOfBirth: 'dateOfBirth'}] as LoanInfo[];

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [SheetServiceService]
    });
    httpTestingController = TestBed.get(HttpTestingController);

    sheetService = TestBed.get(SheetServiceService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('Excel sheet Service to  be created', () => {
    expect(sheetService).toBeTruthy();
  });

  describe('saveAll', () => {

    it('Tested One Record for the Loan Info of Service..', () => {
      sheetService.saveAll(c).subscribe(
        response => expect(response).toEqual(c),
        fail
      );
      const req = httpTestingController.expectOne(`${sheetService.realEstateUrl}`);
      expect(req.request.method).toEqual('POST');
      req.flush(c);
    });
});
});