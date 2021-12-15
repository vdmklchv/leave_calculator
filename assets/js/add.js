// IMPORTS
import { calculateRemainingLeave, constructLeave, areLeavesValid, leavesIntersect, nameExists } from './helpers.js';

// ELEMENT SELECTORS
const elements = {
    anotherLeaveButton: document.querySelector('#add-extra-leave'),
    leavesDiv: document.querySelector('#leaves'),
}

// COUNTER SHOWING HOW MANY SEGMENTS TO ADD
let counter = 2;

// EVENT LISTENER FOR BUTTONS
document.querySelector('body').addEventListener('click', async (e) => {
    // ADD EXTRA GROUP OF LEAVE INPUTS
    if (e.target.id === 'add-extra-leave') {
        const div = document.createElement('div');
        const html = `<label for="leave-start-${counter}">Leave Start:</label><input type="date" name="leave-start-${counter}" id="leave-start-${counter}"><br><labelfor="leave-end-${counter}">Leave End:</label><input type="date" name="leave-end-${counter}" id="leave-end-${counter}"><br><button id="add-extra-leave">Add another leave</button>`;

        e.preventDefault();
        e.target.remove();

        // construct new div with leave inputs
        div.id = `leave-${counter}`;
        div.innerHTML = html;
        elements.leavesDiv.appendChild(div);
        counter++; // increase counter
    }

    // SUBMIT CREATED PERSON
    if (e.target.id === 'submit-btn') {
        const personData = {};
        const leaves = [];

        e.preventDefault();

        // CONSTRUCT PERSON DATA OBJECT TO SEND TO BACKEND
        for (let input of document.querySelectorAll('input')) {
            if (input.id === 'submit-btn') {
                continue;
            } else if (input.id === 'has-leave-this-year') {
                personData[input.id] = input.checked;
            } else if (input.id.startsWith('leave-end') || input.id.startsWith('leave-start')) {
                constructLeave(leaves, input);
            } else {
                personData[input.id] = input.value;
            }
            input.value = '';
        }

        // add restructured leave array to person data
        personData.leaves = leaves;
        
        // Retrieve limits for the year of person addition
        const currentYear = new Date().getFullYear();
        const leaveLimitsJSON = await fetch('http://localhost:3000/settings/lpe');
        const leaveLimitsJS = await leaveLimitsJSON.json();
        const currentYearLimit = leaveLimitsJS[currentYear];
        
        // Calculate and set remaining leave
        const remainingLeave = String(calculateRemainingLeave(personData.leaves, Number(personData['start-leave']), currentYearLimit, personData['has-leave-this-year']));
        personData['remaining-leave'] = remainingLeave;

        const repeatedName = await nameExists(personData.name);

        // Сheck validity of leaves for created person
        if (areLeavesValid(personData.leaves) && !leavesIntersect(personData.leaves) && !repeatedName) {
            // send data to backend
            fetch('http://localhost:3000/persons', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(personData)
            });

            // WRITE THEN STATEMENTS SHOWING SUCCESS
        } else if (!areLeavesValid(personData.leaves)) {
            // WRITE STATEMETS SHOWING FAILURE
            console.log('Provided leaves data is incorrect');
        } else if (leavesIntersect(personData.leaves)) {
            console.log('Dates overlap, please make sure you add distinct dates.');
        } else if (repeatedName) {
            console.log('User with such name already exists.');
        }
    }
})

