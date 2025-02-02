day10();


function day10() {
    const solution = totalTrailheadScore();
    console.log("THE SOLUTION FOR THE 10TH DAY OF CODE ADVENT IS: " + solution);
}

function getTrailmap() {
    const inputData = getInputData();
    const trailMap = inputData.trim().split('\n').map(line => line.split('').map(Number));
    return trailMap;
}

function getAllStartingPositions(trailMap) {
    const sPositions = [];
    for (let y = 0; y < trailMap.length; y++) {
        for (let x = 0; x < trailMap[y].length; x++) {
            const isSPos = trailMap[y][x] === 0;
            if (isSPos) {
                const pos = {
                    x: x,
                    y: y
                }
                sPositions.push(pos);
            }
        }
    }
    return sPositions;
}

function totalTrailheadScore() {
    const trailMap = getTrailmap();
    const sPositions = getAllStartingPositions(trailMap);
    let totalScore = 0;
    for (const sPosition of sPositions) {
        totalScore += getTrailheadScore(trailMap, sPosition, 0, []);
    }
    return totalScore;
}

function isDifferentPeak(peak, heads) {
    for (let head of heads) {
        if (head.x === peak.x && head.y === peak.y) {
            return false;
        }
    }
    return true;
}

function getTrailheadScore(trailMap, position, height, heads) {
    if (height === 9) {
        //Comentar en la parte 2
        // if (!isDifferentPeak(position, heads)) {
        //     return 0;
        // }
        return 1;
    }

    let moves = 0;
    const directions = [[0, -1], [1, 0], [0, 1], [-1, 0]];
    for (const direction of directions) {
        const nextPosition = {
            x: position.x + direction[0],
            y: position.y + direction[1]
        }

        const isOutOfBounds = nextPosition.y < 0 || nextPosition.y >= trailMap.length || nextPosition.x < 0 || nextPosition.x >= trailMap[0].length;

        if (!isOutOfBounds) {
            const nextHeight = trailMap[nextPosition.y][nextPosition.x];
            const isReachable = height + 1 === nextHeight;
            if (isReachable) {moves += getTrailheadScore(trailMap, nextPosition, nextHeight, heads);}
        }
    }
    return moves;    
}

function getInputData() {
    return  "1098921121187650126589432104301010017898\n" +
            "2347810030090543237676546765218921326323\n" +
            "3256723345121789078545345896237635495410\n" +
            "0189654656230650129454210910146546786898\n" +
            "1018706787649843212323407893056544576781\n" +
            "0123215498556764501012216324567033675410\n" +
            "1054912389440189650983345413498122189323\n" +
            "2367804322339218761874214102439232075014\n" +
            "3494565011878307010965302101521001456985\n" +
            "4583876910965498123434456517617652327876\n" +
            "9672978894328767894525467898908543410434\n" +
            "8701569765419456987616321010119654306523\n" +
            "7616054100300345865407890121236701217810\n" +
            "4567123231201210870301456290547896332912\n" +
            "3258834998303456961210387787678987441003\n" +
            "4109985867214327898341295689432196556764\n" +
            "3457876754321016987654254776501001105895\n" +
            "2568965698130123216510163897567232234996\n" +
            "1077654147010154105425672198498143497887\n" +
            "2089503056923269012334789010398056786546\n" +
            "1123412147874678901109011001267049805430\n" +
            "0109892130965165210278921123452121012321\n" +
            "1236783021089014321367630038983430328901\n" +
            "0345634569870156752456541127604589437610\n" +
            "1267825478763247843898430934510678576523\n" +
            "3216910089654130956707321874321987689430\n" +
            "4505432198703021013210012365899654238321\n" +
            "3699801789012982787309898456718723148980\n" +
            "2789789678101276896456721032100210057671\n" +
            "1008650521010345785454434549321321060362\n" +
            "2210541430121289890365410678732639871250\n" +
            "4341232510537656701274320521548747898341\n" +
            "1056341423498545432789201230699656743432\n" +
            "2967650345567230101687112345788745234569\n" +
            "3878981236750121211096001296787230199678\n" +
            "4589870109889032349125410187590123288767\n" +
            "5679665010976541498934231095691054177678\n" +
            "3038754129889650587432145654782567065549\n" +
            "2125603236778765676501098723123478450030\n" +
            "3034512345654656565410181010010989321121\n";
}

function getTestData() {
    return  "9990999\n" +
            "9991999\n" +
            "9992999\n" +
            "6543456\n" +
            "7999997\n" +
            "8111118\n" +
            "9111119\n";
}

function getLargerExample() {
    return  "89010123\n" +
            "78121874\n" +
            "87430965\n" +
            "96549874\n" +
            "45678903\n" +
            "32019012\n" +
            "01329801\n" +
            "10456732\n";
}