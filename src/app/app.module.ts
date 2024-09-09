import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SchoolService } from './service/school.service';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [SchoolService],
  bootstrap: [],
})
export class AppModule {}
