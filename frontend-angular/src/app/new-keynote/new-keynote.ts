import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

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


  constructor(private fb : FormBuilder) {
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
      this.keynoteAdded.emit(this.keynoteForm.value);
      this.close.emit();
    }
    else {
      alert("Veuillez remplir tous les champs");
    }
  }
}
