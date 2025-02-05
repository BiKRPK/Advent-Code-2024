day11_2();


function day11_2() {
    let stones = getStones();
    const blinks = 25;
    console.log(`Initial arrangement:\n ${stones}`);

    const solution = recursiveTransform(stones, blinks) 

    console.log("THE SOLUTION FOR THE 11TH DAY OF CODE ADVENT IS: " + solution);
}



function getStones() {
    const inputData = getInputData();
    const stones = inputData.trim().split(' ').map(Number);
    return stones;
}

function blink(stones) {
    let evolvedStones = [];
    for(let stone of stones) {
        evolvedStones.push(...transform(stone));
    }
    return evolvedStones;
}

function recursiveTransform(stones, blinks) {
    if (blinks > 0) {
        let call = 0;
        for(let stone of stones) {
           call += recursiveTransform(transform(stone), blinks - 1)
        }
        return call;
    }
    return stones.length;
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


function getInputData() {
    return "30 71441 3784 580926 2 8122942 0 291";
}

function getTestData() {
    return  "125 17";
}