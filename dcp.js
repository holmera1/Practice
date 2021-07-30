//////////////////////////////////////////////////////////////////////////////////////

// #645
// determine if the target string can be produced by moving down or left starting from any element
// in the given 2d array of characters
// 2 subproblems:
// - recursive fnc that tries to build target from a given starting point
// - fnc that calls the above for all starting points (i.e. every point in the matrix)
const findWord2D = (matrix, target) => {
    // helper recursive function that tries to build the word by going either left or down from
    // the starting position
    const recur = (matrix, target, curr, word) => {
        console.log(curr, word);
        if(word === target) {
            return true;
        } else if(curr[0] + 1 < matrix.length && target.includes(word + matrix[curr[0] + 1][curr[1]])) {
            return recur(matrix, target, [curr[0] + 1, curr[1]], word + matrix[curr[0] + 1][curr[1]]);
        } else if(curr[1] + 1 < matrix[0].length && target.includes(word + matrix[curr[0]][curr[1] + 1])) {
            return recur(matrix, target, [curr[0], curr[1] + 1], word + matrix[curr[0]][curr[1] + 1]);
        } else {
            return false;
        }
    }

    // if target is of impossible length, return false
    if(target.length >= matrix.length + matrix[0].length) {
        return false;
    }
    // otherwise try to start from each coordinate
    for(let i = 0; i < matrix.length; i++) {
        for(let j = 0; j < matrix[0].length; j++) {
            if(recur(matrix, target, [i, j], matrix[i][j])) return true;
        }
    }
    // return false if never found
    return false;
};

// console.log(findWord2D([
// ['F', 'A', 'C', 'I'], 
// ['O', 'B', 'Q', 'P'], 
// ['A', 'N', 'O', 'B'], 
// ['M', 'A', 'S', 'S']], 
// "FACIP"));

//////////////////////////////////////////////////////////////////////////////////////

// #641
// find the smallet possible integer that is not the sum of a subset of the given array
const minNotSumOfSubset = (arr) => {
    let flag = true, index = 0, track = arr[index] + 1;
    while(flag) {
        if(arr.includes(track)) {
            index++;
            track++;
        } else if(arr.includes(track - arr[index])) {
            track++;
        } else {
            flag = false;
        }
    }
    return track;
};

// console.log(minNotSumOfSubset([1, 2, 3, 10]));

//////////////////////////////////////////////////////////////////////////////////////

// #639
// given a mapping of digits to characters, return every possible string that can be
// assembled from a sequence of integers
const digitsToPossibleStrings = (map) => {
    var sol = [];
    // map.keys returns a MapIterator object, need to convert to array w/ spread syntax
    var keys = [...map.keys()];
    const dfs = (str, map, k) => {
        // if current string is of appropriate length, add it to solution array
        if(str.length === keys.length) {
            sol.push(str);
        }
        if(map.has(keys[k])) {
            let arr = map.get(keys[k]);
            for(let i = 0; i < arr.length; i++) {
                // call dfs on every element in current key's mapped array, add current character
                // to the string being passed
                dfs(str + arr[i], map, k + 1);
            }
        }
    }
    dfs("", map, 0);
    return sol;
};

// let testm = new Map();
// testm.set("2", ["a", "b", "c"]);
// testm.set("3", ["d", "e", "f"]);
// testm.set("4", ["g", "h", "i"]);

// console.log(digitsToPossibleStrings(testm));

//////////////////////////////////////////////////////////////////////////////////////

// #639