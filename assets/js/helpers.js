// takes in data to display inside table cell and returns cell element
const createTableCell = (data) => {
    const tableCell = document.createElement('td');
    tableCell.innerHTML = data;
    return tableCell;
}

// converts date object to string for display
const dateToString = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}`;
}

// leaveStart here expects array of arrays ie. [[leaveStart1, leaveEnd1], [leaveStart2, leaveEnd2] etc.]
// calculates remaining leaves for all leaves in leave array and takes in number of leave days left for beginning of the year and total number of allowed days this year
const calculateRemainingLeave = (leaves, leaveStart, leaveDaysPerYear) => {
    let passedLeaveDaysThisYear = 0;
    for (let leaveGroup of leaves) {
        const spentLeaveDaysInOneLeaveGroup = (new Date(leaveGroup[1]) - new Date(leaveGroup[0])) / 1000 / 60 / 60 / 24 + 1;
        passedLeaveDaysThisYear += spentLeaveDaysInOneLeaveGroup;
    }
    return leaveStart + leaveDaysPerYear - passedLeaveDaysThisYear;
}


// REWRITE constructLeave to omit constructLeaveArrayForDB
// construct leave takes in input object and array of leaves and updates array with correct structure to put into data sent back to backend
const constructLeave = (array, input) => {
    const index = Number(input.id.split('-')[2]) - 1;
    const type = input.id.split('-')[1];
    if (!array[index]) {
        array[index] = [];
    }
    if (type === 'start') {
        array[index][0] = input.value;
    } else {
        array[index][1] = input.value;
    }
}

// construct leaves array for sending to db
const constructLeaveArrayForDB = (leaveArr) => {
    const arr = [];
    for (let leave of leaveArr) {
        arr.push([
            leave[0],
            leave[1],
        ]);
    }
    return arr;
}

// convert leaves to format required by calculate leave function
const constructLeaveArrayForCalculateLeave = (arr) => {
    const resultArr = [];
    for (let obj of arr) {
        resultArr.push([obj.leaveStart, obj.leaveEnd]);
    }
    return resultArr;
}

export { createTableCell, dateToString, calculateRemainingLeave, constructLeave, constructLeaveArrayForDB, constructLeaveArrayForCalculateLeave };

