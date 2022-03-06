function createEmployeeRecord(record) {
  return {
    firstName: record[0],
    familyName: record[1],
    title: record[2],
    payPerHour: record[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

// not passing test
function createEmployeeRecords(records) {
  const newArray = [];
  records.map((record) => {
    newArray.push(createEmployeeRecord(record));
  });
  return newArray;
}

function createTimeInEvent(record, event) {
  const splitEvent = event.split(' ');
  const newEvent = {
    type: 'TimeIn',
    date: splitEvent[0],
    hour: parseInt(splitEvent[1]),
  };
  record.timeInEvents.push(newEvent);
  return record;
}

function createTimeOutEvent(record, event) {
  const splitEvent = event.split(' ');
  const newEvent = {
    type: 'TimeOut',
    date: splitEvent[0],
    hour: parseInt(splitEvent[1]),
  };
  record.timeOutEvents.push(newEvent);
  return record;
}

function hoursWorkedOnDate(record, date) {
  const timeIn = record.timeInEvents.find((e) => e.date.split(' ')[0]);
  const timeOut = record.timeOutEvents.find(
    (e) => e.date.split(' ')[0] == date
  );
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(record, date) {
  return hoursWorkedOnDate(record, date) * record.payPerHour;
}

function allWagesFor(record) {
  let total = 0;

  for (let i = 0; i < record.timeOutEvents.length; i++) {
    total += wagesEarnedOnDate(record, record.timeInEvents[i].date);
  }
  return total;
}

function calculatePayroll(records) {
  return records.reduce((total, employee) => total + allWagesFor(employee), 0);
}
