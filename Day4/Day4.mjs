import fetch from 'node-fetch';

day4();

function day4() {
    getInputData().then((inputData) => {
        const dataArray = inputData.trim().split('\n');
        let nXmas = 0;
        for (let x = 0; x < dataArray.length; x++) {
            for (let y=0; y < dataArray[x].length; y++) {
                nXmas += findXmas(dataArray, x, y, 0);
            }
        }
        console.log("THE SOLUTION FOR THE 4RD DAY OF CODE ADVENT IS: " + nXmas);
    });
}

const seq = 'XMAS';

function findXmas(inputData, x, y, seqCursor, directionX, directionY) {
    
    if(x < 0 || x >= inputData.length || y < 0 || y >= inputData[x].length) {return 0;}
    const currChar = inputData[x].charAt(y);
    const expectedChar = seq.charAt(seqCursor);
    if (currChar === expectedChar) { 
        if (seqCursor === seq.length - 1) { return 1; }
        if (seqCursor > 0) { return findXmas(inputData, x + directionX, y + directionY, ++seqCursor, directionX, directionY)}
        seqCursor++;
        return findXmas(inputData, x-1, y-1, seqCursor, -1, -1) + findXmas(inputData, x, y-1, seqCursor, 0, -1) + findXmas(inputData, x+1, y-1, seqCursor, 1, -1) +
               findXmas(inputData, x-1, y, seqCursor, -1, 0)                                                    + findXmas(inputData, x+1, y, seqCursor, 1, 0) +
               findXmas(inputData, x-1, y+1, seqCursor, -1, 1)  + findXmas(inputData, x, y+1, seqCursor, 0, 1)  + findXmas(inputData, x+1, y+1, seqCursor, 1, 1);
    }
    return 0;
}


async function getInputData() {
    const url = 'https://adventofcode.com/2024/day/4/input';
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