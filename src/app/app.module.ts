import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SheetComponent } from './sheet/sheet.component';
import { SheetServiceService } from './sheet-service.service';
import { HttpClientModule } from '@angular/common/http'; 
import {NgxPaginationModule} from 'ngx-pagination';
 

@NgModule({
  declarations: [
    AppComponent,
    SheetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,NgxPaginationModule
  ],
  providers: [SheetServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
