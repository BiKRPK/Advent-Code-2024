import fetch from 'node-fetch';

day5();


function day5() {
    getInputData().then((inputData) => {
        const dataArray = inputData.trim().split('\n\n');
        
        const orderRules = dataArray[0].split('\n');
        const before = [];
        const after = [];

        orderRules.forEach(rule => {
            const [bf, af] = rule.split('|');
            before.push(bf);
            after.push(af);
        });
        
        const updates = dataArray[1].split('\n');
        let sumMidCorrect = 0;
        let sumMidWrong = 0;
        for (let updateList of updates) {
            updateList = updateList.split(',');
            let orderedUpdateList = order([...updateList], before, after);
            if(sameOrder(updateList, orderedUpdateList)) {
                sumMidCorrect += parseInt(updateList[Math.floor(updateList.length / 2)]);
            } else {
                sumMidWrong += parseInt(orderedUpdateList[Math.floor(orderedUpdateList.length / 2)]);
            }
        }
        console.log("THE SOLUTION FOR THE 5TH DAY OF CODE ADVENT IS: " +  sumMidCorrect);
        console.log("THE SOLUTION FOR THE 5.2TH DAY OF CODE ADVENT IS: " + sumMidWrong);
    });
}

function sameOrder(updateList, orderedUpdateList) {
    for (let i = 0; i < updateList.length; i++) {
        if (updateList[i] !== orderedUpdateList[i]) {return false;}
    }
    return true;
}


function order(updateList, before, after) {
    if(updateList.length == 0) {return [];}
    let earliestNumber = -1;
    let found = false;
    let i = 0;

    while (i < updateList.length && !found) {
        let candidate = updateList[i];
        let j = 0;
        while (j < after.length && !(after[j] === candidate && updateList.includes(before[j]))) { 
            j++;
        }

        if (j == after.length ) {
            found = true;
            earliestNumber = candidate;
        }
        i++;
    }

    if (earliestNumber === -1) {return [];}

    updateList.splice(updateList.indexOf(earliestNumber), 1);

    return [earliestNumber].concat(order(updateList, before, after));
      
}

async function getInputData() {
    const url = 'https://adventofcode.com/2024/day/5/input';
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Cookie': 'session=53616c7465645f5f663e4c5d349d0b258f9ab873f091fc404dfcf2d383bfcf7b9f2df1c0960bcdc5b835cf1ce415b28a01bda75f4cc2d95800a73ca9bc6ab41b',
            },
        });

        if (!response.ok) { throw new Error(`HTTP error! Status: ${response.status}`); }

        const text = await response.text();
        return text;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}