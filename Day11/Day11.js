day11();


function day11() {
    let stones = getStones();
    const blinks = 25;
    console.log(`Initial arrangement:\n ${stones}`);

    for (let i = 1; i <= blinks; i++) {
        stones = blink(stones);
        //console.log(stones.length);
        //console.log(`After ${i} blink:\n ${stones}`);
    }

    console.log("THE SOLUTION FOR THE 11TH DAY OF CODE ADVENT IS: " + stones.length);
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