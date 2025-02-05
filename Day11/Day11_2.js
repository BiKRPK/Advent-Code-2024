var dejavu = new Map();
var contable = new Map();
day11_2();

function day11_2() {
    let stones = getStones();
    const blinks = 75;
    console.log(`Initial arrangement:\n ${stones}`);

    for (let stone of stones) {
        if (contable.has(stone)) {
            contable.set(stone, contable.get(stone) + 1);
        } else {
            contable.set(stone, 1);
        }
    }
    
    for (let i = 1; i <= blinks; i++) {
        blinkContable();
    }
    //const solution = recursiveTransform(stones, blinks) 
    let solution = 0;
    contable.forEach((count) => {
        solution += count;
    });
    console.log("THE SOLUTION FOR THE 11TH DAY OF CODE ADVENT IS: " + solution);
}

function blinkContable() {
    let aux = new Map();

    for (let [stone, count] of contable) {
        let res = getOrSet(stone);

        res.forEach(function(newStone) {
            if (aux.has(newStone)) {
                aux.set(newStone, aux.get(newStone) + count);
            } else {
                aux.set(newStone, count);
            }
        });
    }

    contable = aux;
}

function getStones() {
    const inputData = getInputData();
    const stones = inputData.trim().split(' ').map(Number);
    return stones;
}

function blinkContable() {
    let aux = new Map();

    for (let [stone, count] of contable) {
        let res = getOrSet(stone);

        res.forEach(function(newStone) {
            if (aux.has(newStone)) {
                aux.set(newStone, aux.get(newStone) + count);
            } else {
                aux.set(newStone, count);
            }
        });
    }

    contable = aux;
}

function getOrSet(stone) {
    if (dejavu.has(stone)) { return dejavu.get(stone); } 

    let res = transform(stone);
    dejavu.set(stone, res);
    return res;
}

function transform(stone){
    if (stone === 0) {return [1]}
    const stoneStr = stone.toString();
    if (stoneStr.length % 2 === 0) {
        const mid = Math.floor(stoneStr.length / 2);
        const firstHalf = parseInt(stoneStr.slice(0, mid), 10);
        const secondHalf = parseInt(stoneStr.slice(mid), 10);
        return [firstHalf, secondHalf];
    }
    return [stone * 2024];
}


function blink(stones) {
    let evolvedStones = [];
    for(let stone of stones) {
        evolvedStones.push(...getOrSet(stone));
    }
    return evolvedStones;
}

function recursiveTransform(stones, blinks) {
    if (blinks > 0) {
        let call = 0;
        for(let stone of stones) {
           call += recursiveTransform(getOrSet(stone), blinks - 1)
        }
        return call;
    }
    return stones.length;
}


function getInputData() {
    return "30 71441 3784 580926 2 8122942 0 291";
}

function getTestData() {
    return  "125 17";
}