import fetch from 'node-fetch';

day9_2();


function day9_2() {
    getInputData().then((inputData) => {
        let diskMap = inputData.trim().split('').map(Number);

        const text2 = "2333133121414131402";
        //2 3 1 3 2 4 4 3 4 2
        // 3 3 3 1 1 1 1 1 0


        let disk = [];

        let i = 0;
        while( i < diskMap.length) {
            const isEven = i % 2 === 0;
            console.log(disk.toString());
            console.log(diskMap.toString());
            console.log(i);
            if (isEven) {
                const word = i / 2;
                for (let j = 0; j < diskMap[i]; j++) {disk.push(word.toString());}
                i++;      
            } else {
                const spaceToFit = diskMap[i];
                console.log(spaceToFit);
                const fitter = getFirstID2Fit(spaceToFit, diskMap, i);
                console.log(fitter);
                if (fitter === -1) {
                    for (let j = 0; j < spaceToFit; j++) {disk.push('.');}
                    i++;
                } else {
                    const spaceTaken = diskMap[fitter];
                    const value = fitter / 2;
                    console.log(spaceTaken);
                    console.log(value);
                    for (let j = 0; j < spaceTaken; j++) {disk.push(value.toString());}
                    diskMap[i] = spaceToFit - spaceTaken;
                    diskMap[fitter] = 0;
                    diskMap[fitter - 1] = diskMap[fitter - 1] + spaceTaken;
                }  
            }    
        }

        console.log(disk.toString());
        let checkSum = 0;

        // let l = nextSpace(0, disk);
        // let r = previousBlock(disk.length-1, disk);

        // while (l < r) {
        //     move(l, r, disk);
        //     l = nextSpace(l, disk);
        //     r = previousBlock(r, disk);
        // }

        for (let i = 0; i <= disk.length; i++) {
            if (disk[i] !== '.') {checkSum += i * parseInt(disk[i]);} 
        }

        console.log("THE SOLUTION FOR THE 9.2TH DAY OF CODE ADVENT IS: " + checkSum);
    });
}

function getFirstID2Fit(spaceToFit, diskMap, l) {
    let r = diskMap.length - 1;
    while ( r > l) {
        const isEven = r % 2 === 0;
        if (isEven && diskMap[r] > 0 && diskMap[r] <= spaceToFit) {return r;}
        r--;
    }
    return -1;
}

async function getInputData() {
    const url = 'https://adventofcode.com/2024/day/9/input';
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Cookie': 'session=53616c7465645f5f663e4c5d349d0b258f9ab873f091fc404dfcf2d383bfcf7b9f2df1c0960bcdc5b835cf1ce415b28a01bda75f4cc2d95800a73ca9bc6ab41b',
            },
        });

        if (!response.ok) { throw new Error(`HTTP error! Status: ${response.status}`); }

        const text = await response.text();
        const text2 = "2333133121414131402";
        //2 3 1 3 2 4 4 3 4 2
        // 3 3 3 1 1 1 1 1 0
        return text2;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}