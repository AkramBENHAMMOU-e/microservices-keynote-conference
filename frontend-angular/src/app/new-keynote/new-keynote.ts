import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {KeynotesService} from '../services/keynotes.service';
import {Keynote} from '../models/Keynote';

@Component({
  selector: 'app-new-keynote',
  imports: [
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './new-keynote.html',
  styleUrl: './new-keynote.css',
})
export class NewKeynote implements OnInit{


  keynoteForm! : FormGroup;
  @Output() keynoteSaved: any = new EventEmitter();
  @Output() close = new EventEmitter();

  @Input() keynoteToEdit!: Keynote;

  constructor(private fb : FormBuilder, private keynoteService: KeynotesService) {
  }

  ngOnInit() {
    this.keynoteForm = this.fb.group({

      name :this.fb.control("", Validators.required),
      prenom : this.fb.control("",Validators.required),
      email : this.fb.control("",Validators.required),
      fonction : this.fb.control("",Validators.required)

    })

    if(this.keynoteToEdit) {
   /*   this.keynoteForm = this.fb.group({
        name :this.fb.control(this.keynoteToEdit.name, Validators.required),
        prenom : this.fb.control(this.keynoteToEdit.prenom,Validators.required),
        email : this.fb.control(this.keynoteToEdit.email,Validators.required),
        fonction : this.fb.control(this.keynoteToEdit.fonction,Validators.required)
      })*/
      console.log("keynoteToEdit:", this.keynoteToEdit.id);
      this.keynoteForm.patchValue(this.keynoteToEdit);

    }
  }

  saveKeynote() {
    if (this.keynoteForm.invalid) {
      alert("Veuillez remplir tous les champs");
    }
      if (this.keynoteToEdit){
        this.keynoteService.updateKeynote(this.keynoteToEdit,this.keynoteForm.value).subscribe({
          next : data => {
            this.keynoteSaved.emit(data);
            this.close.emit();
          }
        })
    }

      else {
        this.keynoteService.saveKeynote(this.keynoteForm.value).subscribe(
          {
            next : data => {
              this.keynoteSaved.emit(data);
              this.close.emit();
            },
            error : err => console.error(err)
          }
        );

      }

  }
}
