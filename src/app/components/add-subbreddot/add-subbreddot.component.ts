import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthServiceService} from "../../../services/auth-service.service";
import {SubReddotService} from "../../../services/sub-reddot.service";

@Component({
  selector: 'app-add-subbreddot',
  templateUrl: './add-subbreddot.component.html',
  styleUrls: ['./add-subbreddot.component.css']
})
export class AddSubbreddotComponent {

  sbForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private subReddotService: SubReddotService,
  ) {
    this.sbForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.maxLength(120)]],
      imageUrl: ['', [Validators.required]],
    });
  }

  onSubmit() {
      if (this.sbForm.valid) {
        const name = this.sbForm.get('name')!.value;
        const description = this.sbForm.get('description')!.value;
        const imageUrl = this.sbForm.get('imageUrl')!.value;
        this.subReddotService.addSubReddot(name, description, imageUrl).subscribe( (res) => {
          if (res) {
            console.log(res);
          }
        });
      }
  }
}
