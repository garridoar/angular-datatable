import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BanksService } from '../services/banks.service';
import { Subscription } from 'rxjs';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-formfield',
  templateUrl: './formfield.component.html',
  styleUrls: ['./formfield.component.scss']
})
export class FormfieldComponent implements OnInit, OnDestroy {

  banksSubscription: Subscription;

  constructor(
    private _banksService: BanksService,
    public notifierService: NotifierService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.banksSubscription.unsubscribe();
  }

  /**
   * Creates a new bank in the database and fires a new event to update the datatable.
   * Template-driven form. If the form is invalid then is never sent.
   * Input 'Name' must be 3+ characters long and can't be empty
   * @param bankForm Bank creation HTML form converted to NgForm
   */
  createNewBank(bankForm: NgForm): void {
    if (bankForm.invalid) {
      return;
    }
    console.log(bankForm);
    const bankName = bankForm.value.name;

    this._banksService.createNewBank(bankName).subscribe(
      resp => {
        this.notifierService.notify('success', 'Banco creado correctamente');
        // Emits that a new bank has been created
        this.banksSubscription = this._banksService.updateTable();
        bankForm.resetForm();
      },
      err => {
        this.notifierService.notify('error', 'Error. Intente nuevamente más tarde');
        console.error('Bank hasnt been created', err);
        bankForm.resetForm();
      }
    )
  }


}
