import _ from 'lodash';
import {assert} from 'chai';

import gameEvents, {getGoalScoringTimes} from '../app/js/game-events';
import scoresAllRegularTime from './data/latest.json';
import scoresMultipleOvertime from './data/latest-2-ot.json';
import scoresOvertimeAndMultipleShootout from './data/latest-ot-2-so.json';

const periodStartMultiplier = 150;

describe('gameEvents', () => {

  it('should include 3 periods if no games went to overtime or shootout', () => {
    const events = gameEvents(scoresAllRegularTime.games);

    // Check that regulation periods were included
    assertPeriodEndEvents(events, [1, 2, 3]);

    // Check that there were no other period end events
    assert.equal(getPeriodEndEvents(events).length, 3 * periodStartMultiplier, 'All period end events count');
  });

  it('should include events until last overtime goal if games went to overtime and none went to shootout', () => {
    const events = gameEvents(scoresMultipleOvertime.games);

    // Check that regulation periods and overtime were included
    assertPeriodEndEvents(events, [1, 2, 3, 'OT']);

    // Check the last event with time
    const lastTimeEvent = getLastNonEndEvent(events);
    assert.deepEqual(lastTimeEvent, { period: 'OT', minute: 2, second: 23 });
  });

  it('should include events until shootout if games went to shootout', () => {
    const events = gameEvents(scoresOvertimeAndMultipleShootout.games);

    // Check that regulation periods, overtime and shootout were included
    assertPeriodEndEvents(events, [1, 2, 3, 'OT', 'SO']);

    const lastClockElement = getLastNonEndEvent(events);
    assert.deepEqual(lastClockElement, { period: 'SO' });
  });

  it('should pause by multiplying each period end event', () => {
    const events = gameEvents(scoresOvertimeAndMultipleShootout.games);

    // Check period end event count
    assertPeriodEndEventsCount(events, [1, 2, 3, 'OT', 'SO']);
  });

  it('should have a final "end" event as the last event', () => {
    const events = gameEvents(scoresAllRegularTime.games);
    assert.deepEqual(_.last(events), { end: true });
  });

  it('should determine correct goal scoring times', () => {
    const goalScoringTimes = getGoalScoringTimes(scoresMultipleOvertime.games);

    const expectedGoalScoringTimes = _.flatten([
      _.dropRight(scoresMultipleOvertime.games[1].goals),
      scoresMultipleOvertime.games[0].goals,
      _.takeRight(scoresMultipleOvertime.games[1].goals)
    ]);

    assert.deepEqual(goalScoringTimes, expectedGoalScoringTimes);
  });

});

function assertPeriodEndEvents(events, periods) {
  const allPeriodEndEvents = events.filter(event => event.period && event.end);
  const periodEndEventExists = period => _.some(allPeriodEndEvents, event => event.period === period);
  periods.forEach(period => {
    assert.equal(periodEndEventExists(period), true, `Period ${period} end event exists`);
  });
}

function assertPeriodEndEventsCount(events, periods) {
  const allPeriodEndEvents = events.filter(event => event.period && event.end);
  const periodEndEvents = period => allPeriodEndEvents.filter(event => event.period === period);
  periods.forEach(period => {
    assert.equal(periodEndEvents(period).length, periodStartMultiplier, `Period ${period} end events count`);
  });
}

function getPeriodEndEvents(events) {
  return events.filter(event => event.period && event.end);
}

function getLastNonEndEvent(events) {
  return _.findLast(events, event => !event.end);
}
