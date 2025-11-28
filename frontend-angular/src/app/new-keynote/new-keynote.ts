import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {KeynotesService} from '../services/keynotes.service';

@Component({
  selector: 'app-new-keynote',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './new-keynote.html',
  styleUrl: './new-keynote.css',
})
export class NewKeynote implements OnInit{


  keynoteForm! : FormGroup;
  @Output() keynoteAdded: any = new EventEmitter();
  @Output() close = new EventEmitter();


  constructor(private fb : FormBuilder, private keynoteService: KeynotesService) {
  }

  ngOnInit() {
    this.keynoteForm = this.fb.group({

      name :this.fb.control("", Validators.required),
      prenom : this.fb.control("",Validators.required),
      email : this.fb.control("",Validators.required),
      fonction : this.fb.control("",Validators.required)

    })
  }

  saveKeynote() {
    if (this.keynoteForm.valid) {
      this.keynoteService.saveKeynote(this.keynoteForm.value).subscribe(
        {
          next : data => {
            this.keynoteAdded.emit(data);
            this.close.emit();
          },
          error : err => console.error(err)
        }
      );
    }
    else {
      alert("Veuillez remplir tous les champs");
    }
  }
}
