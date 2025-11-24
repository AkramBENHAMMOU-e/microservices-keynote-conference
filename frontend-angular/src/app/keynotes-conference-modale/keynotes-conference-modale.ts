import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule, JsonPipe} from '@angular/common';

@Component({
  selector: 'app-keynotes-conference-modale',
  imports: [
    JsonPipe, CommonModule
  ],
  templateUrl: './keynotes-conference-modale.html',
  styleUrl: './keynotes-conference-modale.css',
})
export class KeynotesConferenceModale {

  @Input() conference: any;
  @Output() close = new EventEmitter();
}
