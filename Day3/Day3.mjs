import { readFile } from 'fs/promises';
day3();

function day3() {
    const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    getInputData().then((inputData) => {
        const allMulFindings = [...inputData.matchAll(regex)];
        
        let finalSum = 0;
        for (const mul of allMulFindings) {
            finalSum += getMulResult(mul);
        }
        console.log("THE SOLUTION FOR THE 3RD DAY OF CODE ADVENT IS: " + finalSum);
    }).catch((error => {
        console.error("Error in day3 code: ", error);
    }));
    
}

function getMulResult(mul) {
    return mul[1] * mul[2];
}

async function getInputData() {
    const data = await readFile('inputDataDay3.txt', 'utf8');
    return data;
}


