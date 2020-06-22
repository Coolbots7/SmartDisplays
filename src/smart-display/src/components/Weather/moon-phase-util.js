import full from './icons/phases/F.png';
import first_quarter from './icons/phases/FQ.png';
import third_quarter from './icons/phases/LQ.png';
import new_moon from './icons/phases/N.png';
import waning_crescent from './icons/phases/WNC.png';
import waning_gibbous from './icons/phases/WNG.png';
import waxing_crescent from './icons/phases/WXC.png';
import waxing_gibbous from './icons/phases/WXG.png';

function getIconFromPhaseName(phase_name) {
    switch (phase_name) {
        case 'NEW':
            return new_moon;
        case 'WAXING_CRESCENT':
            return waxing_crescent;
        case 'FIRST_QUARTER':
            return first_quarter;
        case 'WAXING_GIBBOUS':
            return waxing_gibbous;
        default:
        case 'FULL':
            return full;
        case 'WANING_GIBBOUS':
            return waning_gibbous;
        case 'THIRD_QUARTER':
            return third_quarter;
        case 'WANING_CRESCENT':
            return waning_crescent;
    }
}

export { getIconFromPhaseName };