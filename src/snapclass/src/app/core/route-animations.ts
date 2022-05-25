import {
    trigger,
    animate,
    transition,
    style,
    query,
    group,
    animateChild
} from '@angular/animations';


export const routeAnimations = trigger('routeAnimations', [

    transition('* => *', [
        style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          opacity: '0.5'
        })
    ], { optional: true }),
      query(':enter', [
        style({ opacity: '0.5'})
    ], { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('900ms ease-out', style({ opacity: '1'}))
      ], { optional: true }),
        query(':enter', [
          animate('900ms ease-out', style({ opacity: '0'}))
      ], { optional: true })
      ]),
      query(':enter', animateChild(), { optional: true }),
    ]),
]);
