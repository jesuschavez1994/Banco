import {
  trigger,
  transition,
  style,
  query,
  group,
  animateChild,
  animate,
  keyframes,
} from '@angular/animations';

export const slider = trigger('routeAnimations', [
  transition('* => isLeft', slideTo('left')),
]);

function slideTo(direction) {
  const optional = { optional: true };
  return [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          [direction]: 0,
          width: '100%',
        }),
      ],
      optional
    ),
    query(':enter', [style({ [direction]: '-100%' })], optional),
    group([
      query(
        ':leave',
        [animate('900ms ease', style({ [direction]: '100%' }))],
        optional
      ),
      query(
        ':enter',
        [animate('900ms ease', style({ [direction]: '0%' }))],
        optional
      ),
    ]),
    // Normalize the page style... Might not be necessary

    // Required only if you have child animations on the page
    query(':leave', animateChild(), optional),
    query(':enter', animateChild(), optional),
  ];
}
