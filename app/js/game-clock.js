import xs from 'xstream';
import {span} from '@cycle/dom';

import gameEvents from './game-events';

export default function GameClock(sources) {
  const state$ = model(intent(sources));
  return {
    DOM: view(state$),
    clock$: state$
  };
}

function intent(sources) {
  const {scores$, isPlaying$, props$ } = sources;
  return { scores$, isPlaying$, props$ };
}

function model(actions) {
  const ticks$ = actions.props$.map(props => xs.periodic(props.interval))
    .flatten();
  const events$ = actions.scores$.map(scores => gameEvents(scores));
  const eventIndex$ = xs.combine(actions.isPlaying$, ticks$)
    .filter(([isPlaying]) => isPlaying)
    .fold(acc => acc + 1, 0)
    .drop(1);
  const eventsEnd$ = xs.combine(events$, eventIndex$)
    .filter(([events, eventIndex]) => eventIndex >= events.length);

  return xs.combine(events$, eventIndex$)
    .endWhen(eventsEnd$)
    .map(([events, eventIndex]) => events[eventIndex]);
}

function view(state$) {
  return state$.map(clock => {
    const time = clock ? renderTime(clock) : '';
    const animationClass = time ? '.fade-in-fast' : '';
    return span(`.clock${animationClass}`, [
      span('.clock__period', clock ? renderPeriod(clock) : ''),
      time ? span('.clock__time', time) : ''
    ]);
  });
}

function renderPeriod(clock) {
  if (clock.start) {
    return span('.fade-in', 'Starting...');
  } else if (clock.end) {
    return clock.period ? span('.fade-in', renderPeriodEnd(clock.period)) : span('.fade-in-fast', 'Final');
  } else {
    return renderPeriodNumber(clock.period);
  }
}

function renderPeriodEnd(period) {
  return 'End of ' + renderPeriodNumber(period);
}

export function renderPeriodNumber(period) {
  switch (period) {
    case 'OT':
    case 4:
    case '4':
      return 'OT';
    case 'SO':
      return 'SO';
    case 1:
    case '1':
      return '1st';
    case 2:
    case '2':
      return '2nd';
    case 3:
    case '3':
      return '3rd';
    default:
      return `${period - 3}OT`;
  }
}

export function renderTime(clock) {
  if (!clock.minute && !clock.second) {
    return '';
  }

  const showTenthsOfASecond = (clock.tenthOfASecond !== undefined);
  const minute = !showTenthsOfASecond ? clock.minute + ':' : '';
  const second = (clock.second >= 10 || showTenthsOfASecond) ? clock.second : '0' + clock.second;
  const tenthOfASecond = showTenthsOfASecond ? '.' + clock.tenthOfASecond : '';
  return minute + second + tenthOfASecond;
}
