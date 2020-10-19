import { LoanInfo } from './loan-info';

describe('LoanInfo', () => {
  it('should create an instance of LoanInfo', () => {
   expect(new LoanInfo(0,"test","test","test",0,"test")).toBeTruthy();
  });
});
