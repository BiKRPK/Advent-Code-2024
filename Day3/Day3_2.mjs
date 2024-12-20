import { readFile } from 'fs/promises';
day3_2();

function day3_2() {
    //regexDo -> ( the info before the first do() or don't() ) | (the info between a do() and don't or end-$)             
    const regexDo = /^(.*?)(?=do\(\)|don't\(\))|do\(\)(.*?)(?=don't\(\)|$)/g;
    const regexMul = /mul\((\d{1,3}),(\d{1,3})\)/g;
    getInputData().then((inputData) => {
        const applyingText = [...inputData.matchAll(regexDo)];
        let finalSum = 0;
        let i = 1;
        for (const textpart of applyingText) {
            const allMulFindings = [...textpart[0].matchAll(regexMul)];

            for (const mul of allMulFindings) {
                finalSum += getMulResult(mul);
            }
        }
        
        console.log("THE SOLUTION FOR THE 3.2RD DAY OF CODE ADVENT IS: " + finalSum);
    }).catch((error => {
        console.error("Error in day4 code: ", error);
    }));
    
}

function getMulResult(mul) {
    return mul[1] * mul[2];
}

async function getInputData() {
    const data = await readFile('inputDataDay3.txt', 'utf8');
    return data;
}