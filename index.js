// Your code here
function createEmployeeRecord(employeeArray) {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords (arrayArray) {
    const objectArray = [];
    arrayArray.forEach((array, idx) => objectArray[idx] = createEmployeeRecord(array));
    return objectArray;
}

function createTimeInEvent(recordObj, dateStamp) {
    const timeIn = {};
    timeIn.type = "TimeIn";
    timeIn.hour = parseInt(dateStamp.substring(11,15), 10);
    timeIn.date = dateStamp.substring(0,10);
    recordObj.timeInEvents.push(timeIn)
    return recordObj;
}

function createTimeOutEvent(recordObj, dateStamp) {
    const timeOut = {};
    timeOut.type = "TimeOut";
    timeOut.hour = parseInt(dateStamp.substring(11,15), 10);
    timeOut.date = dateStamp.substring(0,10);
    recordObj.timeOutEvents.push(timeOut)
    return recordObj;
}

function hoursWorkedOnDate(recordObj, date) {
    const idx = recordObj.timeInEvents.findIndex(obj => obj.date === date);
    if (idx === -1) {
        return 0;
    } else {
        return (recordObj.timeOutEvents[idx].hour - recordObj.timeInEvents[idx].hour)/100;
    }
}

function wagesEarnedOnDate(recordObj, date) {
    return hoursWorkedOnDate(recordObj, date) * recordObj.payPerHour;
}

function allWagesFor(recordObj) {
    return recordObj.timeInEvents.reduce((prev, curr) => wagesEarnedOnDate(recordObj,curr.date) + prev, 0);
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((prev, curr) => allWagesFor(curr) + prev, 0);
}