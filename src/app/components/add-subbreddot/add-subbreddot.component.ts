import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthServiceService} from "../../../services/auth-service.service";
import {SubReddotService} from "../../../services/sub-reddot.service";
import { Router } from '@angular/router';
import { Subreddot } from 'src/models/subreddot.model';

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
    private router: Router,
  ) {
    this.sbForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.maxLength(120)]],
      image: ['', [Validators.required]],
    });
  }

  onSubmit() {
      if (this.sbForm.valid) {
        const name = this.sbForm.get('name')!.value;
        const description = this.sbForm.get('description')!.value;
        
        // const imageUrl = this.sbForm.get('imageUrl')!.value;
        // this.subReddotService.addSubReddot(name, description, imageUrl).subscribe( (res) => {
        //   if (res) {
        //     console.log(res);
        //   }
        // });

        const formFile = document.getElementById('file') as HTMLInputElement;

        const imageFile = formFile.files!.item(0);

        if (imageFile) {
          console.log('imageFile ok');
          const reader = new FileReader();

          reader.onloadend = () => {

            const fileString = reader.result!.toString();
            const base64String = fileString.replace("data:", "")
                .replace(/^.+,/, "");
            //console.log('base64String : ' + base64String);

            const imgString = base64String;

            this.subReddotService.addSubReddot(name, description, imgString).subscribe(res => {
              console.log(res);
              const newSub = res as Subreddot;
              //redirect to subreddot page
              this.router.navigate(['/subreddot/' + newSub['_id']]);
            });
          };
      
          //reader.readAsArrayBuffer(imageFile); // Lire le fichier en tant qu'ArrayBuffer
          reader.readAsDataURL(imageFile);
        }


      }
  }
}
