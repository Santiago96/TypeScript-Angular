import { Component, OnInit } from '@angular/core';
import { TeamService } from '../services/team.service';
import { TeamsTableHeaders } from '../services/team.service';
import { Team } from '../interfaces/team';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Countries } from '../enums/Countries';

@Component({
  selector: 'app-team-table',
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.scss']
})
export class TeamTableComponent implements OnInit {

  public teams$ = Observable<Team[]>;
  public tableHeaders = TeamsTableHeaders;
  
  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.teams$ = this.teamService.getTeams();
    this.teamService.getTeams().pipe(take(1)).subscribe(teams => {
      if(teams.length == 0) {
        const team: Team = {
          name: 'MyAmazingTeam',
          country: Countries.Argentina,
          players: null,          
        };
        this.teamService.addTeam(team);
      }
    });
  }

}
