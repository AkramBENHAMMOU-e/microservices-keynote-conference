import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConferenceService} from '../services/conference.service';

@Component({
  selector: 'app-accueil',
  imports: [
    CommonModule
  ],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
  standalone: true
})
export class Accueil implements OnInit{

  public conferences: any[] = [];
  color : any[] = ["blue","purple","orange"];

  constructor(private ConferenceService: ConferenceService) { }


  ngOnInit() {
    this.ConferenceService.getAllConfernces().subscribe({
      next : data => this.conferences = data
    })
  }
}

