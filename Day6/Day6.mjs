import fetch from 'node-fetch';

day6();


function day6() {
    getInputData().then((inputData) => {
        const map = inputData.trim().split('\n').map(line => line.split(''));
        const initialPosition = findStart(map);
        const problem = {
            map,
            visited: 1,
            position: initialPosition,
            direction: { x: 0, y: -1 },
            ended: false,
            lastChanges: [],
            loops: 0,
        };

        while (!problem.ended) {
            move(problem);
        }
        
        console.log("THE SOLUTION FOR THE 6TH DAY OF CODE ADVENT IS: " + problem.visited);
        console.log("THE SOLUTION FOR THE 6.2TH DAY OF CODE ADVENT IS: " + problem.loops);

    });
}

function move(problem) {
    

    let nextStep = {
        x: problem.position.x + problem.direction.x,
        y: problem.position.y + problem.direction.y,
    };

    let nextSquare = getSquare(problem.map, nextStep);
    
    switch (nextSquare) {
        case square.end:
            problem.ended = true;
            problem.ending = "Out";
        break;
        
        case square.obstruction:
            changeDirection(problem);
        break;

        default:
            if(problem.loops !== undefined) {   
                checkHypoteticalLoop(problem);
            } else {
               if(isLoop(problem)) {
                    problem.ended = true;
                    problem.ending = "Loop";
               }
            }
            problem.position = nextStep;
    }
    visitPosition(problem);
}

function isLoop(problem) {
    const dejavu = problem.lastChanges.filter( function (position, index) {
        const posibilityDirection =  getDirection(index);
        return posibilityDirection.x == problem.direction.x && posibilityDirection.y === problem.direction.y &&
               problem.position.x === position.x && problem.position.y === position.y;
    });

    return dejavu.length > 0;
}

const square = {
    obstruction: '#',
    clear: '.',
    visited: 'X',
    end: 'GG'
}

function getSquare(map, coords) {
    if (coords.y < 0 || coords.x < 0 || coords.y > map.length - 1 || coords.x > map[coords.y].length - 1) {return square.end}
    return map[coords.y][coords.x];
}

function visitPosition(problem) {
    const currentSquare = getSquare(problem.map, problem.position);
    if (currentSquare === square.clear) {
      problem.map[problem.position.y][problem.position.x] = square.visited;
      problem.visited++;
    }
  }

function findStart(map) {
    let x = 0;
    let y = 0;
    let found = false;
    while (y < map.length && !found) {
        x = map[y].indexOf('^');

        if ( x != -1 ) {
            found = true;
        } else {
            y++;
        }     
    }

    if (found) {
        return {x, y};
    }
}

function changeDirection(problem) {
    const x = problem.direction.x;
    if (x == 0) {     
        problem.direction.x = problem.direction.y * -1;
        problem.direction.y = x;
    } else {
        problem.direction.x = problem.direction.y;
        problem.direction.y = x;
    }

    problem.lastChanges.push(problem.position);
}

function followingDirection(direction) {
    const x = direction.x;
    if (x == 0) {     
        direction.x = direction.y * -1;
        direction.y = x;
    } else {
        direction.x = direction.y;
        direction.y = x;
    }
    return direction;
}

function getDirection(index) {
    const mod = index % 4;
    switch (mod) {
        

        case 0:
            return { x: 0, y: -1 };
        break;

        case 1:
            return { x: 1, y: 0 };
        break;

        case 2:
            return { x: 0, y: 1 };
        break;

        case 3:
            return { x: -1, y: 0 };
        break;
    }
}

function checkHypoteticalLoop(problem) {
    const obstaclePosition = {x: problem.position.x + problem.direction.x, y: problem.position.y + problem.direction.y};
    const obstaclePosValue = getSquare(problem.map, obstaclePosition);

    if (obstaclePosValue !== square.end && obstaclePosValue !== square.obstruction) {

        const hypoteticalProblem = {
            map: JSON.parse(JSON.stringify(problem.map)),
            position: { ...problem.position},
            direction: { ...problem.direction},
            ended: false,
            lastChanges: [],
            visited: 1,
            ending: "Running"
        };

        hypoteticalProblem.map[hypoteticalProblem.position.y][hypoteticalProblem.position.x] = 'E';
        hypoteticalProblem.map[obstaclePosition.y][obstaclePosition.x] = '#';

        while (!hypoteticalProblem.ended) {
            move(hypoteticalProblem);
        }

        if (hypoteticalProblem.ending === 'Loop') {
            problem.loops++;
            problem.map[obstaclePosition.y][obstaclePosition.x] = '0';
        }
    }
}

// function checkLoop2(problem) {

//     const obstaclePosition = {x: problem.position.x + problem.direction.x, y: problem.position.y + problem.direction.y};
//     const obstaclePosValue = getSquare(problem.map, obstaclePosition);

//     if (obstaclePosValue !== square.end && obstaclePosValue !== square.obstruction) {
//         let directionAux = { ...problem.direction };        
//         let positionAux = { ...problem.position };
//         let lastChangesAux = [...problem.lastChanges];

//         lastChangesAux.push({ ...positionAux});
//         followingDirection(directionAux);

//         let endFound = false;
//         let isLoop = false;

//         while (!endFound && !isLoop) {
            
//             positionAux.x += directionAux.x;
//             positionAux.y += directionAux.y;

//             const nextStep = getSquare(problem.map, positionAux);
//             const obstructionFound = nextStep === square.obstruction;
//             endFound = nextStep === square.end;

//             if (obstructionFound) {
//                 positionAux.x -= directionAux.x;
//                 positionAux.y -= directionAux.y;

//                 lastChangesAux.push({...positionAux});
//                 followingDirection(directionAux);
//             } else if (!endFound ) {
//                 //problem.map[obstaclePosition.y][obstaclePosition.x] = '1';
                
//                 const posibilities = lastChangesAux.filter( function (_, index) {
//                     const posibilityDirection =  getDirection(index);
//                     return posibilityDirection.x == directionAux.x && posibilityDirection.y == directionAux.y;
//                 });
                
//                 for (let posibility of posibilities) {
                
//                     if(posibility.x === positionAux.x && posibility.y === positionAux.y ) {
                        
//                         problem.loops++;
//                         isLoop = true;
//                         problem.map[obstaclePosition.y][obstaclePosition.x] = '0';
//                     }
        
//                 }
    
//             }
//         }
//     }
// }

async function getInputData() {
    const url = 'https://adventofcode.com/2024/day/6/input';
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Cookie': 'session=53616c7465645f5f663e4c5d349d0b258f9ab873f091fc404dfcf2d383bfcf7b9f2df1c0960bcdc5b835cf1ce415b28a01bda75f4cc2d95800a73ca9bc6ab41b',
            },
        });

        if (!response.ok) { throw new Error(`HTTP error! Status: ${response.status}`); }

        const text = await response.text();
        const text2 = "....#.....\n" +
        ".........#\n" +
        "..........\n" +
        "..#.......\n" +
        ".......#..\n" +
        "..........\n" +
        ".#..^.....\n" +
        "........#.\n" +
        "#.........\n" +
        "......#...\n";

        return text2;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}