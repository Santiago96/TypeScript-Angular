import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Team } from '../interfaces/team';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const TeamsTableHeaders: string[] = ['Name', 'Country', 'Players'];

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teamDb: AngularFireList<Team>;

  constructor(private db: AngularFireDatabase) { 
    this.teamDb = this.db.list('/teams', ref => ref.orderByChild('name'));
  }

  getTeams(): Observable<Team[]> {
    return this.teamDb.snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({ $key: c.payload.key, ... c.payload.val()}));
      })
    )
  }

  addTeam(team: Team) {
    return this.teamDb.push(team);
  }

  deleteTeam(id: string) {
    //this.db.list('/teams').remove(id);
    this.teamDb.remove(id);
  }

  editTeam(newTeam: Team){
    const $key = newTeam.$key;
    this.deleteTeam($key);

    this.db.list('/teams').update($key, newTeam);
  }
}
