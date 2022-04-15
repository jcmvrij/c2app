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
import blue from '../../assets/Units/blue.png';
import red from '../../assets/Units/red.png';
import white from '../../assets/Units/white.png';

export const appIcons = [
  [car, 'CAR'],
  [van, 'VAN'],
  [truck, 'TRUCK'],
  [controlPoint, 'CONTROLPOINT'],
  [divisionCommand, 'DIVISION_COMMAND'],
  [evacuation, 'EVACUATION'],
  [fireman, 'FIREFIGHTER'],
  [helicopter, 'HELICOPTER'],
  [media, 'MEDIA'],
  [sanitary, 'MEDICAL'],
  [military, 'MILITARY'],
  [policeman, 'POLICE'],
  [roadBlock, 'ROADBLOCK'],
  [chemical, 'CHEMICAL'],
  [air, 'AIR'],
  [ground, 'GROUND'],
  [first_responder, 'OTHER'],
  [blue, 'BLUE'],
  [red, 'RED'],
  [white, 'WHITE'],
] as Array<[img: any, name: string]>;
