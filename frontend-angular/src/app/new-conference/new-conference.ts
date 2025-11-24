import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { ConferenceService } from '../services/conference.service';

@Component({
  selector: 'app-new-conference',
  imports: [ReactiveFormsModule],
  templateUrl: './new-conference.html',
  styleUrl: './new-conference.css',
})
export class NewConference implements OnInit{
  public conferenceForm! : FormGroup;

  @Output() conferenceAdded = new EventEmitter<any>();
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
    console.log(conference.json);

    this.conferenceService.saveConfernce(conference).subscribe({
      next: data  => {
        this.conferenceAdded.emit(data); //envoyer l'objet ajouté au parent
        this.close.emit();

      },
      error: err => console.error(err)
    })
  }
}
