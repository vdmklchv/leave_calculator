function Person(name, startLeave, hasLeaveThisYear, remainingLeave, leaves) {
    return {
        name: name,
        leaves: generateLeaves(startLeave, hasLeaveThisYear, remainingLeave, leaves),
    }
}

// TRANSFER THIS SOMEWHERE
function generateLeaves(startLeave, hasLeaveThisYear, remainingLeave, leaveArr) {
    const leaves = {};
    for (let leave of leaveArr) {
        const year = leave['leaveStart'].split('-')[0];
        if (!leaves[year]) {
            leaves[year] = {};
            leaves[year].leaveOnYearStart = startLeave;
            leaves[year].leaveOnYearEnd = remainingLeave;
            leaves[year].leaves = leaveArr;
        } else {
            leaves[year].leaves = leaveArr;
        }
    }
    return leaves;
}


module.exports = Person;