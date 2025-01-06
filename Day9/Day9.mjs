import fetch from 'node-fetch';

day9();


function day9() {
    getInputData().then((inputData) => {
        let diskMap = inputData.trim().split('');

        let disk = [];

        let id = 0;
        for (let i = 0; i < diskMap.length; i++) {
            let word = '.';
            const isEven = i % 2 === 0;

            if (isEven) {
                word = id.toString();
                id++;
            } 

            for (let j = 0; j < parseInt(diskMap[i]); j++) {disk.push(word);}
        }


        let checkSum = 0;

        let l = nextSpace(0, disk);
        let r = previousBlock(disk.length-1, disk);

        while (l < r) {
            move(l, r, disk);
            l = nextSpace(l, disk);
            r = previousBlock(r, disk);
        }

        for (let i = 0; i <= r; i++) {
            checkSum += i * parseInt(disk[i]);
        }

        console.log("THE SOLUTION FOR THE 9TH DAY OF CODE ADVENT IS: " + checkSum);
    });
}

function move(l, r, disk) {
    disk[l] = disk[r];
    disk[r] = '.';
}

function nextSpace(l, disk) {
    while (disk[l] !== '.' || l === disk.length - 1) {
        l++;
    }

    return l;
}

function previousBlock(r, disk) {
    while (disk[r] === '.' || r === 0) {
        r--;
    }

    return r;
}

// function nextSpace(l, disk) {
//     if (disk[l] === '.' || l === disk.length - 1) {
//         return l;
//     }
//     return nextSpace(l+1, disk);
// }

// function previousBlock(r, disk) {
//     if (disk[r] !== '.' || r === 0) {
//         return r;
//     }
//     return previousBlock(r-1, disk);
// }

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

        return text;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}