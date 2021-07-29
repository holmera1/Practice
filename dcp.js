//////////////////////////////////////////////////////////////////////////////////////

// #645
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

// #