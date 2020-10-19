import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { SheetServiceService } from '../sheet-service.service';
import { SheetComponent } from './sheet.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SheetComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SheetComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers : [
        SheetServiceService,HttpClient,HttpHandler
      ]
    }).compileComponents();
  });
  it('app-sheet Component Tested', () => {
    const fixture = TestBed.createComponent(SheetComponent);
   const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});