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
        const finalLeave = {
            leaveStart: leave[0],
            leaveEnd: leave[1],
        }
        const year = leave[0].split('-')[0];
        if (!leaves[year]) {
            leaves[year] = {};
            leaves[year].leaveOnYearStart = startLeave;
            if (hasLeaveThisYear === 'on') {
                leaves[year].leaveOnYearEnd = remainingLeave;
            } else {
                leaves[year].leaveOnYearEnd = 0;
            }
            leaves[year].leaves = [finalLeave];
        } else {
            leaves[year].leaves.push(finalLeave);
        }
    }
    return leaves;
}


module.exports = Person;