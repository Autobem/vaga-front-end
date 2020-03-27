export const primary = {
  background: '#C6DDF1',
  border: '1px solid #0275D8',
  color: '#0275D8',
}

export const warning = {
  background: '#F8F1E8',
  border: '1px solid #F0AD4E',
  color: '#F0AD4E',
}

export const success = {
  background: '#DEF1DE',
  border: '1px solid #5CB85C',
  color: '#5CB85C',
}

export const danger = {
  background: '#F6E8E8',
  border: '1px solid #D9534F',
  color: '#D9534F',
}

export function getBackground(variant) {
  switch (variant) {
    case 'warning':
      return {background: '#F8D6A7'};
    case 'danger':
      return {background: '#ECA9A7'};
    case 'success':
      return {background: '#AEDCAE'};
    case 'primary':
      return {background: '#ADE0EF'};
  }
}