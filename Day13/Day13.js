var is2ndPart = true;
day13();

function day13() {
    const systems = getSystems();
    let solution = 0;
    for (system of systems) {
        solution += calculateCost(solveSystem(system));
    }
    console.log("THE SOLUTION FOR THE 13TH DAY OF CODE ADVENT IS: " + solution);
}

function getSystems() {
    const inputData = getInputData();
    const machines = inputData.trim().split("\r");
    const systems = [];
    for (machine of machines) {
        const numbers = extractNumbers(machine);

        // const EquationSystem = {
        //     coefficient1: [numbers[0], numbers[2]],
        //     coefficient2: [numbers[1], numbers[3]],
        //     constants: [numbers[4], numbers[5]]
        // }
        const offset = is2ndPart ? Math.pow(10, 13) : 0;
        const EquationSystem = {
            a1: numbers[0],
            a2: numbers[1],
            b1: numbers[2],
            b2: numbers[3],
            c1: numbers[4] + offset,
            c2: numbers[5] + offset,
        }
        systems.push(EquationSystem);
    }
    
    return systems;
}

function extractNumbers(machine) {
    const regex = /-?\d+(\.\d+)?/g;
    const numbers = machine.match(regex);
    return numbers ? numbers.map(Number) : [];
}

// function solveSystem(system) {
//     const math = require('mathjs');
//     const coefficients = [
//         system.coefficient1,
//         system.coefficient2
//     ];
//     const constants = system.constants;

//     const solutions = math.lusolve(coefficients, constants);
//     console.log(solutions[0][0] + ", " + solutions[1][0]);
//     const a = Math.round(solutions[0][0]);
//     const b = Math.round(solutions[1][0]);
//     console.log(a + ", " + b);
//     const solution = {
//         a: a,
//         b: b 
//     }
//     return solution;
// }

function solveSystem(system) {
    const d = system.a1 * system.b2 - system.a2 * system.b1;
    const d_x = system.c1 * system.b2 - system.c2 * system.b1;
    const d_y = system.a1 * system.c2 - system.a2 * system.c1;
    const a = Math.round(d_x / d);
    const b = Math.round(d_y / d);

    const isNegative = a < 0 || b < 0;
    const tooMuchTimes = is2ndPart ? false : a > 100 || b > 100;
    const floatingPointError = a * system.a1 + b * system.b1 != system.c1 || a * system.a2 + b * system.b2 != system.c2;
    if (isNegative || tooMuchTimes || floatingPointError) { return false; }

    const solution = {
        a: a,
        b: b 
    }
    return solution;
}

function calculateCost(solution) {
    // if (solution.a < 0 || solution.a > 100 || solution.b < 0 || solution.b > 100) { return 0;}
    if (!solution) {return 0;}
    return solution.a * 3 + solution.b;
}

function getInputData() {
    return  "Button A: X+43, Y+21\n" +
            "Button B: X+16, Y+31\n" +
            "Prize: X=6735, Y=9135\n" +
            "\r" +
            "Button A: X+52, Y+55\n" +
            "Button B: X+69, Y+11\n" +
            "Prize: X=2798, Y=1100\n" +
            "\r" +
            "Button A: X+13, Y+32\n" +
            "Button B: X+68, Y+24\n" +
            "Prize: X=8243, Y=3816\n" +
            "\r" +
            "Button A: X+97, Y+34\n" +
            "Button B: X+72, Y+97\n" +
            "Prize: X=5459, Y=6291\n" +
            "\r" +
            "Button A: X+66, Y+14\n" +
            "Button B: X+81, Y+77\n" +
            "Prize: X=5910, Y=3766\n" +
            "\r" +
            "Button A: X+65, Y+77\n" +
            "Button B: X+82, Y+24\n" +
            "Prize: X=8533, Y=3599\n" +
            "\r" +
            "Button A: X+63, Y+47\n" +
            "Button B: X+16, Y+39\n" +
            "Prize: X=852, Y=798\n" +
            "\r" +
            "Button A: X+55, Y+26\n" +
            "Button B: X+25, Y+43\n" +
            "Prize: X=7660, Y=5943\n" +
            "\r" +
            "Button A: X+67, Y+24\n" +
            "Button B: X+16, Y+39\n" +
            "Prize: X=14214, Y=10004\n" +
            "\r" +
            "Button A: X+48, Y+15\n" +
            "Button B: X+27, Y+74\n" +
            "Prize: X=18569, Y=15096\n" +
            "\r" +
            "Button A: X+21, Y+47\n" +
            "Button B: X+35, Y+14\n" +
            "Prize: X=5744, Y=8521\n" +
            "\r" +
            "Button A: X+17, Y+52\n" +
            "Button B: X+45, Y+24\n" +
            "Prize: X=8468, Y=6452\n" +
            "\r" +
            "Button A: X+21, Y+46\n" +
            "Button B: X+46, Y+29\n" +
            "Prize: X=8178, Y=8364\n" +
            "\r" +
            "Button A: X+27, Y+11\n" +
            "Button B: X+15, Y+37\n" +
            "Prize: X=11861, Y=1287\n" +
            "\r" +
            "Button A: X+17, Y+67\n" +
            "Button B: X+61, Y+21\n" +
            "Prize: X=12721, Y=12321\n" +
            "\r" +
            "Button A: X+44, Y+11\n" +
            "Button B: X+11, Y+74\n" +
            "Prize: X=6249, Y=12411\n" +
            "\r" +
            "Button A: X+43, Y+32\n" +
            "Button B: X+13, Y+53\n" +
            "Prize: X=2683, Y=5636\n" +
            "\r" +
            "Button A: X+20, Y+71\n" +
            "Button B: X+62, Y+19\n" +
            "Prize: X=5542, Y=7049\n" +
            "\r" +
            "Button A: X+65, Y+74\n" +
            "Button B: X+81, Y+12\n" +
            "Prize: X=5962, Y=6226\n" +
            "\r" +
            "Button A: X+45, Y+78\n" +
            "Button B: X+71, Y+28\n" +
            "Prize: X=4747, Y=5186\n" +
            "\r" +
            "Button A: X+32, Y+13\n" +
            "Button B: X+24, Y+54\n" +
            "Prize: X=10280, Y=15794\n" +
            "\r" +
            "Button A: X+40, Y+15\n" +
            "Button B: X+15, Y+46\n" +
            "Prize: X=3525, Y=1689\n" +
            "\r" +
            "Button A: X+98, Y+30\n" +
            "Button B: X+15, Y+24\n" +
            "Prize: X=10374, Y=4806\n" +
            "\r" +
            "Button A: X+84, Y+37\n" +
            "Button B: X+11, Y+52\n" +
            "Prize: X=6398, Y=13946\n" +
            "\r" +
            "Button A: X+20, Y+63\n" +
            "Button B: X+74, Y+28\n" +
            "Prize: X=7852, Y=19121\n" +
            "\r" +
            "Button A: X+56, Y+21\n" +
            "Button B: X+41, Y+77\n" +
            "Prize: X=4084, Y=2755\n" +
            "\r" +
            "Button A: X+24, Y+66\n" +
            "Button B: X+76, Y+48\n" +
            "Prize: X=3704, Y=4068\n" +
            "\r" +
            "Button A: X+23, Y+91\n" +
            "Button B: X+59, Y+21\n" +
            "Prize: X=840, Y=1624\n" +
            "\r" +
            "Button A: X+55, Y+13\n" +
            "Button B: X+58, Y+66\n" +
            "Prize: X=6299, Y=2953\n" +
            "\r" +
            "Button A: X+72, Y+37\n" +
            "Button B: X+11, Y+47\n" +
            "Prize: X=5838, Y=5729\n" +
            "\r" +
            "Button A: X+11, Y+25\n" +
            "Button B: X+47, Y+13\n" +
            "Prize: X=8669, Y=3911\n" +
            "\r" +
            "Button A: X+91, Y+12\n" +
            "Button B: X+41, Y+54\n" +
            "Prize: X=3844, Y=4200\n" +
            "\r" +
            "Button A: X+54, Y+30\n" +
            "Button B: X+27, Y+93\n" +
            "Prize: X=4050, Y=2562\n" +
            "\r" +
            "Button A: X+37, Y+95\n" +
            "Button B: X+78, Y+30\n" +
            "Prize: X=5333, Y=2455\n" +
            "\r" +
            "Button A: X+56, Y+23\n" +
            "Button B: X+15, Y+29\n" +
            "Prize: X=1544, Y=3765\n" +
            "\r" +
            "Button A: X+87, Y+63\n" +
            "Button B: X+14, Y+52\n" +
            "Prize: X=2565, Y=1983\n" +
            "\r" +
            "Button A: X+50, Y+38\n" +
            "Button B: X+29, Y+80\n" +
            "Prize: X=5011, Y=4330\n" +
            "\r" +
            "Button A: X+20, Y+41\n" +
            "Button B: X+72, Y+48\n" +
            "Prize: X=14876, Y=8483\n" +
            "\r" +
            "Button A: X+29, Y+79\n" +
            "Button B: X+62, Y+36\n" +
            "Prize: X=7841, Y=8469\n" +
            "\r" +
            "Button A: X+13, Y+38\n" +
            "Button B: X+49, Y+31\n" +
            "Prize: X=19090, Y=10498\n" +
            "\r" +
            "Button A: X+12, Y+23\n" +
            "Button B: X+57, Y+35\n" +
            "Prize: X=5882, Y=2769\n" +
            "\r" +
            "Button A: X+11, Y+38\n" +
            "Button B: X+99, Y+13\n" +
            "Prize: X=8261, Y=4192\n" +
            "\r" +
            "Button A: X+76, Y+11\n" +
            "Button B: X+18, Y+81\n" +
            "Prize: X=7206, Y=12859\n" +
            "\r" +
            "Button A: X+11, Y+19\n" +
            "Button B: X+49, Y+27\n" +
            "Prize: X=17371, Y=8949\n" +
            "\r" +
            "Button A: X+79, Y+11\n" +
            "Button B: X+56, Y+67\n" +
            "Prize: X=4535, Y=4006\n" +
            "\r" +
            "Button A: X+12, Y+72\n" +
            "Button B: X+71, Y+14\n" +
            "Prize: X=2014, Y=10012\n" +
            "\r" +
            "Button A: X+16, Y+45\n" +
            "Button B: X+79, Y+44\n" +
            "Prize: X=12630, Y=18535\n" +
            "\r" +
            "Button A: X+49, Y+81\n" +
            "Button B: X+43, Y+14\n" +
            "Prize: X=4881, Y=4550\n" +
            "\r" +
            "Button A: X+25, Y+37\n" +
            "Button B: X+34, Y+12\n" +
            "Prize: X=3249, Y=1513\n" +
            "\r" +
            "Button A: X+45, Y+19\n" +
            "Button B: X+24, Y+41\n" +
            "Prize: X=17765, Y=8489\n" +
            "\r" +
            "Button A: X+25, Y+54\n" +
            "Button B: X+49, Y+20\n" +
            "Prize: X=2186, Y=1374\n" +
            "\r" +
            "Button A: X+40, Y+64\n" +
            "Button B: X+48, Y+18\n" +
            "Prize: X=12328, Y=17404\n" +
            "\r" +
            "Button A: X+32, Y+81\n" +
            "Button B: X+96, Y+12\n" +
            "Prize: X=10112, Y=4575\n" +
            "\r" +
            "Button A: X+50, Y+16\n" +
            "Button B: X+25, Y+75\n" +
            "Prize: X=7275, Y=12885\n" +
            "\r" +
            "Button A: X+59, Y+35\n" +
            "Button B: X+17, Y+33\n" +
            "Prize: X=14681, Y=10785\n" +
            "\r" +
            "Button A: X+86, Y+20\n" +
            "Button B: X+34, Y+55\n" +
            "Prize: X=4002, Y=1590\n" +
            "\r" +
            "Button A: X+63, Y+27\n" +
            "Button B: X+14, Y+59\n" +
            "Prize: X=9258, Y=11796\n" +
            "\r" +
            "Button A: X+97, Y+15\n" +
            "Button B: X+52, Y+67\n" +
            "Prize: X=6716, Y=4694\n" +
            "\r" +
            "Button A: X+36, Y+62\n" +
            "Button B: X+29, Y+16\n" +
            "Prize: X=6269, Y=19412\n" +
            "\r" +
            "Button A: X+67, Y+92\n" +
            "Button B: X+86, Y+30\n" +
            "Prize: X=11973, Y=10010\n" +
            "\r" +
            "Button A: X+37, Y+11\n" +
            "Button B: X+16, Y+29\n" +
            "Prize: X=9451, Y=6864\n" +
            "\r" +
            "Button A: X+31, Y+15\n" +
            "Button B: X+52, Y+85\n" +
            "Prize: X=1721, Y=1850\n" +
            "\r" +
            "Button A: X+66, Y+13\n" +
            "Button B: X+25, Y+65\n" +
            "Prize: X=11765, Y=13705\n" +
            "\r" +
            "Button A: X+80, Y+79\n" +
            "Button B: X+21, Y+79\n" +
            "Prize: X=4397, Y=7663\n" +
            "\r" +
            "Button A: X+57, Y+26\n" +
            "Button B: X+22, Y+85\n" +
            "Prize: X=6688, Y=8748\n" +
            "\r" +
            "Button A: X+73, Y+44\n" +
            "Button B: X+19, Y+48\n" +
            "Prize: X=19153, Y=19588\n" +
            "\r" +
            "Button A: X+13, Y+55\n" +
            "Button B: X+71, Y+23\n" +
            "Prize: X=1126, Y=1990\n" +
            "\r" +
            "Button A: X+72, Y+68\n" +
            "Button B: X+95, Y+11\n" +
            "Prize: X=5091, Y=3155\n" +
            "\r" +
            "Button A: X+49, Y+16\n" +
            "Button B: X+25, Y+35\n" +
            "Prize: X=3805, Y=2960\n" +
            "\r" +
            "Button A: X+43, Y+98\n" +
            "Button B: X+90, Y+25\n" +
            "Prize: X=9144, Y=4089\n" +
            "\r" +
            "Button A: X+48, Y+34\n" +
            "Button B: X+23, Y+99\n" +
            "Prize: X=3414, Y=9862\n" +
            "\r" +
            "Button A: X+44, Y+19\n" +
            "Button B: X+22, Y+56\n" +
            "Prize: X=4456, Y=12030\n" +
            "\r" +
            "Button A: X+52, Y+77\n" +
            "Button B: X+30, Y+11\n" +
            "Prize: X=15458, Y=15566\n" +
            "\r" +
            "Button A: X+38, Y+11\n" +
            "Button B: X+12, Y+63\n" +
            "Prize: X=1488, Y=6951\n" +
            "\r" +
            "Button A: X+37, Y+11\n" +
            "Button B: X+33, Y+61\n" +
            "Prize: X=19386, Y=8652\n" +
            "\r" +
            "Button A: X+92, Y+45\n" +
            "Button B: X+25, Y+50\n" +
            "Prize: X=10591, Y=7560\n" +
            "\r" +
            "Button A: X+28, Y+64\n" +
            "Button B: X+32, Y+12\n" +
            "Prize: X=19208, Y=3964\n" +
            "\r" +
            "Button A: X+70, Y+15\n" +
            "Button B: X+87, Y+98\n" +
            "Prize: X=10080, Y=7715\n" +
            "\r" +
            "Button A: X+14, Y+96\n" +
            "Button B: X+16, Y+19\n" +
            "Prize: X=2168, Y=8607\n" +
            "\r" +
            "Button A: X+13, Y+24\n" +
            "Button B: X+29, Y+11\n" +
            "Prize: X=12908, Y=10796\n" +
            "\r" +
            "Button A: X+42, Y+82\n" +
            "Button B: X+53, Y+11\n" +
            "Prize: X=17947, Y=18345\n" +
            "\r" +
            "Button A: X+61, Y+89\n" +
            "Button B: X+84, Y+34\n" +
            "Prize: X=3732, Y=3054\n" +
            "\r" +
            "Button A: X+47, Y+17\n" +
            "Button B: X+11, Y+36\n" +
            "Prize: X=7924, Y=3034\n" +
            "\r" +
            "Button A: X+73, Y+48\n" +
            "Button B: X+37, Y+85\n" +
            "Prize: X=7580, Y=7957\n" +
            "\r" +
            "Button A: X+81, Y+14\n" +
            "Button B: X+98, Y+88\n" +
            "Prize: X=16336, Y=9148\n" +
            "\r" +
            "Button A: X+16, Y+33\n" +
            "Button B: X+98, Y+42\n" +
            "Prize: X=5502, Y=2541\n" +
            "\r" +
            "Button A: X+35, Y+68\n" +
            "Button B: X+34, Y+12\n" +
            "Prize: X=13091, Y=11496\n" +
            "\r" +
            "Button A: X+14, Y+51\n" +
            "Button B: X+76, Y+27\n" +
            "Prize: X=1156, Y=19262\n" +
            "\r" +
            "Button A: X+14, Y+36\n" +
            "Button B: X+63, Y+16\n" +
            "Prize: X=8866, Y=17172\n" +
            "\r" +
            "Button A: X+51, Y+21\n" +
            "Button B: X+23, Y+60\n" +
            "Prize: X=10550, Y=10004\n" +
            "\r" +
            "Button A: X+12, Y+30\n" +
            "Button B: X+67, Y+29\n" +
            "Prize: X=5496, Y=10066\n" +
            "\r" +
            "Button A: X+13, Y+34\n" +
            "Button B: X+58, Y+42\n" +
            "Prize: X=19589, Y=8546\n" +
            "\r" +
            "Button A: X+21, Y+59\n" +
            "Button B: X+51, Y+25\n" +
            "Prize: X=7853, Y=12783\n" +
            "\r" +
            "Button A: X+79, Y+90\n" +
            "Button B: X+62, Y+12\n" +
            "Prize: X=6111, Y=6786\n" +
            "\r" +
            "Button A: X+83, Y+13\n" +
            "Button B: X+23, Y+39\n" +
            "Prize: X=7289, Y=1885\n" +
            "\r" +
            "Button A: X+58, Y+27\n" +
            "Button B: X+17, Y+39\n" +
            "Prize: X=15652, Y=10325\n" +
            "\r" +
            "Button A: X+88, Y+45\n" +
            "Button B: X+19, Y+42\n" +
            "Prize: X=2197, Y=1866\n" +
            "\r" +
            "Button A: X+69, Y+11\n" +
            "Button B: X+16, Y+81\n" +
            "Prize: X=5910, Y=3531\n" +
            "\r" +
            "Button A: X+19, Y+44\n" +
            "Button B: X+22, Y+11\n" +
            "Prize: X=10669, Y=3510\n" +
            "\r" +
            "Button A: X+15, Y+80\n" +
            "Button B: X+97, Y+72\n" +
            "Prize: X=2315, Y=3440\n" +
            "\r" +
            "Button A: X+69, Y+82\n" +
            "Button B: X+66, Y+18\n" +
            "Prize: X=8115, Y=7710\n" +
            "\r" +
            "Button A: X+45, Y+23\n" +
            "Button B: X+15, Y+55\n" +
            "Prize: X=5025, Y=6071\n" +
            "\r" +
            "Button A: X+39, Y+15\n" +
            "Button B: X+19, Y+30\n" +
            "Prize: X=6986, Y=13580\n" +
            "\r" +
            "Button A: X+60, Y+25\n" +
            "Button B: X+20, Y+61\n" +
            "Prize: X=7420, Y=12209\n" +
            "\r" +
            "Button A: X+11, Y+56\n" +
            "Button B: X+69, Y+31\n" +
            "Prize: X=6917, Y=7105\n" +
            "\r" +
            "Button A: X+23, Y+37\n" +
            "Button B: X+52, Y+19\n" +
            "Prize: X=6106, Y=4004\n" +
            "\r" +
            "Button A: X+20, Y+58\n" +
            "Button B: X+70, Y+31\n" +
            "Prize: X=7630, Y=8379\n" +
            "\r" +
            "Button A: X+53, Y+24\n" +
            "Button B: X+16, Y+54\n" +
            "Prize: X=4891, Y=6750\n" +
            "\r" +
            "Button A: X+52, Y+20\n" +
            "Button B: X+12, Y+49\n" +
            "Prize: X=15128, Y=3793\n" +
            "\r" +
            "Button A: X+98, Y+16\n" +
            "Button B: X+29, Y+34\n" +
            "Prize: X=10277, Y=3346\n" +
            "\r" +
            "Button A: X+12, Y+24\n" +
            "Button B: X+28, Y+17\n" +
            "Prize: X=14900, Y=5123\n" +
            "\r" +
            "Button A: X+62, Y+30\n" +
            "Button B: X+25, Y+48\n" +
            "Prize: X=6961, Y=398\n" +
            "\r" +
            "Button A: X+18, Y+29\n" +
            "Button B: X+33, Y+13\n" +
            "Prize: X=899, Y=17953\n" +
            "\r" +
            "Button A: X+82, Y+29\n" +
            "Button B: X+28, Y+94\n" +
            "Prize: X=7116, Y=3694\n" +
            "\r" +
            "Button A: X+13, Y+67\n" +
            "Button B: X+44, Y+15\n" +
            "Prize: X=17930, Y=1539\n" +
            "\r" +
            "Button A: X+11, Y+79\n" +
            "Button B: X+66, Y+46\n" +
            "Prize: X=2497, Y=2525\n" +
            "\r" +
            "Button A: X+91, Y+34\n" +
            "Button B: X+21, Y+47\n" +
            "Prize: X=3892, Y=2433\n" +
            "\r" +
            "Button A: X+36, Y+14\n" +
            "Button B: X+36, Y+70\n" +
            "Prize: X=15812, Y=11526\n" +
            "\r" +
            "Button A: X+66, Y+24\n" +
            "Button B: X+21, Y+63\n" +
            "Prize: X=9731, Y=8597\n" +
            "\r" +
            "Button A: X+67, Y+17\n" +
            "Button B: X+15, Y+59\n" +
            "Prize: X=2779, Y=3199\n" +
            "\r" +
            "Button A: X+38, Y+12\n" +
            "Button B: X+22, Y+74\n" +
            "Prize: X=5802, Y=7362\n" +
            "\r" +
            "Button A: X+57, Y+30\n" +
            "Button B: X+18, Y+46\n" +
            "Prize: X=16124, Y=8992\n" +
            "\r" +
            "Button A: X+13, Y+54\n" +
            "Button B: X+78, Y+42\n" +
            "Prize: X=6435, Y=5298\n" +
            "\r" +
            "Button A: X+11, Y+29\n" +
            "Button B: X+78, Y+45\n" +
            "Prize: X=12589, Y=7519\n" +
            "\r" +
            "Button A: X+48, Y+29\n" +
            "Button B: X+21, Y+51\n" +
            "Prize: X=14339, Y=12317\n" +
            "\r" +
            "Button A: X+12, Y+66\n" +
            "Button B: X+96, Y+37\n" +
            "Prize: X=2076, Y=6508\n" +
            "\r" +
            "Button A: X+49, Y+82\n" +
            "Button B: X+95, Y+46\n" +
            "Prize: X=8784, Y=7808\n" +
            "\r" +
            "Button A: X+14, Y+65\n" +
            "Button B: X+44, Y+12\n" +
            "Prize: X=9392, Y=10074\n" +
            "\r" +
            "Button A: X+27, Y+82\n" +
            "Button B: X+71, Y+52\n" +
            "Prize: X=9077, Y=12186\n" +
            "\r" +
            "Button A: X+25, Y+12\n" +
            "Button B: X+19, Y+31\n" +
            "Prize: X=2732, Y=3851\n" +
            "\r" +
            "Button A: X+64, Y+17\n" +
            "Button B: X+48, Y+83\n" +
            "Prize: X=6960, Y=5572\n" +
            "\r" +
            "Button A: X+11, Y+68\n" +
            "Button B: X+39, Y+13\n" +
            "Prize: X=3654, Y=10406\n" +
            "\r" +
            "Button A: X+26, Y+53\n" +
            "Button B: X+42, Y+15\n" +
            "Prize: X=11440, Y=15652\n" +
            "\r" +
            "Button A: X+19, Y+41\n" +
            "Button B: X+37, Y+14\n" +
            "Prize: X=8177, Y=9083\n" +
            "\r" +
            "Button A: X+33, Y+45\n" +
            "Button B: X+94, Y+40\n" +
            "Prize: X=5578, Y=3550\n" +
            "\r" +
            "Button A: X+93, Y+15\n" +
            "Button B: X+26, Y+45\n" +
            "Prize: X=4456, Y=1290\n" +
            "\r" +
            "Button A: X+15, Y+57\n" +
            "Button B: X+75, Y+17\n" +
            "Prize: X=5165, Y=10327\n" +
            "\r" +
            "Button A: X+47, Y+17\n" +
            "Button B: X+18, Y+65\n" +
            "Prize: X=18606, Y=16972\n" +
            "\r" +
            "Button A: X+57, Y+83\n" +
            "Button B: X+78, Y+14\n" +
            "Prize: X=7539, Y=7393\n" +
            "\r" +
            "Button A: X+29, Y+47\n" +
            "Button B: X+82, Y+29\n" +
            "Prize: X=5318, Y=3424\n" +
            "\r" +
            "Button A: X+47, Y+35\n" +
            "Button B: X+36, Y+84\n" +
            "Prize: X=1306, Y=2002\n" +
            "\r" +
            "Button A: X+58, Y+23\n" +
            "Button B: X+31, Y+59\n" +
            "Prize: X=4304, Y=293\n" +
            "\r" +
            "Button A: X+99, Y+22\n" +
            "Button B: X+27, Y+98\n" +
            "Prize: X=6813, Y=8874\n" +
            "\r" +
            "Button A: X+53, Y+12\n" +
            "Button B: X+23, Y+76\n" +
            "Prize: X=17141, Y=5516\n" +
            "\r" +
            "Button A: X+54, Y+20\n" +
            "Button B: X+36, Y+68\n" +
            "Prize: X=3294, Y=4008\n" +
            "\r" +
            "Button A: X+65, Y+22\n" +
            "Button B: X+20, Y+59\n" +
            "Prize: X=4075, Y=2685\n" +
            "\r" +
            "Button A: X+29, Y+42\n" +
            "Button B: X+28, Y+13\n" +
            "Prize: X=5621, Y=12357\n" +
            "\r" +
            "Button A: X+22, Y+51\n" +
            "Button B: X+32, Y+11\n" +
            "Prize: X=10008, Y=9754\n" +
            "\r" +
            "Button A: X+76, Y+19\n" +
            "Button B: X+14, Y+49\n" +
            "Prize: X=2980, Y=9883\n" +
            "\r" +
            "Button A: X+73, Y+20\n" +
            "Button B: X+15, Y+50\n" +
            "Prize: X=17293, Y=6120\n" +
            "\r" +
            "Button A: X+20, Y+87\n" +
            "Button B: X+87, Y+85\n" +
            "Prize: X=7424, Y=11166\n" +
            "\r" +
            "Button A: X+56, Y+28\n" +
            "Button B: X+13, Y+51\n" +
            "Prize: X=16114, Y=9490\n" +
            "\r" +
            "Button A: X+99, Y+47\n" +
            "Button B: X+39, Y+62\n" +
            "Prize: X=7644, Y=7847\n" +
            "\r" +
            "Button A: X+14, Y+42\n" +
            "Button B: X+72, Y+11\n" +
            "Prize: X=6470, Y=1985\n" +
            "\r" +
            "Button A: X+50, Y+14\n" +
            "Button B: X+16, Y+63\n" +
            "Prize: X=17812, Y=8208\n" +
            "\r" +
            "Button A: X+21, Y+45\n" +
            "Button B: X+56, Y+35\n" +
            "Prize: X=10693, Y=14380\n" +
            "\r" +
            "Button A: X+17, Y+68\n" +
            "Button B: X+52, Y+15\n" +
            "Prize: X=14292, Y=5400\n" +
            "\r" +
            "Button A: X+72, Y+19\n" +
            "Button B: X+15, Y+71\n" +
            "Prize: X=16883, Y=2971\n" +
            "\r" +
            "Button A: X+17, Y+55\n" +
            "Button B: X+77, Y+39\n" +
            "Prize: X=15479, Y=5409\n" +
            "\r" +
            "Button A: X+70, Y+38\n" +
            "Button B: X+17, Y+44\n" +
            "Prize: X=9069, Y=7614\n" +
            "\r" +
            "Button A: X+25, Y+53\n" +
            "Button B: X+47, Y+28\n" +
            "Prize: X=12567, Y=17929\n" +
            "\r" +
            "Button A: X+14, Y+72\n" +
            "Button B: X+65, Y+13\n" +
            "Prize: X=3787, Y=6419\n" +
            "\r" +
            "Button A: X+49, Y+98\n" +
            "Button B: X+69, Y+12\n" +
            "Prize: X=7430, Y=8182\n" +
            "\r" +
            "Button A: X+46, Y+95\n" +
            "Button B: X+51, Y+24\n" +
            "Prize: X=4212, Y=5283\n" +
            "\r" +
            "Button A: X+80, Y+11\n" +
            "Button B: X+36, Y+47\n" +
            "Prize: X=5416, Y=997\n" +
            "\r" +
            "Button A: X+85, Y+28\n" +
            "Button B: X+22, Y+46\n" +
            "Prize: X=1857, Y=1038\n" +
            "\r" +
            "Button A: X+14, Y+37\n" +
            "Button B: X+65, Y+22\n" +
            "Prize: X=7794, Y=6607\n" +
            "\r" +
            "Button A: X+85, Y+14\n" +
            "Button B: X+69, Y+96\n" +
            "Prize: X=10287, Y=6180\n" +
            "\r" +
            "Button A: X+56, Y+13\n" +
            "Button B: X+28, Y+59\n" +
            "Prize: X=2048, Y=7544\n" +
            "\r" +
            "Button A: X+13, Y+39\n" +
            "Button B: X+49, Y+28\n" +
            "Prize: X=7351, Y=13456\n" +
            "\r" +
            "Button A: X+26, Y+95\n" +
            "Button B: X+80, Y+31\n" +
            "Prize: X=8046, Y=10846\n" +
            "\r" +
            "Button A: X+35, Y+75\n" +
            "Button B: X+97, Y+35\n" +
            "Prize: X=5153, Y=5165\n" +
            "\r" +
            "Button A: X+16, Y+86\n" +
            "Button B: X+63, Y+58\n" +
            "Prize: X=2250, Y=5920\n" +
            "\r" +
            "Button A: X+96, Y+25\n" +
            "Button B: X+22, Y+22\n" +
            "Prize: X=10888, Y=4072\n" +
            "\r" +
            "Button A: X+61, Y+13\n" +
            "Button B: X+70, Y+98\n" +
            "Prize: X=5028, Y=3564\n" +
            "\r" +
            "Button A: X+20, Y+71\n" +
            "Button B: X+69, Y+53\n" +
            "Prize: X=6913, Y=9761\n" +
            "\r" +
            "Button A: X+12, Y+27\n" +
            "Button B: X+49, Y+35\n" +
            "Prize: X=1505, Y=9830\n" +
            "\r" +
            "Button A: X+54, Y+22\n" +
            "Button B: X+24, Y+46\n" +
            "Prize: X=18530, Y=1678\n" +
            "\r" +
            "Button A: X+16, Y+50\n" +
            "Button B: X+66, Y+24\n" +
            "Prize: X=2670, Y=4152\n" +
            "\r" +
            "Button A: X+99, Y+86\n" +
            "Button B: X+25, Y+99\n" +
            "Prize: X=8796, Y=10655\n" +
            "\r" +
            "Button A: X+97, Y+28\n" +
            "Button B: X+44, Y+47\n" +
            "Prize: X=6790, Y=5287\n" +
            "\r" +
            "Button A: X+71, Y+13\n" +
            "Button B: X+17, Y+67\n" +
            "Prize: X=15700, Y=18636\n" +
            "\r" +
            "Button A: X+88, Y+35\n" +
            "Button B: X+45, Y+98\n" +
            "Prize: X=9930, Y=9877\n" +
            "\r" +
            "Button A: X+31, Y+57\n" +
            "Button B: X+23, Y+13\n" +
            "Prize: X=14883, Y=17401\n" +
            "\r" +
            "Button A: X+49, Y+11\n" +
            "Button B: X+31, Y+80\n" +
            "Prize: X=1819, Y=18339\n" +
            "\r" +
            "Button A: X+99, Y+38\n" +
            "Button B: X+38, Y+57\n" +
            "Prize: X=3796, Y=3705\n" +
            "\r" +
            "Button A: X+65, Y+30\n" +
            "Button B: X+20, Y+41\n" +
            "Prize: X=16400, Y=2050\n" +
            "\r" +
            "Button A: X+19, Y+41\n" +
            "Button B: X+52, Y+25\n" +
            "Prize: X=2093, Y=11409\n" +
            "\r" +
            "Button A: X+24, Y+84\n" +
            "Button B: X+65, Y+39\n" +
            "Prize: X=6125, Y=5415\n" +
            "\r" +
            "Button A: X+39, Y+81\n" +
            "Button B: X+73, Y+25\n" +
            "Prize: X=7310, Y=2774\n" +
            "\r" +
            "Button A: X+20, Y+48\n" +
            "Button B: X+48, Y+24\n" +
            "Prize: X=11964, Y=6992\n" +
            "\r" +
            "Button A: X+61, Y+64\n" +
            "Button B: X+14, Y+89\n" +
            "Prize: X=5770, Y=12073\n" +
            "\r" +
            "Button A: X+18, Y+86\n" +
            "Button B: X+62, Y+23\n" +
            "Prize: X=1850, Y=2828\n" +
            "\r" +
            "Button A: X+49, Y+11\n" +
            "Button B: X+35, Y+81\n" +
            "Prize: X=9083, Y=2969\n" +
            "\r" +
            "Button A: X+13, Y+82\n" +
            "Button B: X+98, Y+34\n" +
            "Prize: X=7886, Y=10020\n" +
            "\r" +
            "Button A: X+28, Y+39\n" +
            "Button B: X+38, Y+14\n" +
            "Prize: X=14522, Y=15231\n" +
            "\r" +
            "Button A: X+84, Y+12\n" +
            "Button B: X+12, Y+75\n" +
            "Prize: X=2616, Y=1473\n" +
            "\r" +
            "Button A: X+15, Y+81\n" +
            "Button B: X+83, Y+38\n" +
            "Prize: X=2217, Y=2127\n" +
            "\r" +
            "Button A: X+15, Y+40\n" +
            "Button B: X+60, Y+21\n" +
            "Prize: X=14105, Y=14346\n" +
            "\r" +
            "Button A: X+19, Y+74\n" +
            "Button B: X+22, Y+11\n" +
            "Prize: X=3088, Y=5156\n" +
            "\r" +
            "Button A: X+31, Y+23\n" +
            "Button B: X+30, Y+90\n" +
            "Prize: X=792, Y=1536\n" +
            "\r" +
            "Button A: X+29, Y+11\n" +
            "Button B: X+20, Y+35\n" +
            "Prize: X=1254, Y=2076\n" +
            "\r" +
            "Button A: X+15, Y+35\n" +
            "Button B: X+45, Y+26\n" +
            "Prize: X=14120, Y=14699\n" +
            "\r" +
            "Button A: X+18, Y+61\n" +
            "Button B: X+53, Y+17\n" +
            "Prize: X=9368, Y=14132\n" +
            "\r" +
            "Button A: X+58, Y+32\n" +
            "Button B: X+20, Y+50\n" +
            "Prize: X=12594, Y=11016\n" +
            "\r" +
            "Button A: X+75, Y+11\n" +
            "Button B: X+11, Y+67\n" +
            "Prize: X=1837, Y=3029\n" +
            "\r" +
            "Button A: X+15, Y+37\n" +
            "Button B: X+77, Y+53\n" +
            "Prize: X=4675, Y=4685\n" +
            "\r" +
            "Button A: X+91, Y+22\n" +
            "Button B: X+57, Y+67\n" +
            "Prize: X=6699, Y=6090\n" +
            "\r" +
            "Button A: X+18, Y+27\n" +
            "Button B: X+35, Y+11\n" +
            "Prize: X=13285, Y=13945\n" +
            "\r" +
            "Button A: X+11, Y+41\n" +
            "Button B: X+84, Y+50\n" +
            "Prize: X=15364, Y=7098\n" +
            "\r" +
            "Button A: X+17, Y+33\n" +
            "Button B: X+47, Y+24\n" +
            "Prize: X=12428, Y=19232\n" +
            "\r" +
            "Button A: X+51, Y+36\n" +
            "Button B: X+29, Y+87\n" +
            "Prize: X=3586, Y=8652\n" +
            "\r" +
            "Button A: X+13, Y+77\n" +
            "Button B: X+43, Y+32\n" +
            "Prize: X=2319, Y=5496\n" +
            "\r" +
            "Button A: X+52, Y+12\n" +
            "Button B: X+38, Y+72\n" +
            "Prize: X=17922, Y=16052\n" +
            "\r" +
            "Button A: X+37, Y+12\n" +
            "Button B: X+11, Y+42\n" +
            "Prize: X=9216, Y=740\n" +
            "\r" +
            "Button A: X+26, Y+68\n" +
            "Button B: X+66, Y+20\n" +
            "Prize: X=13716, Y=3144\n" +
            "\r" +
            "Button A: X+48, Y+23\n" +
            "Button B: X+35, Y+58\n" +
            "Prize: X=3530, Y=19394\n" +
            "\r" +
            "Button A: X+32, Y+17\n" +
            "Button B: X+11, Y+26\n" +
            "Prize: X=7563, Y=12768\n" +
            "\r" +
            "Button A: X+64, Y+18\n" +
            "Button B: X+11, Y+85\n" +
            "Prize: X=3383, Y=6603\n" +
            "\r" +
            "Button A: X+42, Y+18\n" +
            "Button B: X+33, Y+50\n" +
            "Prize: X=18143, Y=12014\n" +
            "\r" +
            "Button A: X+13, Y+24\n" +
            "Button B: X+46, Y+12\n" +
            "Prize: X=3203, Y=12860\n" +
            "\r" +
            "Button A: X+82, Y+23\n" +
            "Button B: X+11, Y+68\n" +
            "Prize: X=8381, Y=13611\n" +
            "\r" +
            "Button A: X+18, Y+14\n" +
            "Button B: X+21, Y+55\n" +
            "Prize: X=2466, Y=3542\n" +
            "\r" +
            "Button A: X+22, Y+27\n" +
            "Button B: X+41, Y+12\n" +
            "Prize: X=3425, Y=2709\n" +
            "\r" +
            "Button A: X+19, Y+46\n" +
            "Button B: X+59, Y+36\n" +
            "Prize: X=13707, Y=14528\n" +
            "\r" +
            "Button A: X+79, Y+76\n" +
            "Button B: X+81, Y+15\n" +
            "Prize: X=8477, Y=2429\n" +
            "\r" +
            "Button A: X+14, Y+52\n" +
            "Button B: X+51, Y+28\n" +
            "Prize: X=13435, Y=400\n" +
            "\r" +
            "Button A: X+13, Y+90\n" +
            "Button B: X+88, Y+53\n" +
            "Prize: X=3386, Y=2861\n" +
            "\r" +
            "Button A: X+16, Y+48\n" +
            "Button B: X+59, Y+39\n" +
            "Prize: X=2802, Y=5370\n" +
            "\r" +
            "Button A: X+61, Y+39\n" +
            "Button B: X+12, Y+28\n" +
            "Prize: X=3251, Y=14769\n" +
            "\r" +
            "Button A: X+61, Y+32\n" +
            "Button B: X+29, Y+55\n" +
            "Prize: X=15301, Y=11760\n" +
            "\r" +
            "Button A: X+84, Y+67\n" +
            "Button B: X+22, Y+71\n" +
            "Prize: X=2100, Y=6165\n" +
            "\r" +
            "Button A: X+74, Y+13\n" +
            "Button B: X+54, Y+58\n" +
            "Prize: X=3264, Y=2708\n" +
            "\r" +
            "Button A: X+80, Y+86\n" +
            "Button B: X+18, Y+95\n" +
            "Prize: X=6060, Y=11810\n" +
            "\r" +
            "Button A: X+11, Y+80\n" +
            "Button B: X+74, Y+65\n" +
            "Prize: X=4843, Y=4465\n" +
            "\r" +
            "Button A: X+28, Y+49\n" +
            "Button B: X+72, Y+40\n" +
            "Prize: X=3720, Y=4876\n" +
            "\r" +
            "Button A: X+79, Y+41\n" +
            "Button B: X+11, Y+53\n" +
            "Prize: X=17080, Y=3544\n" +
            "\r" +
            "Button A: X+25, Y+11\n" +
            "Button B: X+26, Y+41\n" +
            "Prize: X=10950, Y=19270\n" +
            "\r" +
            "Button A: X+26, Y+50\n" +
            "Button B: X+41, Y+14\n" +
            "Prize: X=6504, Y=18240\n" +
            "\r" +
            "Button A: X+35, Y+64\n" +
            "Button B: X+82, Y+34\n" +
            "Prize: X=7914, Y=4964\n" +
            "\r" +
            "Button A: X+32, Y+14\n" +
            "Button B: X+29, Y+47\n" +
            "Prize: X=3801, Y=9057\n" +
            "\r" +
            "Button A: X+59, Y+17\n" +
            "Button B: X+36, Y+77\n" +
            "Prize: X=16929, Y=16549\n" +
            "\r" +
            "Button A: X+65, Y+89\n" +
            "Button B: X+73, Y+16\n" +
            "Prize: X=5247, Y=6009\n" +
            "\r" +
            "Button A: X+57, Y+22\n" +
            "Button B: X+12, Y+89\n" +
            "Prize: X=1371, Y=2554\n" +
            "\r" +
            "Button A: X+55, Y+66\n" +
            "Button B: X+98, Y+23\n" +
            "Prize: X=9696, Y=4824\n" +
            "\r" +
            "Button A: X+14, Y+41\n" +
            "Button B: X+63, Y+38\n" +
            "Prize: X=5849, Y=337\n" +
            "\r" +
            "Button A: X+30, Y+73\n" +
            "Button B: X+49, Y+17\n" +
            "Prize: X=16159, Y=18772\n" +
            "\r" +
            "Button A: X+23, Y+13\n" +
            "Button B: X+24, Y+42\n" +
            "Prize: X=14243, Y=18635\n" +
            "\r" +
            "Button A: X+72, Y+29\n" +
            "Button B: X+15, Y+44\n" +
            "Prize: X=13301, Y=15812\n" +
            "\r" +
            "Button A: X+32, Y+73\n" +
            "Button B: X+47, Y+13\n" +
            "Prize: X=2757, Y=6163\n" +
            "\r" +
            "Button A: X+29, Y+12\n" +
            "Button B: X+19, Y+38\n" +
            "Prize: X=3796, Y=10482\n" +
            "\r" +
            "Button A: X+14, Y+49\n" +
            "Button B: X+66, Y+25\n" +
            "Prize: X=1790, Y=2557\n" +
            "\r" +
            "Button A: X+69, Y+12\n" +
            "Button B: X+29, Y+48\n" +
            "Prize: X=3831, Y=924\n" +
            "\r" +
            "Button A: X+50, Y+17\n" +
            "Button B: X+47, Y+81\n" +
            "Prize: X=5819, Y=4055\n" +
            "\r" +
            "Button A: X+32, Y+98\n" +
            "Button B: X+30, Y+21\n" +
            "Prize: X=5380, Y=10948\n" +
            "\r" +
            "Button A: X+77, Y+16\n" +
            "Button B: X+48, Y+99\n" +
            "Prize: X=6611, Y=9208\n" +
            "\r" +
            "Button A: X+43, Y+13\n" +
            "Button B: X+26, Y+51\n" +
            "Prize: X=8449, Y=10214\n" +
            "\r" +
            "Button A: X+75, Y+49\n" +
            "Button B: X+16, Y+72\n" +
            "Prize: X=7949, Y=10671\n" +
            "\r" +
            "Button A: X+66, Y+14\n" +
            "Button B: X+15, Y+54\n" +
            "Prize: X=7130, Y=13916\n" +
            "\r" +
            "Button A: X+22, Y+45\n" +
            "Button B: X+61, Y+30\n" +
            "Prize: X=4625, Y=9320\n" +
            "\r" +
            "Button A: X+15, Y+62\n" +
            "Button B: X+58, Y+12\n" +
            "Prize: X=19789, Y=3466\n" +
            "\r" +
            "Button A: X+41, Y+78\n" +
            "Button B: X+53, Y+16\n" +
            "Prize: X=4759, Y=12566\n" +
            "\r" +
            "Button A: X+37, Y+12\n" +
            "Button B: X+24, Y+35\n" +
            "Prize: X=6701, Y=5546\n" +
            "\r" +
            "Button A: X+28, Y+34\n" +
            "Button B: X+53, Y+17\n" +
            "Prize: X=4761, Y=2703\n" +
            "\r" +
            "Button A: X+42, Y+18\n" +
            "Button B: X+27, Y+48\n" +
            "Prize: X=10796, Y=19634\n" +
            "\r" +
            "Button A: X+12, Y+81\n" +
            "Button B: X+66, Y+55\n" +
            "Prize: X=1200, Y=4195\n" +
            "\r" +
            "Button A: X+12, Y+37\n" +
            "Button B: X+69, Y+43\n" +
            "Prize: X=1641, Y=3532\n" +
            "\r" +
            "Button A: X+64, Y+20\n" +
            "Button B: X+23, Y+61\n" +
            "Prize: X=15134, Y=14666\n" +
            "\r" +
            "Button A: X+58, Y+27\n" +
            "Button B: X+20, Y+59\n" +
            "Prize: X=4892, Y=13077\n" +
            "\r" +
            "Button A: X+15, Y+64\n" +
            "Button B: X+77, Y+20\n" +
            "Prize: X=4642, Y=3644\n" +
            "\r" +
            "Button A: X+13, Y+68\n" +
            "Button B: X+35, Y+39\n" +
            "Prize: X=1333, Y=5820\n" +
            "\r" +
            "Button A: X+36, Y+94\n" +
            "Button B: X+90, Y+50\n" +
            "Prize: X=8874, Y=10406\n" +
            "\r" +
            "Button A: X+18, Y+51\n" +
            "Button B: X+64, Y+38\n" +
            "Prize: X=10342, Y=5679\n" +
            "\r" +
            "Button A: X+16, Y+28\n" +
            "Button B: X+35, Y+18\n" +
            "Prize: X=5441, Y=16670\n" +
            "\r" +
            "Button A: X+23, Y+12\n" +
            "Button B: X+41, Y+83\n" +
            "Prize: X=1994, Y=2827\n" +
            "\r" +
            "Button A: X+99, Y+37\n" +
            "Button B: X+24, Y+57\n" +
            "Prize: X=8934, Y=6557\n" +
            "\r" +
            "Button A: X+31, Y+55\n" +
            "Button B: X+56, Y+28\n" +
            "Prize: X=6895, Y=3447\n" +
            "\r" +
            "Button A: X+15, Y+39\n" +
            "Button B: X+60, Y+29\n" +
            "Prize: X=11720, Y=10724\n" +
            "\r" +
            "Button A: X+82, Y+84\n" +
            "Button B: X+21, Y+93\n" +
            "Prize: X=5429, Y=10923\n" +
            "\r" +
            "Button A: X+21, Y+56\n" +
            "Button B: X+66, Y+23\n" +
            "Prize: X=10691, Y=8258\n" +
            "\r" +
            "Button A: X+53, Y+26\n" +
            "Button B: X+25, Y+64\n" +
            "Prize: X=5681, Y=6098\n" +
            "\r" +
            "Button A: X+47, Y+78\n" +
            "Button B: X+40, Y+14\n" +
            "Prize: X=5920, Y=10370\n" +
            "\r" +
            "Button A: X+51, Y+21\n" +
            "Button B: X+15, Y+31\n" +
            "Prize: X=13418, Y=16260\n" +
            "\r" +
            "Button A: X+24, Y+44\n" +
            "Button B: X+52, Y+17\n" +
            "Prize: X=16408, Y=18128\n" +
            "\r" +
            "Button A: X+81, Y+39\n" +
            "Button B: X+13, Y+54\n" +
            "Prize: X=791, Y=4736\n" +
            "\r" +
            "Button A: X+26, Y+12\n" +
            "Button B: X+20, Y+43\n" +
            "Prize: X=17344, Y=15695\n" +
            "\r" +
            "Button A: X+41, Y+79\n" +
            "Button B: X+84, Y+33\n" +
            "Prize: X=4560, Y=5565\n" +
            "\r" +
            "Button A: X+15, Y+60\n" +
            "Button B: X+64, Y+18\n" +
            "Prize: X=10078, Y=16766\n" +
            "\r" +
            "Button A: X+77, Y+34\n" +
            "Button B: X+11, Y+59\n" +
            "Prize: X=6468, Y=7404\n" +
            "\r" +
            "Button A: X+42, Y+63\n" +
            "Button B: X+46, Y+21\n" +
            "Prize: X=7730, Y=7035\n" +
            "\r" +
            "Button A: X+43, Y+17\n" +
            "Button B: X+20, Y+64\n" +
            "Prize: X=14097, Y=11143\n" +
            "\r" +
            "Button A: X+43, Y+16\n" +
            "Button B: X+44, Y+77\n" +
            "Prize: X=11701, Y=5191\n" +
            "\r" +
            "Button A: X+49, Y+21\n" +
            "Button B: X+12, Y+30\n" +
            "Prize: X=9249, Y=5921\n" +
            "\r" +
            "Button A: X+76, Y+27\n" +
            "Button B: X+30, Y+83\n" +
            "Prize: X=4640, Y=3674\n" +
            "\r" +
            "Button A: X+52, Y+75\n" +
            "Button B: X+37, Y+11\n" +
            "Prize: X=17813, Y=19208\n" +
            "\r" +
            "Button A: X+52, Y+36\n" +
            "Button B: X+42, Y+97\n" +
            "Prize: X=7016, Y=9476\n" +
            "\r" +
            "Button A: X+25, Y+67\n" +
            "Button B: X+82, Y+62\n" +
            "Prize: X=1745, Y=3099\n" +
            "\r" +
            "Button A: X+14, Y+54\n" +
            "Button B: X+75, Y+11\n" +
            "Prize: X=6535, Y=19767\n" +
            "\r" +
            "Button A: X+25, Y+75\n" +
            "Button B: X+68, Y+21\n" +
            "Prize: X=9616, Y=1277\n" +
            "\r" +
            "Button A: X+70, Y+89\n" +
            "Button B: X+59, Y+19\n" +
            "Prize: X=10106, Y=8704\n" +
            "\r" +
            "Button A: X+12, Y+46\n" +
            "Button B: X+65, Y+28\n" +
            "Prize: X=5529, Y=13980\n" +
            "\r" +
            "Button A: X+26, Y+72\n" +
            "Button B: X+72, Y+26\n" +
            "Prize: X=12562, Y=10952\n" +
            "\r" +
            "Button A: X+65, Y+39\n" +
            "Button B: X+21, Y+42\n" +
            "Prize: X=8898, Y=5612\n" +
            "\r" +
            "Button A: X+29, Y+11\n" +
            "Button B: X+43, Y+64\n" +
            "Prize: X=13219, Y=16279\n" +
            "\r" +
            "Button A: X+51, Y+12\n" +
            "Button B: X+31, Y+73\n" +
            "Prize: X=8323, Y=9697\n" +
            "\r" +
            "Button A: X+17, Y+38\n" +
            "Button B: X+28, Y+14\n" +
            "Prize: X=3010, Y=4396\n" +
            "\r" +
            "Button A: X+37, Y+26\n" +
            "Button B: X+18, Y+40\n" +
            "Prize: X=16840, Y=5928\n" +
            "\r" +
            "Button A: X+55, Y+26\n" +
            "Button B: X+26, Y+60\n" +
            "Prize: X=5990, Y=13188\n" +
            "\r" +
            "Button A: X+25, Y+50\n" +
            "Button B: X+48, Y+15\n" +
            "Prize: X=4924, Y=2720\n" +
            "\r" +
            "Button A: X+14, Y+33\n" +
            "Button B: X+43, Y+29\n" +
            "Prize: X=8624, Y=18226\n" +
            "\r" +
            "Button A: X+34, Y+11\n" +
            "Button B: X+33, Y+47\n" +
            "Prize: X=6099, Y=19526\n" +
            "\r" +
            "Button A: X+16, Y+61\n" +
            "Button B: X+74, Y+44\n" +
            "Prize: X=6778, Y=4648\n" +
            "\r" +
            "Button A: X+52, Y+11\n" +
            "Button B: X+52, Y+98\n" +
            "Prize: X=6552, Y=5649\n" +
            "\r" +
            "Button A: X+63, Y+14\n" +
            "Button B: X+25, Y+50\n" +
            "Prize: X=6130, Y=5540\n" +
            "\r" +
            "Button A: X+35, Y+91\n" +
            "Button B: X+81, Y+22\n" +
            "Prize: X=7127, Y=4951\n" +
            "\r" +
            "Button A: X+30, Y+57\n" +
            "Button B: X+51, Y+30\n" +
            "Prize: X=11087, Y=7355\n" +
            "\r" +
            "Button A: X+35, Y+18\n" +
            "Button B: X+38, Y+61\n" +
            "Prize: X=17792, Y=16111\n" +
            "\r" +
            "Button A: X+30, Y+14\n" +
            "Button B: X+35, Y+85\n" +
            "Prize: X=2100, Y=3452\n" +
            "\r" +
            "Button A: X+45, Y+11\n" +
            "Button B: X+23, Y+63\n" +
            "Prize: X=17967, Y=17271\n" +
            "\r" +
            "Button A: X+12, Y+35\n" +
            "Button B: X+42, Y+26\n" +
            "Prize: X=13022, Y=9764\n";
}

function getTestData() {
    return  "Button A: X+94, Y+34\n" +
            "Button B: X+22, Y+67\n" +
            "Prize: X=8400, Y=5400\n" +
            "\r" +
            "Button A: X+26, Y+66\n" +
            "Button B: X+67, Y+21\n" +
            "Prize: X=12748, Y=12176\n" +
            "\r" +
            "Button A: X+17, Y+86\n" +
            "Button B: X+84, Y+37\n" +
            "Prize: X=7870, Y=6450\n" +
            "\r" +
            "Button A: X+69, Y+23\n" +
            "Button B: X+27, Y+71\n" +
            "Prize: X=18641, Y=10279\n";
}

