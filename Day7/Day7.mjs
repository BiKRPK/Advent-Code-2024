import fetch from 'node-fetch';

day7();


function day7() {
    getInputData().then((inputData) => {
        const operations = inputData.trim().split('\n');
        let solution = 0;
        let solution2 = 0;

        for (const operation of operations) {
            const split = operation.split(':');
            const result = parseInt(split[0]);
            const operators = split[1].trim().split(" ").map(Number);

            if (isEquation(result, [...operators], 0)) {
                solution += result;
            }

            if (isEquation2(result, [...operators], 0, "")) {
                solution2 += result;
            }


        }

        
        console.log("THE SOLUTION FOR THE 7TH DAY OF CODE ADVENT IS: " + solution);
        console.log("THE SOLUTION FOR THE 7.2TH DAY OF CODE ADVENT IS: " + solution2);
    });
}

function isEquation(result, operators, acc) {
    if (operators.length === 0) {
        return result === acc;
    }

    if (acc > result) {
        return false;
    }

    const operator = operators.shift();

    if (acc > 0) {
        return isEquation(result, [...operators],  acc + operator) || isEquation(result, [...operators],  acc * operator); 
    } else {
        const operator2 = operators.shift();
        return isEquation(result, [...operators], operator + operator2) || isEquation(result, [...operators], operator * operator2);
    }
}

function isEquation2(result, operators, acc) {
    if (operators.length === 0) {
        return result === acc;
    }
    
    if (acc > result) {
        return false;
    }

    const operator = operators.shift();

    if (acc > 0) {
        return isEquation2(result, [...operators],  acc + operator) || 
               isEquation2(result, [...operators],  acc * operator) || 
               isEquation2(result, [...operators],  parseInt(acc + '' + operator)); 
    } else {
        const operator2 = operators.shift();
        return isEquation2(result, [...operators], operator + operator2) || 
               isEquation2(result, [...operators], operator * operator2) || 
               isEquation2(result, [...operators],  parseInt(operator + '' + operator2)) ;
    }
}

async function getInputData() {
    const url = 'https://adventofcode.com/2024/day/7/input';
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Cookie': 'session=53616c7465645f5f663e4c5d349d0b258f9ab873f091fc404dfcf2d383bfcf7b9f2df1c0960bcdc5b835cf1ce415b28a01bda75f4cc2d95800a73ca9bc6ab41b',
            },
        });

        if (!response.ok) { throw new Error(`HTTP error! Status: ${response.status}`); }

        const text = await response.text();
        const text2 = "190: 10 19\n" +
        "3267: 81 40 27\n" +
        "83: 17 5\n" +
        "156: 15 6\n" +
        "7290: 6 8 6 15\n" +
        "161011: 16 10 13\n" +
        "192: 17 8 14\n" +
        "21037: 9 7 18 13\n" +
        "292: 11 6 16 20";

        return text;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}