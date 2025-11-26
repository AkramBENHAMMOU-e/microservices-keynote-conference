import {Component, OnInit} from '@angular/core';
import {KeynotesService} from '../services/keynotes.service';
import {NgForOf,CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-keynote-list',
  imports: [
    NgForOf, CommonModule, FormsModule
  ],
  templateUrl: './keynote-list.html',
  styleUrl: './keynote-list.css',
})
export class KeynoteList implements OnInit{

  keynotes : Array<any> = [];
  keynoteList : Array<any> = [];
  keyword: any;


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

  openNewKeynote() {

  }

  deleteKeynote(keynote: any) {

    this.keynoteService.deleteKeynote(keynote).subscribe({
      next : data => {
        this.keynotes = this.keynotes.filter(k => k !== keynote);
      }
      , error : err => alert("Impossible de supprimer ce Keynote")
    })

  }
}
