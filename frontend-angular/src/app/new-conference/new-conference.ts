import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { ConferenceService } from '../services/conference.service';

@Component({
  selector: 'app-new-conference',
  imports: [ReactiveFormsModule],
  templateUrl: './new-conference.html',
  styleUrl: './new-conference.css',
})
export class NewConference {
  public conferenceForm! : FormGroup;

  @Output() close = new EventEmitter();

  constructor(private fb: FormBuilder, private conferenceService: ConferenceService) {
  }
  ngOnInit(){
    this.conferenceForm = this.fb.group({
      titre: this.fb.control(""),
      type: this.fb.control(""),
      date: this.fb.control("") ,
      duree: this.fb.control(0),
      nbreInscrit: this.fb.control(0),
      score: this.fb.control(0)
    });
  }


  saveConference() {
    let conference = this.conferenceForm.value;
    this.conferenceService.saveConfernce(conference).subscribe({
      next: data  => alert(JSON.stringify(data)),
      error: err => console.error(err)
    })
  }
}
