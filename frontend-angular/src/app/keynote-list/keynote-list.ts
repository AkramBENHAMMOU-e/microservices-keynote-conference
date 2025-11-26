import {Component, OnInit} from '@angular/core';
import {KeynotesService} from '../services/keynotes.service';
import {NgForOf,CommonModule} from '@angular/common';

@Component({
  selector: 'app-keynote-list',
  imports: [
    NgForOf, CommonModule
  ],
  templateUrl: './keynote-list.html',
  styleUrl: './keynote-list.css',
})
export class KeynoteList implements OnInit{

  keynotes : Array<any> = [];


  constructor(private keynoteService : KeynotesService) {
  }

  ngOnInit(){
    this.getAllKeynotes();
  }

  getAllKeynotes(){
    this.keynoteService.getAllKeynotes().subscribe({
      next : data => this.keynotes = data,
      error : err => console.error(err)
    })
  }

}
