import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Bank } from '../../model/bank.model';
import { NgForm } from '@angular/forms';
import { BanksService } from '../../services/banks.service';

@Component({
  selector: 'app-edit-bank-template',
  templateUrl: './edit-bank-template.component.html',
  styleUrls: ['edit-bank-template.component.css']
})
export class EditBankTemplateComponent implements OnInit {

  @HostBinding('@.disabled') disabled = true;

  constructor(
    public dialogRef: MatDialogRef<EditBankTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Bank,
    private _banksService: BanksService
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close({
      status: false
    });
  }

  onConfirm(bankForm: NgForm, data: Bank) {
    this.dialogRef.close({
      status: true,
      bankForm,
      data
    });
  }
}
