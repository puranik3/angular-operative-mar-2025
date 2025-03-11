import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  NgForm,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';

import { SessionsService } from '../../sessions.service';
import ISession from '../../models/ISession';

@Component({
  selector: 'app-add-session',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './add-session.component.html',
  styleUrl: './add-session.component.scss',
})
export class AddSessionComponent {
  addSessionForm = new FormGroup({
    sequenceId: new FormControl('', [
      Validators.required,
      Validators.pattern('\\d+'),
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('[A-Z][A-Za-z ]+'),
    ]),
    speaker: new FormControl('', [
      Validators.required,
      Validators.pattern('[A-Z][A-Za-z ]+(,[A-Z ][A-Za-z ]+)*'),
    ]),
    duration: new FormControl('', [
      Validators.required,
      Validators.min(0.5),
      Validators.max(10),
    ]),
    level: new FormControl('', [Validators.required]),
    abstract: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
    ]),
  });

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
    private router: Router
  ) {}

  addSession(addSessionForm: NgForm) {
    const id = +(this.activatedRoute.snapshot.parent?.paramMap.get(
      'id'
    ) as string);

    console.log(addSessionForm.value);

    const newSession = {
      ...addSessionForm.value,
      workshopId: id,
      upvoteCount: 0,
      sequenceId: +addSessionForm.value.sequenceId,
      // duration: +addSessionForm.value.duration,
    } as Omit<ISession, 'id'>;

    console.log(newSession);

    this.sessionsService.addSession(newSession).subscribe({
      next: (addedSession) => {
        alert(`Added session with id = ${addedSession.id}`);

        // You can also use navigateByUrl()
        this.router.navigate(['/workshops', id]);
      },
    });
  }
}
