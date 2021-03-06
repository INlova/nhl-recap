import _ from 'lodash';

export function remainingTimeToElapsedTime({period, minute, second}) {
  const periodLengthInMinutes = (period === 'OT') ? 5 : 20;
  const secondsRemaining = 60 * (minute || 0) + (second || 0);
  const secondsElapsed = periodLengthInMinutes * 60 - secondsRemaining;
  const elapsedMinute = Math.floor(secondsElapsed / 60);
  const elapsedSecond = secondsElapsed - 60 * elapsedMinute;

  return { period, minute: elapsedMinute, second: elapsedSecond };
}

export function elapsedTimeToRemainingTime(time) {
  return remainingTimeToElapsedTime(time);
}

export function hasGoalBeenScored(clock, goal) {
  const {minute, second} = remainingTimeToElapsedTime(clock);
  return (getPeriodOrdinal(goal.period) < getPeriodOrdinal(clock.period)) ||
    (getPeriodOrdinal(goal.period) === getPeriodOrdinal(clock.period) &&
      (goal.min < minute ||
        (goal.min === minute && goal.sec <= second)));
}

function getPeriodOrdinal(period) {
  return (period === 'OT') ? 4 : Number(period);
}

export function truncatePlayerName(name) {
  const maxLength = 20;
  if (name.length <= maxLength) {
    return name;
  } else {
    const names = name.split(' ');
    const firstNames = _.dropRight(names);
    const abbreviatedFirstNames = _.flatten(
      firstNames.map(firstName => firstName.split('-')
        .map(namePart => `${namePart[0]}.`))
    );
    return `${abbreviatedFirstNames.join('')} ${_.last(names)}`;
  }
}
