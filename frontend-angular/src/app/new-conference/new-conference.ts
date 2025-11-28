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

  @Output() conferenceSaved = new EventEmitter<any>();
  @Output() close = new EventEmitter();
  types!: Array<any>;

  @Input() conferenceToEdit!: any;

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
    if(this.conferenceToEdit) {
      console.log("conferenceToEdit:", this.conferenceToEdit.id);
      this.conferenceForm.patchValue(this.conferenceToEdit);
    }
  }


  saveConference() {
    if (this.conferenceForm.invalid) {
      alert("Veuillez remplir tous les champs");
    }

    let newconference = this.conferenceForm.value;

    if(this.conferenceToEdit) {
      this.conferenceService.updateConference(this.conferenceToEdit,newconference).subscribe(
        {
          next:data => {
            this.conferenceSaved.emit(data);
            this.close.emit();
          }
        }
      )
    }
    else {
      this.conferenceService.saveConfernce(newconference).subscribe({
        next: data => {
          this.conferenceSaved.emit(data); //envoyer l'objet ajouté au parent
          this.close.emit();

        },
        error: err => console.error(err)
      })
    }
    }


  getTypes() : any {
    this.conferenceService.getTypes().subscribe({
      next: data  => this.types = data,
    })
  }
}
