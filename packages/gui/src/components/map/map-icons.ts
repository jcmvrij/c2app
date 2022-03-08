import car from '../../assets/Operations/Car.png';
import van from '../../assets/Operations/Car.png';
import controlPoint from '../../assets/Operations/Control point.png';
import divisionCommand from '../../assets/Operations/Division command.png';
import evacuation from '../../assets/Operations/Evacuation.png';
import fireman from '../../assets/Operations/Firemen unit.png';
import helicopter from '../../assets/Operations/Helicopter.png';
import media from '../../assets/Operations/Media.png';
import sanitary from '../../assets/Operations/Medical services.png';
import military from '../../assets/Operations/Military.png';
import policeman from '../../assets/Operations/Police unit.png';
import roadBlock from '../../assets/Operations/Road block.png';
import truck from '../../assets/Operations/Truck.png';
import chemical from '../../assets/Incidents/Chemical.png';
import air from '../../assets/Operations/air.png';
import ground from '../../assets/Operations/ground.png';
import first_responder from '../../assets/Operations/Medical services.png';

export const appIcons = [
    [car, 'CAR'],
    [van, 'VAN'],
    [truck, 'TRUCK'],
    [controlPoint, 'controlPoint'],
    [divisionCommand, 'divisionCommand'],
    [evacuation, 'evacuation'],
    [fireman, 'FIREFIGHTER'],
    [helicopter, 'helicopter'],
    [media, 'media'],
    [sanitary, 'MEDICAL'],
    [military, 'military'],
    [policeman, 'POLICE'],
    [roadBlock, 'roadBlock'],
    [chemical, 'chemical'],
    [air, 'AIR'],
    [ground, 'GROUND'],
    [first_responder, 'OTHER'],
  ] as Array<[img: any, name: string]>;