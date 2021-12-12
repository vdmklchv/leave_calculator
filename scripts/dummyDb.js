const persons = [];

// DUMMY DATABASE FOR LEAVES PER YEAR SETTINGS
const leavesPerYear = {
    "2021": 21,
    "2020": 20,
}

// SIMPLE DB METHODS
//
// takes in Person object and 
const addToDB = (person) => {
    persons.push(person);
}

const getLeavesPerYear = () => {
    return leavesPerYear;
}

const getPersons = () => {
    return persons;
}


module.exports = { persons, addToDB, leavesPerYear, getLeavesPerYear, getPersons };