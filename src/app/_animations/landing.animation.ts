import { trigger, transition, query, style, stagger, animate, keyframes } from '@angular/animations';


export const bounce =
  trigger('bounceAnimation', [
    transition('* => *', [
      query(':enter', style({ opacity: 0 }), { optional: true }),
      query(':enter', stagger('0.3s', [
        animate('0.6s linear', keyframes([
          style({ opacity: 0, transform: 'translateY(-75px)', offset: 0 }),
          style({ opacity: .5, transform: 'translateY(20px)', offset: 0.3 }),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
        ]))
      ]), { optional: true })
    ])
  ]);
