// IMPORTS
import { createTableCell, dateToString, calculateRemainingLeave } from "./helpers.js";

// ELEMENT SELECTORS
const elements = {
    mainTable: document.querySelector('#main-table'),
    yearSelect: document.querySelector('#year-select'),
    mainTableBody: document.querySelector('#main-table-body'),
}

// loadYearData allows to retrieve and display all persons that have leave data for selected year 
const loadYearData = async () => {
    try {
        elements.mainTableBody.innerHTML = '';
        
        // retrieve person data for selected year
        const selectedYear = elements.yearSelect.value;
        const response = await fetch(`http://localhost:3000/years/${selectedYear}`);
        const data = await response.json();

        for (let person of data) {
            // create unordered list and table row to construct data
            const tableRow = document.createElement('tr');
            const list = document.createElement('ul');

            // construct data for table
            const leaveOnYearStart = Number(person.leaves[selectedYear].leaveOnYearStart);
            tableRow.appendChild(createTableCell(leaveOnYearStart));

            const name = person.name;
            tableRow.appendChild(createTableCell(name));

            const leaves = person.leaves[selectedYear].leaves;

            
            for (let leave of leaves) {
                const start = new Date(leave.leaveStart);
                const end = new Date(leave.leaveEnd);
                const startString = dateToString(start);
                const endString = dateToString(end);
                const li = document.createElement('li');
                li.textContent = `${startString} - ${endString}`;
                list.appendChild(li);
            }

            tableRow.appendChild(list);

            // fetch leave limit for selected year
            const leaveForYearJSON = await fetch('http://localhost:3000/settings/lpe');
            const leaveForYearJS = await leaveForYearJSON.json();
            const leaveForYear = Number(leaveForYearJS[selectedYear]);

            // convert current leave structure to one that can be used with calculateRemaingLeave
            const leavesAltered = person.leaves[selectedYear].leaves;
            
            // recalculate remaining leave on each page load
            const leaveOnYearEnd = calculateRemainingLeave(leavesAltered, leaveOnYearStart, leaveForYear);
            tableRow.appendChild(createTableCell(leaveOnYearEnd));

            elements.mainTableBody.appendChild(tableRow);
        }
    } catch (e) {
        console.log(e);
    }   
}

// run table construction and creation on every page load
loadYearData();

// run table construction and creation on selected year change
elements.yearSelect.addEventListener('change', () => {
    loadYearData();
})