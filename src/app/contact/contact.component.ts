import { Response } from '@angular/http';
import { Component, OnInit, Inject, trigger } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Validator } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';

import { Feedback, ContactType } from './../shared/feedback';
//import { Validators } from '@angular/forms/src/validators';
import { flyInOut, expand } from '../animations/app.animation';
import { FeedbackService } from './../services/feedback.service';
//import { setTimeout } from 'timers';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ] 
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  firstname: string;
  errMess: string;
  visibility = 'shown';
  fbcopy = null;
  myspin = true;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  }

  validationMessages = {
    'firstname': {
      'required': 'First Name is required.',
      'minlength': 'First Name must be atleast 2 characters long.',
      'maxlength': 'First Name can not be more than 25 characters.'
  },
  'lastname': {
    'required': 'Last Name is required.',
    'minlength': 'Last Name must be atleast 2 characters long.',
    'maxlength': 'Last Name can not be more than 25 characters.'
},
  'telnum': {
    'required': 'Tel. Number is required.',
    'pattern': 'Tel. Number must contain only numbers.'
  },
  'email': {
    'required': 'Email is required.',
    'email': 'Email not in valid format.'
  }
};

  constructor(private feedbackservice: FeedbackService, 
    private route: ActivatedRoute, private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.createForm();
  }

   createForm(){
     this.feedbackForm = this.fb.group({ 
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]], 
      telnum: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
     });

     this.feedbackForm.valueChanges
     .subscribe(data => this.onValueChanged(data));

     this.onValueChanged(); //(re)set form validation messages
   }

   onValueChanged(data?: any){
     if (!this.feedbackForm) { return; }
     
     const form = this.feedbackForm;

     for (const field in this.formErrors) {
       this.formErrors[field] = '';
       const control = form.get(field);
       if (control && control.dirty && !control.valid){
         const messages = this.validationMessages[field];
         for (const key in control.errors){
           this.formErrors[field] += messages[key] + ' ';
         }
       }
     }
   }

   onSubmit(){
     this.feedback =  this.feedbackForm.value;
     this.myspin = false;
     this.feedbackservice.submitFeedback(this.feedback)
     .subscribe(feedback => { this.fbcopy = feedback; setTimeout(() => { this.fbcopy = null; this.myspin = true; }, 5000); });

     this.feedbackForm.reset({
      firstname: '',
      lastname: '', 
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
     });
  }
}
