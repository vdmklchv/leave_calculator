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
            if (hasLeaveThisYear === 'on') {
                leaves[year].leaveOnYearEnd = remainingLeave;
            } else {
                leaves[year].leaveOnYearEnd = 0;
            }
            leaves[year].leaves = leaveArr;
        } else {
            leaves[year].leaves.push(leaveArr);
        }
    }
    return leaves;
}


module.exports = Person;