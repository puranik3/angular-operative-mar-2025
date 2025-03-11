import { Component } from '@angular/core';
import {
  AbstractControl,
  ReactiveFormsModule,
  NgForm,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';

import { SessionsService } from '../../sessions.service';
import ISession from '../../models/ISession';

function durationAndLevel(form: AbstractControl) {
  const durationStr = (form.get('duration') as AbstractControl).value;
  const duration = +durationStr;
  const level = (form.get('level') as AbstractControl).value;

  // if valid -> return null
  // if invalid -> return an object with the details of the error. Further this object should have the property called `durationAndLevel`
  if (durationStr === '' || level === '') {
    return null;
  }

  if (level === 'Basic') {
    return null;
  }

  if (level === 'Intermediate') {
    if (duration >= 2) {
      return null;
    }

    // error
    return {
      durationAndLevel:
        'Intermediate level session should be at least 2 hours in duration',
    };
  }

  if (level === 'Advanced') {
    if (duration >= 3) {
      return null;
    }

    // error
    return {
      durationAndLevel:
        'Advanced level session should be at least 3 hours in duration',
    };
  }

  return null;
}

@Component({
  selector: 'app-add-session',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './add-session.component.html',
  styleUrl: './add-session.component.scss',
})
export class AddSessionComponent {
  addSessionForm: FormGroup;

  // helper accessor methods
  get sequenceId() {
    return this.addSessionForm.get('sequenceId') as FormControl;
  }

  get name() {
    return this.addSessionForm.get('name') as FormControl;
  }

  get speaker() {
    return this.addSessionForm.get('speaker') as FormControl;
  }

  get duration() {
    return this.addSessionForm.get('duration') as FormControl;
  }

  get level() {
    return this.addSessionForm.get('level') as FormControl;
  }

  get abstract() {
    return this.addSessionForm.get('abstract') as FormControl;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private sessionsService: SessionsService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.addSessionForm = this.fb.group(
      {
        sequenceId: ['', [Validators.required, Validators.pattern('\\d+')]],
        name: [
          '',
          [Validators.required, Validators.pattern('[A-Z][A-Za-z ]+')],
        ],
        speaker: [
          '',
          [
            Validators.required,
            Validators.pattern('[A-Z][A-Za-z ]+(,[A-Z ][A-Za-z ]+)*'),
          ],
        ],
        duration: [
          '',
          [Validators.required, Validators.min(0.5), Validators.max(10)],
        ],
        level: ['', [Validators.required]],
        abstract: ['', [Validators.required, Validators.minLength(20)]],
      },
      {
        validators: durationAndLevel,
      }
    );
  }

  addSession() {
    const id = +(this.activatedRoute.snapshot.parent?.paramMap.get(
      'id'
    ) as string);

    console.log(this.addSessionForm.value);

    const newSession = {
      ...this.addSessionForm.value,
      workshopId: id,
      upvoteCount: 0,
      sequenceId: +(this.addSessionForm.value.sequenceId as string),
      // duration: +addSessionForm.value.duration,
    };

    console.log(newSession);

    this.sessionsService
      .addSession(newSession as unknown as Omit<ISession, 'id'>)
      .subscribe({
        next: (addedSession) => {
          alert(`Added session with id = ${addedSession.id}`);

          // You can also use navigateByUrl()
          this.router.navigate(['/workshops', id]);
        },
      });
  }
}
