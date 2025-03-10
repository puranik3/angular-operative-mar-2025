import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionsService } from '../../sessions.service';
import ISession from '../../models/ISession';
import { VotingWidgetComponent } from '../../../common/voting-widget/voting-widget.component';

@Component({
  selector: 'app-sessions-list',
  standalone: true,
  imports: [VotingWidgetComponent],
  templateUrl: './sessions-list.component.html',
  styleUrl: './sessions-list.component.scss',
})
export class SessionsListComponent implements OnInit {
  workshopId!: number;
  sessions!: ISession[];

  constructor(
    private sessionsService: SessionsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.activatedRoute.snapshot.paramMap is NOT an observable unlike this.activatedRoute.paramMap which is an observable
    const idStr = this.activatedRoute.snapshot.paramMap.get('id');
    this.workshopId = +(idStr as string);

    this.sessionsService.getSessionsForWorkshop(this.workshopId).subscribe({
      next: (sessions) => {
        this.sessions = sessions;
        console.log(sessions);
      },
    });
  }

  updateVote(session: ISession, by: number) {
    this.sessionsService
      .voteForSession(session.id, by === 1 ? 'upvote' : 'downvote')
      .subscribe({
        next: (updatedSession) => {
          session.upvoteCount = updatedSession.upvoteCount;
        },
        // @todo handle error
      });
  }
}
