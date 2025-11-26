import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ConferenceService } from '../services/conference.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-new-conference',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-conference.html',
  styleUrl: './new-conference.css',
})
export class NewConference implements OnInit{
  public conferenceForm! : FormGroup;

  @Output() conferenceAdded = new EventEmitter<any>();
  @Output() close = new EventEmitter();
  types!: Array<any>;

  constructor(private fb: FormBuilder, private conferenceService: ConferenceService) {
  }
  ngOnInit(){
    this.conferenceForm = this.fb.group({
      titre: this.fb.control("", Validators.required),
      type: this.fb.control("", Validators.required),
      date: this.fb.control("", Validators.required) ,
      duree: this.fb.control(0, Validators.required),
      nbreInscrit: this.fb.control(0),
      score: this.fb.control(0)
    });
    this.types = this.getTypes();
  }


  saveConference() {
    let conference = this.conferenceForm.value;
    console.log(conference.json);
    if (this.conferenceForm.valid) {
      this.conferenceService.saveConfernce(conference).subscribe({
        next: data => {
          this.conferenceAdded.emit(data); //envoyer l'objet ajouté au parent
          this.close.emit();

        },
        error: err => console.error(err)
      })
    }
    else {
      alert("Veuillez remplir tous les champs");
    }
  }

  getTypes() : any {
    this.conferenceService.getTypes().subscribe({
      next: data  => this.types = data,
    })
  }
}
