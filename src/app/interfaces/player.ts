import { SquadNumber } from '../enums/SquadNumber';
import { Countries } from '../enums/Countries';

export interface Player {
    $key?: string;
    name: string;
    lastName: string;
    position: SquadNumber;
    weight: number;
    height: number;
    nationality: Countries;
    leftFooted: boolean;
}

