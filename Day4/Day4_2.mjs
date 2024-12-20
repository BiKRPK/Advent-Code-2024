import fetch from 'node-fetch';

day4_2();

function day4_2() {
    getInputData().then((inputData) => {
        const dataArray = inputData.trim().split('\n');
        let nX_mas = 0;
        // 'A's can't be on a corner
        for (let x = 1; x < dataArray.length - 1; x++) {
            for (let y = 1; y < dataArray[x].length - 1; y++) {
                nX_mas += findX_mas(dataArray, x, y);
            }
        }
        console.log("THE SOLUTION FOR THE 4.2RD DAY OF CODE ADVENT IS: " + nX_mas);
    });
}

function findX_mas(inputData, x, y) {

    const currChar = inputData[x].charAt(y);
    if (currChar !== 'A') { return 0;}

    const ltChar = inputData[x-1].charAt(y-1);
    if (ltChar !== 'M' && ltChar !== 'S') {return 0;}

    const rbChar = inputData[x+1].charAt(y+1);
    if (rbChar !== 'M' && rbChar !== 'S') {return 0;}
    if (ltChar === rbChar) {return 0;}

    const rtChar = inputData[x+1].charAt(y-1);
    if (rtChar  !== 'M' && rtChar !== 'S') {return 0;}

    const lbChar = inputData[x-1].charAt(y+1);
    if (lbChar !== 'M' && lbChar !== 'S') {return 0;}
    if (rtChar == lbChar) {return 0;}

    return 1;
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