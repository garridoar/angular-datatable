import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DatatableDataSource } from './datatable-datasource';
import { BanksService } from '../services/banks.service';
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { Bank } from '../model/bank.model';
import { MatDialog } from '@angular/material/dialog';
import { EditBankTemplateComponent } from '../templates/edit-bank-template/edit-bank-template.component';
import { NotifierService } from "angular-notifier";
import { ConfirmDialogModel } from '../model/confirmDialog.model';
import { ConfirmDialogComponent } from '../templates/confirm-dialog/confirm-dialog.component';
import { NgForm } from '@angular/forms';



@AutoUnsubscribe()
@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<Bank>;
  dataSource: DatatableDataSource;
  banksData: any;
  private readonly notifier: NotifierService;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'actions'];

  constructor(
    private _banksService: BanksService,
    public dialog: MatDialog,
    public notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  };

  ngOnInit() {
    this.dataSource = new DatatableDataSource(this._banksService);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnDestroy(): void { }


  /**
   * Handles all the process to edit an existent bank
   * @param row Data of the selected row
   */
  edit(row: Bank): void {
    const dialogRef = this.dialog.open(EditBankTemplateComponent, {
      data: row,
      position: {
        top: '0',
        right: '0'
      },
      width: '400px',
      height: '100%'
    });

    dialogRef.afterClosed()
      .subscribe(
        resp => {
          if (resp && resp.status) {
            const bankForm: NgForm = resp.bankForm;
            const data: Bank = resp.data;
            if (bankForm.invalid) {
              return;
            }

            console.log(bankForm);
            const updatedBank = new Bank(bankForm.value.name, data.id);
            console.log(updatedBank);

            this._banksService.updateBank(updatedBank).subscribe(
              () => {
                this.notifier.notify("success", "Banco actualizado correctamente");
                // Emits that a bank has been updated
                this._banksService.updateTable();
              },
              err => {
                this.notifier.notify("error", "Error. Intente nuevamente más tarde");
                console.error('Bank hasnt been updated', err);
              }
            );
          }
        }
      )
  }


  /**
   * Initiates the modal, calls the delete service and handles the response
   * @param row  Data of the selected row
   */
  delete(row: Bank): void {
    const dialogData = new ConfirmDialogModel(
      'error_outline',
      'Eliminar banco',
      `Esta seguro que desea borrar el banco ${row.name}?`,
      'Eliminar'
    );

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: 'auto',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log(dialogResult);
      // If user press 'Eliminar'(confirm) button
      if (dialogResult) {
        this._banksService.deleteBank(row.id)
          .subscribe(
            data => {
              this._banksService.updateTable();
              this.notifier.notify("success", "Se ha borrado correctamente el banco");
            },
            error => {
              console.error(error);
              this.notifier.notify("error", 'Error. Intente nuevamente mas tarde');
            }
          );
      }
    });
  }


}
