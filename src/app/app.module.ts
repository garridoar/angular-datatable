import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material-module';
import { MainComponent } from './pages/main/main.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { DatatableComponent } from './datatable/datatable.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { GridComponent } from './pages/grid/grid.component';
import { HttpClientModule } from '@angular/common/http';
import { FormfieldComponent } from './formfield/formfield.component';
import { FormsModule } from '@angular/forms';
import { EditBankTemplateComponent } from './templates/edit-bank-template/edit-bank-template.component';
import { NotifierModule } from 'angular-notifier';
import { ConfirmDialogComponent } from './templates/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DatatableComponent,
    GridComponent,
    FormfieldComponent,
    EditBankTemplateComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
            position: "right",
            distance: 12
        },
        vertical: {
            position: "top",
            distance: 12,
            gap: 10
        }
    }
    })
  ],
  entryComponents: [
    EditBankTemplateComponent,
    ConfirmDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
