import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Description } from '../../classes/descriptionStore.class';


@Component({
  selector: 'app-contact-description',
  templateUrl: './contact-description.component.html',
  styleUrls: ['../../contact/contact.component.css']
})
export class ContactDescriptionComponent implements OnInit {

  description: Description[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  editarDescription(){

  }

}
