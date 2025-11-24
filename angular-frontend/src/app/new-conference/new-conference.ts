import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ConferenceService} from '../services/conference.service';

@Component({
  selector: 'app-new-conference',
  standalone: false,
  templateUrl: './new-conference.html',
  styleUrl: './new-conference.css',
})
export class NewConference implements OnInit{

  public conferenceForm! : FormGroup;

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
