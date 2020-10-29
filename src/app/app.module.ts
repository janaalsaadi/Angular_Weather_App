import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HeaderComponent} from './header/header.component';
import { AppComponent } from './app.component';
import {HomeComponent} from './home/home.component';
import {HomeService} from './shared/home.service';
import { HttpClientModule } from '@angular/common/http';
import{DailyComponent} from './dialy/daily.component';
import { ChartsModule } from 'ng2-charts';
import {MatDialogModule} from "@angular/material/dialog";
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DailyComponent,
 
  
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule,ChartsModule,MatDialogModule ],
  providers: [HomeService],
  bootstrap: [AppComponent]
})
export class AppModule {}
