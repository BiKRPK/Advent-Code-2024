import fetch from 'node-fetch';

day8();


function day8() {
    getInputData().then((inputData) => {
        const diagram = inputData.trim().split('\n').map(line => line.split(''));
        const solutionDiagram = [...diagram];

        const freqs = obtainFrequencies(diagram);

        let totalAntinodes = 0;
        freqs.forEach((antennas) => {
            totalAntinodes += obtainAntinodes([...antennas], solutionDiagram);
        });

        console.log("THE SOLUTION FOR THE 8TH DAY OF CODE ADVENT IS: " + totalAntinodes);
    });
}

function obtainAntinodes(antennas, solutionDiagram) {
    let nAntinodes = 0;
    while (antennas.length) {
        const antenna = antennas.shift();
        for (let otherAntenna of antennas) {

            const antinode1 = {
                x: otherAntenna.x - (antenna.x - otherAntenna.x),
                y: otherAntenna.y - (antenna.y - otherAntenna.y)
            };

            const antinode2 = {
                x: antenna.x - (otherAntenna.x - antenna.x),
                y: antenna.y - (otherAntenna.y - antenna.y)
            };

            nAntinodes += addAntinode(antinode1, solutionDiagram);
            nAntinodes += addAntinode(antinode2, solutionDiagram);
        }
    }
    return nAntinodes;
}

function addAntinode(antinode, solutionDiagram) {
    const isOutOfBounds = antinode.y < 0 || antinode.y >= solutionDiagram.length || antinode.x < 0 || antinode.x >= solutionDiagram[antinode.y].length;
    if (isOutOfBounds) {return 0;}
    const alreadyAntinode = solutionDiagram[antinode.y][antinode.x] === '#';
    if (alreadyAntinode) {return 0;}

    solutionDiagram[antinode.y][antinode.x] = '#';
    return 1;
}

function obtainFrequencies(diagram) {
    const freqs = new Map();
    for (let y = 0; y < diagram.length; y++) {
        for (let x = 0; x < diagram[y].length; x++) {
            const val = diagram[y][x];
            const isAntenna = val !== '.' && val !== '#';
            if (isAntenna) {
                if (!freqs.has(val)) {
                    freqs.set(val, []);
                }
                const coords = {
                    x: x,
                    y: y
                };
                freqs.get(val).push(coords);
            }
        }
    }
    return freqs;
}

async function getInputData() {
    const url = 'https://adventofcode.com/2024/day/8/input';
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Cookie': 'session=53616c7465645f5f663e4c5d349d0b258f9ab873f091fc404dfcf2d383bfcf7b9f2df1c0960bcdc5b835cf1ce415b28a01bda75f4cc2d95800a73ca9bc6ab41b',
            },
        });

        if (!response.ok) { throw new Error(`HTTP error! Status: ${response.status}`); }

        const text = await response.text();
        const text2 = "............\n" +
        "........0...\n" +
        ".....0......\n" +
        ".......0....\n" +
        "....0.......\n" +
        "......A.....\n" +
        "............\n" +
        "............\n" +
        "........A...\n" +
        ".........A..\n" +
        "............\n" +
        "............";

        return text;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}