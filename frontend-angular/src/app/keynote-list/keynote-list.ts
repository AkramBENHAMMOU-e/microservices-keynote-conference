import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {KeynotesService} from '../services/keynotes.service';
import {NgForOf,CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NewKeynote} from '../new-keynote/new-keynote';
import {Keynote} from '../models/Keynote';


@Component({
  selector: 'app-keynote-list',
  imports: [
    NgForOf, CommonModule, FormsModule, NewKeynote
  ],
  standalone: true,
  templateUrl: './keynote-list.html',
  styleUrl: './keynote-list.css',
})
export class KeynoteList implements OnInit{

  keynotes : Array<any> = [];
  keynoteList : Array<any> = [];
  keyword: any;
  selectedKeynote : boolean = false;
  editKeynote! : Keynote;

  constructor(private keynoteService : KeynotesService) {
  }

  ngOnInit(){
    this.getAllKeynotes();
  }

  getAllKeynotes(){
    this.keynoteService.getAllKeynotes().subscribe({
      next : data => {
        this.keynotes = data;
        this.keynoteList = data;
      },
      error : err => console.error(err)
    })
  }

  searchKeynote() {
    if (!this.keynoteList || this.keynoteList.length === 0) {
      return; // Empêche d'écraser la liste avant chargement
    }

    if (!this.keyword.trim()) {
      this.keynotes = [...this.keynoteList];
      return;
    }

    const lower = this.keyword.toLowerCase();
    this.keynotes = this.keynoteList.filter(keynote =>
      keynote.name?.toLowerCase().includes(lower)
    );
  }


  deleteKeynote(keynote: any) {

    this.keynoteService.deleteKeynote(keynote).subscribe({
      next : data => {
        this.keynotes = this.keynotes.filter(k => k !== keynote);
      }
      , error : err => alert("Impossible de supprimer ce Keynote")
    })

  }

  closeModal(){
    this.selectedKeynote = false;
  }

  openNewKeynote() {
    this.selectedKeynote = true;
  }

  onKeynoteAdded(keynote: any) {
    const index = this.keynotes.findIndex(k => k.id === keynote.id);
    if (index === -1) { //si le keynote n'existe pas alors indice => -1
      //Operation d'ajout
      this.keynotes.push(keynote);
    }
    else{
      this.keynotes[index] = keynote;
    }


  }

  changeKeynote(keynote: any) {
    this.editKeynote = keynote;
    this.selectedKeynote = true;
  }
}
