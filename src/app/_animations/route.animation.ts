import { trigger, transition, query, style, animate, stagger, keyframes, group } from '@angular/animations';

const enterLeaveStyle = {
  position: 'absolute',
  left: 0,
  width: '100%',
  opacity: 0,
};
const optional = { optional: true };

export const transitions =
  trigger('routeAnimations', [
    transition('* => searching', twist()),
    transition('searching => landing', slideTo('left')),
  ]);

function twist() {
  return [
    query(':enter, :leave', [
      style(enterLeaveStyle),
    ], { optional: true }),
    query(':leave', [
      animate('1.6s ease', keyframes([
        style({ opacity: 1, offset: 0 }),
        style({ opacity: 0, transform: 'rotateY(1080deg)', offset: 1 })
      ]))
    ], { optional: true }),
  ];
}

function bounce() {
  return [
    query(':enter, :leave', [
      style(enterLeaveStyle),
    ], { optional: true }),
    query(':enter', stagger('300ms', [
      animate('1s linear', keyframes([
        style({ opacity: 0, transform: 'translateY(-75px)', offset: 0 }),
        style({ opacity: .5, transform: 'translateY(20px)', offset: 0.3 }),
        style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
      ]))
    ]), { optional: true })
  ];
}

function slideTo(direction) {
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        [direction]: 0,
        width: '100%',
      })
    ], optional),
    query(':enter', [
      style({ [direction]: '-100%' })
    ]),
    group([
      query(':leave', [
        animate('0.5s ease', style({ [direction]: '100%' }))
      ], optional),
      query(':enter', [
        animate('0.5s ease', style({ [direction]: '0%', }))
      ], optional)
    ])
  ];
}

export const slider =
  trigger('routeAnimations', [
    transition('* => isLeft', slideTo('left')),
    transition('* => isRight', slideTo('right')),
    transition('isRight => *', slideTo('left')),
    transition('isLeft => *', slideTo('right'))
  ]);

export const fade =
  trigger('myInsertRemoveTrigger', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('1s', style({ opacity: 1 })),
    ]),
    transition(':leave', [
      animate('1s', style({ opacity: 0 }))
    ])
  ]);
