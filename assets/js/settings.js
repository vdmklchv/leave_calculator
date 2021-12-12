// IMPORTS
import { createTableCell } from "./helpers.js";

// ELEMENT SELECTORS
const elements = {
    lpeTableBody: document.querySelector('#lpe-table-body'),
}

// IMPORT YEAR LIMIT FROM BACKEND AND CREATE TABLE DATA TO SHOW ON SETTINGS PAGE
const fetchYearLimit = async () => {
    try {
        const result = await fetch('http://localhost:3000/settings/lpe');
        const data = await result.json();

        elements.lpeTableBody.innerHTML = '';

        for (let [key, value] of Object.entries(data)) {
            const yearTableCell = createTableCell(key);
            const limitTableCell = createTableCell(value);
            const tr = document.createElement('tr');
            tr.id = `${key}-row`;
            tr.appendChild(yearTableCell);
            tr.appendChild(limitTableCell);
            const updateInput = document.createElement('input');
            updateInput.id = `${key}-update-input`;
            updateInput.placeholder = 'New year limit...';
            tr.appendChild(updateInput);
            const updateButton = document.createElement('button');
            updateButton.id = `${key}-update-button`;
            updateButton.textContent = 'Update';
            tr.appendChild(updateButton);
            elements.lpeTableBody.appendChild(tr);
        }
    } catch (e) {
        console.log(e);
    }   
}

// UPDATE YEAR LIMIT
const updateYearLimit = async (newLimit, year) => {
    if (newLimit && year) {
        const response = await fetch('http://localhost:3000/settings/lpe');
        const limits = await response.json();
        limits[year] = Number(newLimit);
        await fetch('http://localhost:3000/settings/lpe', {
            method: 'post',
            body: JSON.stringify(limits),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        fetchYearLimit(); // recreate table data if update has taken place
    }
}

// LISTEN TO UPDATES AND UPDATE YEAR LIMIT IF IT HAPPENS
elements.lpeTableBody.addEventListener('click', async (e) => {
    if (e.target.id.endsWith('-update-button')) {
        const year = e.target.id.split('-')[0];
        const newLimit = document.querySelector(`input[id="${year}-update-input"]`).value;
        await updateYearLimit(newLimit, year);
    }
})

fetchYearLimit();
