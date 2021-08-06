// #897
const increasingBST = (root) => {
    let recur = (x, y) => {
        if(x.left) {
            y = recur(x.left, y);
            x.left = null;
        }
        y.right = x;
        if(x.right) {
            return recur(x.right, x);
        } else {
            return x;
        }
        
    }
    let seed = {};
    recur(root, seed);
    return seed.right;
};

//////////////////////////////////////////////////////////////////////////////////////

// #1502
// compare function in sort method:
// sends the 2 alues to the compare function, and sorts the values according
// to the returned (negative, zero, positive) value
const canMakeArithmeticProgression = (arr) => {
    arr.sort((a, b) => {
        return a - b;
    });
    let diff = Math.abs(arr[1] - arr[0]);
    for(let i = 2; i < arr.length; i++) {
        if(Math.abs(arr[i] - arr[i-1]) !== diff) {
            return false;
        }
    }
    return true;
};

//////////////////////////////////////////////////////////////////////////////////////

// #500
const findWords = (words) => {
    let sol = new Array();
    for(let w in words) {
        let flag = true;
        word = words[w].toLowerCase();
        let row = getRow(word);
        for(let i = 0; i < word.length; i++) {
            let ch = word.charAt(i);
            if(!row.includes(ch)) {
               flag = false;
               break;
            }
        }
        if(flag) {
            sol.push(words[w]);
        }
    }
    return sol;
};

const getRow = (word) => {
    let row1 = "qwertyuiop";
    let row2 = "asdfghjkl";
    let row3 = "zxcvbnm";
    let ch = word.charAt(0);
    if(row1.includes(ch)) {
        return row1;
    } else if(row2.includes(ch)) {
        return row2;
    } else {
        return row3;
    }
}

//////////////////////////////////////////////////////////////////////////////////////

// 1640
const canFormArray = (arr, pieces) => {
    return pieces.every((p) => p.toString() === arr.slice(arr.indexOf(p[0]), arr.indexOf(p[0]) + p.length).toString());
};

//////////////////////////////////////////////////////////////////////////////////////

// #733
const floodFill = (image, sr, sc, newColor) => {
    let ogColor = image[sr][sc];

    if(ogColor === newColor) {
        return image;
    }

    let directionalCheck = (row, col) => {
        let sol = image;
        if(validIdx(row, col)) {
            sol[row][col] = newColor;
        }
        for(let [newRow, newCol] of coordinates(row, col)) {
            if(validIdx(newRow, newCol) && sol[newRow][newCol] === ogColor) {
                sol[newRow][newCol] = newColor;
                directionalCheck(newRow, newCol);
            }
        }
        return sol;
    }

    let coordinates = (row, col) => {
        return [[row + 1, col], [row - 1, col], [row, col + 1], [row, col - 1]];
    }

    let validIdx = (row, col) => {
        return row >= 0 && col >= 0 && row < image.length && col < image[0].length; 
    }

    return directionalCheck(sr, sc);
};

//////////////////////////////////////////////////////////////////////////////////////

// #1773
const countMatches = (items, ruleKey, ruleValue) => {

    let findValues = (items, index) => {
        let sol = new Array();
        for(let item of items) {
            if(item[index] === ruleValue) {
                sol.push(item);
            }
        }
        return sol.length;
    }

    if(ruleKey === "type") {
        return findValues(items, 0);
    } else if(ruleKey === "color") {
        return findValues(items, 1);
    } else {
        return findValues(items, 2);
    }
};

//////////////////////////////////////////////////////////////////////////////////////

// #941
const validMountainArray = (arr) => {

    let flag = false;

    let assertDecreasing = (a) => {
        for(let i = 0; i < a.length - 1; i++) {
            if(!(a[i] > a[i + 1])) {
                return false;
            }
        }
        return true;
    }

    let findInflection = (a) => {
        for(let i = 0; i < arr.length - 1; i++) {
            if(!(arr[i] < arr[i + 1])) {
                return i;
            } else if(!flag) {
                flag = true;
            }
        }
    }

    return assertDecreasing(arr.slice(findInflection(arr))) && flag;
};

//////////////////////////////////////////////////////////////////////////////////////

// #404
const sumOfLeftLeaves = (root) => {
    let sum = 0;
    const dfs = (n, isLeft) => {
        if(!n) return null;
        let left = dfs(n.left, true);
        let right = dfs(n.right, false);
        if(left === null && right === null && isLeft) sum += n.val;
    }
    dfs(root);
    return sum;
};

//////////////////////////////////////////////////////////////////////////////////////

// #169
const majorityElement = (nums) => {
    const map = {};
    // map each number to a count of its occurrences
    for (let n of nums) {
        map[n] = (map[n] ? map[n] : 0) + 1;
        // if at any point the number of occurrences of n is greater than half of nums length, return n
        if (map[n] > nums.length / 2) return n;
    }
};

//////////////////////////////////////////////////////////////////////////////////////

// #21
const mergeTwoLists = (l1, l2) => {
    // create new list to add to
    let head = new ListNode();
    let cur = head;
    let a = l1, b = l2;
    // main loop for building solution list
    while(a && b) {
        if(a.val < b.val) {
            cur.next = a;
            a = a.next
        } else {
            cur.next = b;
            b = b.next;
        }
        cur = cur.next;
    }
    // loop for when b finishes first
    while(a) {
        cur.next = a;
        a = a.next;
        cur = cur.next;
    }
    // loop for when a finishes first
    while(b) {
        cur.next = b;
        b = b.next;
        cur = cur.next;
    }
    // return solution list
    return head.next;
};

//////////////////////////////////////////////////////////////////////////////////////

// #7
const reverse = (x) => {
    // flag to remember if negative (true) or positive (false)
    let flag = false;
    if(x < 0) {
        flag = true;
    }
    // create reverse integer
    let sol = parseInt(x.toString().split("").reverse().join(""));
    // if the reverse integer is outside expected range, return 0
    if(sol >= Math.pow(2, 31) || sol < Math.pow(2, 31) * -1) {
        return 0;
    }
    // if flag is true, make sol negative and return else return sol
    if(flag) {
        return parseInt(arr.join("")) * -1;
    } else {
        return parseInt(arr.join(""));
    }
};

//////////////////////////////////////////////////////////////////////////////////////

// #9
const isPalindrome = (x) => {
    // if negative, can't be a palindrome
    if(x < 0) return false;

    // if x equals reverse of x, return true else false
    if(parseInt(x.toString().split("").reverse().join("")) === x) return true;
    return false;
}

//////////////////////////////////////////////////////////////////////////////////////

// #13
const romanToInt = (s) => {
    // create a dictionary of Roman numerals
	let map = { 'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000 };
    let sol = 0;
    // convert roman numerals string to array for easy interaction
    let arr = s.split("");
    // for each numeral: if the next numeral is > substract its val from sol, else add val to sol
    for(let i = 0; i < arr.length; i++) {
        let curr = arr[i];
        let next = arr[i + 1] ? arr[i + 1] : null;
        if(next && map[curr] < map[next]) {
            sol -= map[curr];
        } else {
            sol += map[curr];
        }
    }
    return sol;
}

//////////////////////////////////////////////////////////////////////////////////////

// #26
const removeDuplicates = (nums) => {
    for(let i = 0; i < nums.length; i++) {
        if(nums[i] === nums[i - 1]) {
            nums.splice(i, 1);
            i--;
        }
    }
    return nums;
};

//////////////////////////////////////////////////////////////////////////////////////

// #1668
const maxRepeating = (sequence, word) => {
    // split strings into array because its easier
    sequence = sequence.split("");
    word = word.split("");
    // define solution variable
    let sol = 0;
    // for each char, compare successive chars to those of the word (use flag to indicate if subsequence was valid)
    for(let i = 0; i < sequence.length; i++) {
        if(sequence[i] === word[0]) {
            let flag = true;
            for(let j = 0; j < word.length; j++) {
                if(word[j] !== sequence[i + j]) {
                    flag = false;
                }
            }
            if(flag) {
                sol++;
                // skip over the chars that are part of the word that was found
                i += word.length - 1;
            }
        }
    }
    return sol;
};

//////////////////////////////////////////////////////////////////////////////////////

// #14
let longestCommonPrefix = (strs) => {
    // return string
    let sol = '';
    // loop through entire length of first word
    for(let i = 0; i < strs[0].length; i++) {
        // cant take substring if i > word.length
        // if this is the case, entire first word is common prefix
        if(strs[0].length <= i) {
            return sol;
        }
        // otherwise take substring
        let substr = strs[0].substring(0, i + 1);
        // for each other word, assert same beginning substring and i isnt greater than word length
        for(let word of strs) {
            if(word.length <= i || word.substring(0, i + 1) !== substr) { 
                return sol;
            }
        }
        // if get here, the substr is valid
        sol = substr;
    }
    return sol;
};

//////////////////////////////////////////////////////////////////////////////////////

// #15
// FAILS FOR LARGE ARRAY
let threeSum = (nums) => {
    // dfs function that produces every possible triplet 
    // and adds it to the set if sum of elements is 0
    const dfs = (nums, start, vals, set) => {
        if(vals.length === 3) {
            if(vals[0] + vals[1] + vals[2] === 0) {
                // need to turn the triplet into a string before adding to a set
                set.add(vals.join("."));
            }
            return;
        }
        for(let i = start; i < nums.length; i++) {
            vals.push(nums[i]);
            dfs(nums, i + 1, vals, set);
            vals.pop();
        }
    }
    // need to sort nums to eliminate return values with 
    // rearranged elements (if numssorted, set will filter them)
    nums.sort((a, b) => {
        return a - b;
    });
    let set = new Set();
    dfs(nums, 0, [], set);
    let sol = new Array();
    // set was populated by dfs, simply turn all the strings into arrays 
    // and push into another array to return
    for(let trip of set) {
        // need to join and split with a placholder to account for negative signs
        sol.push(trip.split("."));
    }
    return sol;
};

//////////////////////////////////////////////////////////////////////////////////////

// #2
// question on leetcode is dogshit, gives a num that exceeds js storage capacity
// this actually works
const addTwoNumbers = (l1, l2) => {
    // get number from linkedlist that is stored in reverse and return
    const getNum = (head) => {
        let arr = new Array();
        while(head) {
            arr.push(head.val);
            head = head.next;
        }
        return parseInt(arr.reverse().join(""));
    }
    // create a linked list of a number in reverse order
    const toLinkedList = (num) => {
        let arr = num.toString().split("").reverse();
        let head = new ListNode();
        let curr = head;
        for(let i = 0; i < arr.length; i++) {
            curr.next = new ListNode(arr[i]);
            curr = curr.next;
        }
        return head.next;
    }
    // call the subproblem functions
    let x = getNum(l1) + getNum(l2);
    return toLinkedList(x);
};

//////////////////////////////////////////////////////////////////////////////////////

// #28
const strStr = (haystack, needle) => {  
    // helper function to determine if haystack contains needle starting at a given index
    const findMatch = (start) => {
        for(let i = 0; i < needle.length; i++) {
            if(needle.charAt(i) !== haystack.charAt(start + i)) {
                return false 
            }
        }
        return true;
    }
    // address base and error cases
    if(needle === '') {
        return 0;
    } else if(needle.length > haystack.length ) {
        return -1;
    // otherwise, iterate through haystack to find possible match and call helper func
    } else {
        for(let i = 0; i < haystack.length; i++) {
            // return -1 if needle to too long for remainder of haystack
            if( needle.length > haystack.length - i) {
                return -1;
            }
            if(haystack.charAt(i) === needle.charAt(0)) {
                if(findMatch(i)) return i;
            }
        }
        return -1;
    }
};

//////////////////////////////////////////////////////////////////////////////////////

// #28
const addBinary = (a, b) => {
    // initialize stuff
    let sol = '', i = a.length - 1, j = b.length - 1, carry = 0;
    while(i >= 0 || j >= 0 || carry === 1) {
        carry += ((i >= 0) ? parseInt(a[i]) : 0);
        carry += ((j >= 0) ? parseInt(b[j]) : 0);
        sol = (carry % 2).toString() + sol;
        carry = Math.floor(carry / 2);
        i--;
        j--;
    }
    return sol;
}

//////////////////////////////////////////////////////////////////////////////////////

// #121
const maxProfit = (prices) => {    
};

//////////////////////////////////////////////////////////////////////////////////////

// #94
// spread operator takes an interable and expands ("spreads") it into individual elements
// since the inorderTraversal function returns an array, it spreads this array into separate values
// without the spred operator, the returned array would have nth degree subarrays where n = tree depth
const inorderTraversal = root => root ? [...inorderTraversal(root.left), root.val, ...inorderTraversal(root.right)] : [];

//////////////////////////////////////////////////////////////////////////////////////

// #70
// the key is just to recognize that the problem is describing the fibonacci sequence
const climbStairs = (n) => {
    let fib = [1, 1, 2];
    for(let i = 3; i <= n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }
    return fib[n];
};

//////////////////////////////////////////////////////////////////////////////////////

// #459
// append the given string s to itself, call the first s1 and the second s2 
// where s1 === s2 and the new whole is called x
// removing the first and last elements from x makes it such that x can no longer be split down the middle
// into s1 and s2
// however, if s was capable of being broken down into a sequence of equal substrings,
// x will still contain s after this trim
// this problem is easy to visualize but hard to explain in words
const repeatedSubstringPattern = (s) => (s + s).substring(1, (s + s).length - 1).includes(s);
    
//////////////////////////////////////////////////////////////////////////////////////

// #1523
// count number of odds between low and high
// 3 cases
// case 1: high and low are both even, where count = (high - low) / 2
// case 2: one of high and low are odd, where count = ceil((high - low) / 2)
// case 3: both high and low are odd, where count = ((high - low) / 2) + 1 
const countOdds = (low, high) => {
    let count = Math.ceil((high - low) / 2);
    if(low % 2 === 1 && high % 2 === 1) count++;
    return count;
};

//////////////////////////////////////////////////////////////////////////////////////

// #1725

const countGoodRectangles = (rectangles) => {
    let maxLen = 0, count = 0;
    for(let rectangle of rectangles) {
        // set n to shorter side of current rectangle
        let n = rectangle[0] < rectangle[1] ? rectangle[0] : rectangle[1];
        // if n is bigger than maxLen, update maxLen and reset count to 1
        if(n > maxLen) {
            maxLen = n;
            count = 1;
        // if n is equal to current maxLen, add 1 to count
        } else if(n === maxLen) {
            count++;
        }
    }
    return count;
};

//////////////////////////////////////////////////////////////////////////////////////

// #1417
const reformat = (s) => {
    let chars = [], nums = [], res = [];
    for(let ch of s) {
        if((/[a-zA-Z]/).test(ch)) {
            chars.push(ch);
        } else {
            nums.push(ch);
        }
    }
    if(Math.abs(chars.length - nums.length) > 1) {
        return '';
    }
    let flag = chars.length > nums.length ? true : false;
    while(chars.length > 0 && nums.length > 0) {
        if(flag) {
            res.push(chars.pop());
            res.push(nums.pop());   
        } else {
            res.push(nums.pop());
            res.push(chars.pop());
        }
    }
    if(chars[0]) {
        res.push(chars.pop());
    } else if(nums[0]) {
        res.push(nums.pop());
    }
    return res.join("");
};

//////////////////////////////////////////////////////////////////////////////////////

// #1732
const largestAltitude = (gain) => {
    // track alititude with curr by adding subsequent values in gain
    // if curr is ever bigger than high, it is a new largest altitude so set high to curr
    let high = 0, curr = 0;
    for(let n of gain) {
        curr += n;
        high = Math.max(high, curr);
    }
    return high;
};

//////////////////////////////////////////////////////////////////////////////////////

// #1470
const shuffle = (nums, n) => {
    if(nums.length === 1) {
        return nums;
    }
    // split nums into two halves, using fact that 2n = nums.length
    let stack1 = nums.slice(0, n);
    let stack2 = nums.slice(n, n * 2);
    let res = [];
    for(let i = 0; i < n; i++) {
        res.push(stack2.pop());
        res.push(stack1.pop());
    }
    // must return reverse of res given nature of push()
    return res.reverse();
};

//////////////////////////////////////////////////////////////////////////////////////

// #557
const reverseWords = (s) => {
    // split string into individual words
    let arr = s.split(" ");
    let res = "";
    for(let i = 0; i < arr.length; i++) {
        // reverse each word
        let rev = arr[i].split("").reverse().join("");
        // don't add extra space if word is the last word
        if(i === arr.length - 1) {
            res = res + rev;
        } else {
            res = res + rev + " ";
        }
    }
    return res;
};

//////////////////////////////////////////////////////////////////////////////////////

// Not from leetcode
// Reverses the order of elements in an array in O(n) time
const reverseArr = (arr) => {
    let start = 0, end = arr.length - 1;
    while(start < end) {
        [arr[start], arr[end]] = [arr[end], arr[start]];
        start++;
        end--;
    }
    return arr;
}

//////////////////////////////////////////////////////////////////////////////////////

// #921
const minAddToMakeValid = (s) => {
    // track number of open and close parentheses
    let open = 0, close = 0;
    for(let i = 0; i < s.length; i++) {
        // if open, add one to open tracker
        if(s.charAt(i) === '(') {
            open++;
        } else {
            // subtract one from open if there are unmatched open parentheses
            if(open > 0) {
                open--;
            // if there are no unmatched open parentheses, add one to closed tracker
            } else {
                close++;
            }   
        }
    }
    // return number of unmatched parentheses (at least one of open or close will always be 0)
    return open + close;
};

//////////////////////////////////////////////////////////////////////////////////////

// #709
// bruh moment
const toLowerCase = (s) => s.toLowerCase();

//////////////////////////////////////////////////////////////////////////////////////

// #914
const hasGroupsSizeX = (deck) => {
    let groups = {};
    // populate grops object where key = card and value = count of the card in the deck
    for(let card of deck) {
        groups[card] ? groups[card] = groups[card] + 1 : groups[card] = 1;
    }
    // find the gcd of the counts of the first two cards
    let x = gcd(groups[Object.keys(groups)[0]], groups[Object.keys(groups)[1]])
    // if the gcd of the previously calculated gcd and every other card count !== 1,
    // then there it is possible to split the deck into groups of size >= 2
    for(let card in groups) {
        if(groups[card] >= 2) {
            if(gcd(groups[card], x) === 1) {
                return false;
            }
        } else {
            return false;
        }
    }
    return true;
};

// helper func that returns gcd of two numbers
const gcd = (a, b) => {
    if(!b) return a;
    return gcd(b, a % b);
};

//////////////////////////////////////////////////////////////////////////////////////

// #234
const isPalindromeLinkedList = (head) => {
    let res = [];
    while(head) {
        res.push(head.val);
        head = head.next;
    }
    console.log(res);
    // need to use spread operator to copy (and in this case, also reverse) an array into a new array
    // didnt have to use this previously because the result was always not an array - i.e.
    // a non-array value is being stored in the new variable
    let rev = [...res].reverse();
    for(let i = 0; i < res.length; i++) {
        if(res[i] !== rev[i]) {
            return false;
        }
    }
    return true;
};

//////////////////////////////////////////////////////////////////////////////////////

// #1528
const restoreString = (s, indices) => {
    // create an array equal to the length of the string
    let res = new Array(s.length);
    for(let i = 0; i < s.length; i++) {
        // loop trhough indices
        // indices[i] will contain some index i where 0 <= i < s.length
        // therefore, set res[indices[i]] to the ith-index character of the scrambled string
        res[indices[i]] = s[i];
    }
    return res.join('');
};

// this was my first, not-clean solution
const restoreStringOriginal = (s, indices) => {
    let map = new Map();
    for(let i = 0; i < s.length; i++) {
        map.set(indices[i], s[i]); 
    }
    let res = [];
    for(let i = 0; i < s.length; i++) {
        res.push(map.get(i));
    }
    return res.join('');
}

//////////////////////////////////////////////////////////////////////////////////////

// #1232
const checkStraightLine = (coordinates) => {
    // get slope between first two sets of coordinates
    let slope = getSlope(1, 0, coordinates);
    // if the slope between all other adjacent pairs is the same, line is straight
    for(let i = 1; i < coordinates.length - 1; i++) {
        let slopel = getSlope(i+1, i, coordinates);
        if(slopel !== slope) {
            return false;
        }
    }
    return true;
};

// helper function that gets the slope of the line between two points
// if the slope is undefined, returns the string 'undefined'
const getSlope = (index1, index2, coordinates) => {
    let diffx = coordinates[index2][0] - coordinates[index1][0];
    let diffy = coordinates[index2][1] - coordinates[index1][1];
    return diffx === 0 ? 'undefined' : diffy/diffx; 
};

//////////////////////////////////////////////////////////////////////////////////////

// #1047

//////////////////////////////////////////////////////////////////////////////////////

// #101
const isSymmetric = (root) => {
    const areMirrored = (l, r) => {
        // case 1: if one of l or r is null, are not mirrored
        if((l === null && r !== null) || (l !== null && r === null)) {
            return false;
        // case 2: if both l and r are null, are mirrored
        } else if (l === null && r === null) {
            return true;
        // case 3: if both l and r not null, are mirrored if their values are equal and branches are mirrored
        } else {
            return (areMirrored(l.right, r.left) && areMirrored(l.left, r.right) && l.val === r.val);
        }
    }
    return areMirrored(root.left, root.right);
};

//////////////////////////////////////////////////////////////////////////////////////

// #235
// IS A BST DUMMY
const lowestCommonAncestor = (root, p, q) => {
    let lca = root;
    while (lca) {
      if (p.val < lca.val && q.val < lca.val) lca = lca.left;
      else if (p.val > lca.val && q.val > lca.val) lca = lca.right;
      else return lca;
    }
    return null;
};

//////////////////////////////////////////////////////////////////////////////////////

// Not from leetcode
// Determines if string is plaindrome without js methods
const isStringPalindrome = (s) => {
    if(s.length === 0) {
        return false;
    } 
    let i = 0, j = s.length - 1;
    while(i < j) {
        if(s[i] === s[j]) {
            i++;
            j--;
        } else {
            return false;
        }
    }
    return true;
};

//////////////////////////////////////////////////////////////////////////////////////

// #1710

const maximumUnits = (boxTypes, truckSize) => {
    // sort 2d array in descending order of the second element of each subarray
    boxTypes.sort((a, b) => {
        return a - b;
    });
    let j = 0, sol = 0;
    while(truckSize > 0) {
        if(boxTypes[j][0] === 0) {
            if(j + 1 >= boxTypes.length) {
                return sol;
            }
            j++;
        } else {
            sol += boxTypes[j][1];
            truckSize--;
            boxTypes[j][0]--;
        }
    }
    return sol;
};

//////////////////////////////////////////////////////////////////////////////////////

// #268
const missingNumber = (nums) => {
    let asum = 0, rsum = 0;
    for(let i = 1; i <= nums.length; i++) {
        asum += nums[i - 1];
        rsum += i;
    }
    return rsum - asum;
};

//////////////////////////////////////////////////////////////////////////////////////

// #136
const singleNumber = (nums) => {
    let set = new Set();
    for(let i = 0; i < nums.length; i++) {
        if(set.has(nums[i])) {
            set.delete(nums[i]);
        } else {
            set.add(nums[i]);
        }
    }
    return Array.from(set)[0];
};

//////////////////////////////////////////////////////////////////////////////////////

// #88
const merge = (nums1, m, nums2, n) => {
    nums1 = nums1.slice(0, m);
    nums2 = nums2.slice(0, n);
    for(let i = 0; i < m + n; i++) {
        while(nums2[0] <= nums1[i] || (nums2.length > 0 && i === m + n - 1)) {
            nums1.splice(i, 0, nums2[0]);
            nums2 = nums2.slice(1, nums2.length);
        }
    }
    console.log(nums1);
};

//////////////////////////////////////////////////////////////////////////////////////

// #202
const isHappy = (n) => {
    // subproblem
    const squareDigits = (num) => {
        let sum = 0;
        let arr = num.toString().split("");
        for(let i = 0; i < arr.length; i++) {
            sum += (parseInt(arr[i]) * parseInt(arr[i]));
        }
        return sum;
    };
    let arr = [];
    while(!arr.includes(n)) {
        if(n === 1) return true;
        arr.push(n);
        n = squareDigits(n);
    }
    return false;
};

//////////////////////////////////////////////////////////////////////////////////////

// #226
const invertTree = (root) => {
    if(root) {
        let tmp = invertTree(root.left);
        root.left = invertTree(root.right);
        root.right = tmp;
    }
    return root;
};

//////////////////////////////////////////////////////////////////////////////////////

// #53
// need to understand this one better
const maxSubArray = (nums) => {
    let x = 0;
    let y = nums[0];
    for(let num of nums) {
        x = Math.max(num, x + num);
        y = Math.max(y, x);
    }
    return y;
};

//////////////////////////////////////////////////////////////////////////////////////

// #
const isPerfectSquare = (num) => {
    if(num === 1) {
        return true;
    }
    for(let i = 0; i <= Math.ceil(num / 2); i++) {
        if(num === i * i) return true;
        if(num < i * i) return false;
    }
};

//////////////////////////////////////////////////////////////////////////////////////

// #160
// this is a good question
const getIntersectionNode = (headA, headB) => {
    if (!headA || !headB) {
        return null;
    }
    let p1 = headA;
    let p2 = headB;
    while(p1 !== p2) {
        p1 = p1 ? p1.next : headB;
        p2 = p2 ? p2.next : headA;
    }
    return p1;
};

//////////////////////////////////////////////////////////////////////////////////////

// #104
const maxDepth = (root) => {
    const iter = (node, level) => {
        if(node.right && node.left) {
            return Math.max(iter(node.right, level + 1), iter(node.left, level + 1));
        } else if(node.right || node.left) {
            return node.right ? iter(node.right, level + 1) : iter(node.left, level + 1);
        } else {
            return level;
        }
    };
    if(!root) return 0;
    return iter(root, 1);
};

//////////////////////////////////////////////////////////////////////////////////////

// #1436
const destCity = (paths) => {
    let map = new Map();
    for(pair of paths) {
        if(map.get(pair[0]) !== undefined) {
            map.delete(pair[0]);
        } else {
            map.set(pair[0], 0);
        }
        if(map.get(pair[1]) !== undefined) {
            map.delete(pair[1]);
        } else {
            map.set(pair[1], 1);
        }
    }
    for(let key of map.keys()) {
        if(map.get(key) === 1) {
            return key;
        }
    }
    return null;
};

//////////////////////////////////////////////////////////////////////////////////////

// #695
const maxAreaOfIsland = (grid) => {
    const calcIsland = (grid, y, x, size) => {
        let surroundings = [];
        let directions = [[-1, 0], [1, 0], [0, -1], [0, 1], [0, 0]];
        for(dir of directions) {
            if(((y + dir[0]) < grid.length) 
            && (y + dir[0] >= 0) 
            && ((x + dir[1]) < grid[0].length) 
            && (x + dir[1] >= 0)) {
                if(grid[y + dir[0]][x + dir[1]] === 1) {
                    surroundings.push([y + dir[0], x + dir[1]]);
                    grid[y + dir[0]][x + dir[1]] = 2;
                    size++;
                } 
            }
        }
        for(coord of surroundings) {
            size = calcIsland(grid, coord[0], coord[1], size);
        }
        return size;
    };
    let maxSize = 0;
    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[0].length; j++) {
            if(grid[i][j] === 1) {
                maxSize = Math.max(maxSize, calcIsland(grid, i, j, 0));
            }
        }
    }
    return maxSize;
};

//////////////////////////////////////////////////////////////////////////////////////

// #867
const transpose = (matrix) => {
    let sol = [];
    for(let i = 0; i < matrix[0].length; i++) {
        let arr = [];
        for(let j = 0; j < matrix.length; j++) {
            arr.push(matrix[j][i]);
        }
        sol.push(arr);
    }
    return sol;
};

//////////////////////////////////////////////////////////////////////////////////////

// #867
const bitwiseComplement = (n) => {
    let x = 2;
    while(x <= n) x *= 2;
    return x - n - 1;    
};

//////////////////////////////////////////////////////////////////////////////////////

// #
const slowestKey = (releaseTimes, keysPressed) => {
    let max = releaseTimes[0], index = 0;
    for(let i = 1; i < releaseTimes.length; i++) {
        let diff = releaseTimes[i] - releaseTimes[i-1];
        if(diff > max || (diff === max && keysPressed[i] > keysPressed[index])) {
            max = releaseTimes[i] - releaseTimes[i-1];
            index = i;
        }
    }
    return keysPressed[index];
};

//////////////////////////////////////////////////////////////////////////////////////

// #830
const largeGroupPositions = (s) => {
    let sol = [];
    for(let i = 0; i < s.length; i++) {
        let j = i + 1, count = 1;
        let ch = s.charAt(i);
        while(j < s.length && s.charAt(j) === ch) {
            count++;
            j++;
        }
        if(count >= 3) {
            sol.push([i, (i + count - 1)]);
        }
        i = j - 1;
    }
    return sol;
};

//////////////////////////////////////////////////////////////////////////////////////

// #1290
const getDecimalValue = (head) => {
    let arr = [];
    while(head) {
        arr.push(head.val);
        head = head.next;
    }
    let sol = 0;
    for(let i = 0; i < arr.length; i++) {
        sol += arr[i] * (2 ** (arr.length - i - 1));
    }
    return sol;
};

//////////////////////////////////////////////////////////////////////////////////////

// #342
// logarithm base change rule: log base x of y = log base c of y / log base c of x
const isPowerOfFour = (n) => { return (Math.log(n) / Math.log(4)) % 1 === 0; };

//////////////////////////////////////////////////////////////////////////////////////

// #896
const isMonotonic = (nums) => {
    const isIncreasing = (nums) => {
        for(let i = 1; i < nums.length; i++) {
            if(nums[i] < nums[i - 1]) {
                return false;
            }
        }
        return true;
    }
    const isDecreasing = (nums) => {
        for(let i = 1; i < nums.length; i++) {
            if(nums[i] > nums[i - 1]) {
                return false;
            }
        }
        return true;
    }
    return isIncreasing(nums) || isDecreasing(nums);
};

//////////////////////////////////////////////////////////////////////////////////////

// #605
const canPlaceFlowers = (flowerbed, n) => {
    let count = 0;
    for(let i = 0; i < flowerbed.length; i++) {
        if(i === 0 && flowerbed[i] === 0) {
            if(flowerbed[i + 1] === 0 || flowerbed[i + 1] === undefined) {
                count++;
                flowerbed[i] = 1;
            }
        } else if(i === flowerbed.length - 1 && flowerbed[i] === 0) {
            if(flowerbed[i - 1] === 0) {
                count++;
                flowerbed[i] = 1;
            }
        } else {
            if(flowerbed[i - 1] === 0 && flowerbed[i + 1] === 0 && flowerbed[i] === 0) {
                count++;
                flowerbed[i] = 1;
            }
        }
    }
    return count >= n;
};

//////////////////////////////////////////////////////////////////////////////////////

// #1287
const findSpecialInteger = (arr) => {
    let target = arr.length / 4;
    let map = new Map();
    for(let i = 0; i < arr.length; i++) {
        let x = map.has(arr[i]) ? map.get(arr[i]) + 1 : 1;
        if(x > target) {
            return arr[i];
        } else {
            map.set(arr[i], x);
        }
    }
};

//////////////////////////////////////////////////////////////////////////////////////

// #704
const search = (nums, target) => {

    const loop = (nums, target, track) => {
        if(nums.length === 0) {
            return -1;
        }
        let index = Math.floor(nums.length / 2);
        if(nums[index] === target) {
            return index;
        } else if(target < nums[index]) {
            return track + search(nums.slice(0, index), target, index);
        } else {
            return track + search(nums.slice(index + 1, nums.length), target, index);
        }
    }
    return loop(nums, target, 0);
};

//////////////////////////////////////////////////////////////////////////////////////

// #1446
const maxPower = (s) => {
    let max = 1;
    for(let i = 0; i < s.length; i++) {
        let ch = s.charAt(i);
        let count = 1;
        while(i + 1 < s.length && s[i + 1] === ch) {
            count++;
            if(count > max) {
                max = count;
            }
            i++;
        }
    }
    return max;
};

//////////////////////////////////////////////////////////////////////////////////////

// #1880
const isSumEqual = (firstWord, secondWord, targetWord) => {
    const getInt = (word) => {
        let arr = [];
        for(let i = 0; i < word.length; i++) {
            arr.push(word.charCodeAt(i) - 97);
        }
        return parseInt(arr.join(''));
    }
    return (getInt(firstWord) + getInt(secondWord)) === getInt(targetWord);
};

//////////////////////////////////////////////////////////////////////////////////////

// #844
const backspaceCompare = (s, t) => {
    const doBackspace = (string) => {
        let s = [];
        for(let ch of string) {
            ch === '#' ? s.pop() : s.push(ch);
        }
        return s.join('');
    }
    return doBackspace(s) === doBackspace(t);
};

//////////////////////////////////////////////////////////////////////////////////////

// #804
const uniqueMorseRepresentations = (words) => {
    let dict = [".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."];
    // helper function to convert a word to morse code
    const wordToCode = (word) => {
        let arr = [];
        for(let i = 0; i < word.length; i++) {
            arr.push(dict[word.charCodeAt(i) - 97]);
        }
        return arr.join('');
    }
    // assemble array of unique codes (i.e. dont add duplicates) and return length
    let codes = [];
    for(let word of words) {
        let code = wordToCode(word);
        if(!codes.includes(code)) {
            codes.push(code);
        }
    }
    return codes.length;
};

//////////////////////////////////////////////////////////////////////////////////////

// #1394
const findLucky = (arr) => {
    let map = new Map();
    // build map where key = array element and where val = number of occurrences of said element
    for(let i = 0; i < arr.length; i++) {
        map.has(arr[i]) ? map.set(arr[i], map.get(arr[i]) + 1) : map.set(arr[i], 1);
    }
    let lucky = -1;
    // for each key, if its value is equal to itself then it is lucky
    for(let key of map.keys()) {
        // set lucky to curent key iff it is larger than current lucky num
        if(map.get(key) === key && key > lucky) lucky = key;
    }
    return lucky;
};

//////////////////////////////////////////////////////////////////////////////////////

// #1089
const duplicateZeros = (arr) => {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === 0) {
            // insert 0 right after the index i and replace 0 existing elements (thereby simply adding one)
            arr.splice(i, 0, arr[i]);
            // pop last element to retain array size
            arr.pop();
            i++;
        }
    }
    return arr;
};

//////////////////////////////////////////////////////////////////////////////////////

// #917
const reverseOnlyLetters = (s) => {
    // build array of only letters using regex
    let letters = s.match(/[a-z]/gi);
    // replace letters in s with the top of the stack of letters (thereby reversing)
    return s.replace(/[a-z]/gi, () => letters.pop());
};

//////////////////////////////////////////////////////////////////////////////////////

// #461
const hammingDistance = (x, y) => {
    // convert numbers to binary and then to arrays
    x = x.toString(2).split('');
    y = y.toString(2).split('');
    // add zeroes to beginning of one of the arrays
    if(x.length > y.length) {
        let len = x.length - y.length;
        for(let i = 0; i < len; i++) {
            y.unshift('0');
        }
    } else {
        let len = y.length - x.length;
        for(let i = 0; i < len; i++) {
            x.unshift('0');
        }
    }
    // iterate through arrays and count differences
    let count = 0;
    for(let i = 0; i < x.length; i++) {
        if(x[i] !== y[i]) count++;
    }
    return count;
};

//////////////////////////////////////////////////////////////////////////////////////

// #1541
const minInsertions = (s) => {
    let open = 0, closed = 0;
    for(let i = 0; i < s.length; i++) {
        if(open >= 1 && closed >= 2) {
            open = open - 1;
            closed = closed - 2;
        }
        if(s[i] === '(') {
            open++;
        } else {
            closed++;
        }
    }
    let add = 0;
    if(2 * open < closed) {
        let tmp = closed % 2 === 0 ? closed : closed + 1;
        add += (tmp - (open * 2)) / 2;
        open += (tmp - (open * 2)) / 2;
    }
    while(2 * open > closed) {
        closed++;
        add++;
    }
    return add;
};

//////////////////////////////////////////////////////////////////////////////////////

// #1556
const thousandSeparator = (n) => {
    let sol = [];
    // turn given number into reverse array
    let arr = n.toString().split('').reverse();
    // add each element to sol, adding a '.' when necessary
    for(let i in arr) {
        sol.push(arr[i]);
        // criteria: after every third integer, except not if is last integer
        if(i % 3 === 2 && i < arr.length - 1) {
            sol.push('.');
        }
    }
    return sol.reverse().join('');
};

//////////////////////////////////////////////////////////////////////////////////////

// #1945
const getLucky = (s, k) => {

    // helper function: performs subtask of finding sum of elements of array
    // splits the resultant sum into an array of single-digit integers
    // e.g. [8, 5, 1, 2, 1, 2, 1, 5] => 25, return [2, 5]
    const transform = (arr) => {
        var sum = 0;
        for(let i = 0; i < arr.length; i++) {
            sum += parseInt(arr[i]);
        }
        return sum.toString().split('');
    }

    // transform the given string into an array of numbers (e.g. "hello" -> [8, 5, 12, 12, 15])
    var arr = [];
    for(let i = 0; i < s.length; i++) {
        arr.push((s.charCodeAt(i) - 96));
    }

    // further transform array by separating the digits of all integers >= 10 
    // (e.g. [8, 5, 12, 12, 15] -> ['8', '5', '1', '2', '1', 2, 1, 5])
    arr = arr.join('').split('');

    // call helper function k times
    for(let i = 0; i < k; i++) {
        arr = transform(arr);
    }

    // return transformed integer
    return parseInt(arr.join(''));
}

//////////////////////////////////////////////////////////////////////////////////////

// #1913
const maxProductDifference = (nums) => {
    nums.sort((a, b) => {
        return a - b;
    });
    return (nums[nums.length - 1] * nums[nums.length - 2]) - (nums[1] * nums[0]);
};

//////////////////////////////////////////////////////////////////////////////////////

// #206
const reverseList = (head) => {
    var prev = null, next;
    while(head) {
        next = head.next;
        head.next = prev;
        prev = head;
        head = next;
    }
    return prev;
};

//////////////////////////////////////////////////////////////////////////////////////

// #1695
// drawing the process out would have helped immensely
// got sliding window concept right, just needed better execution of minutae
const maximumUniqueSubarray = (nums) => {
    var max = 0, left = 0, right = 0, len = nums.length, map = new Map();
    map.set(nums[0], 0);
    while(right < len) {
        let sum = 0;
        // move right bondary as far as possible, adding to the map as it increments
        right += 1;
        while(right < len && !map.has(nums[right])) {
            map.set(nums[right], right);
            right++;
        }
        // when encounters repeat num or end of the array, 
        // sum all nums between and including left and right boundary
        for(let i = left; i < right; i++) {
            sum += nums[i];
        }
        // take max of current max and sum
        max = Math.max(max, sum);
        // delete necessary elements before moving the left boundary
        for(let i = left; i < map.get(nums[right]); i++) {
            map.delete(nums[i]);
        }
        // move left to index of first occurence of repeated number + 1
        left = map.get(nums[right]) + 1;
        // update mapped index of val at right boundary
        map.set(nums[right], right);
    }
    return max;
};

//////////////////////////////////////////////////////////////////////////////////////

// #1837
const sumBase = (n, k) => {
    let str = n.toString(k), sum = 0;
    for(let i = 0; i < str.length; i++) {
        sum += parseInt(str.charAt(i));
    }
    return sum;
};

//////////////////////////////////////////////////////////////////////////////////////

// #1018
const prefixesDivBy5 = (nums) => {
    var arr = [], sol = [];
    for(let i = 0; i < nums.length; i++) {
        arr.push(nums[i]);
        sol.push(parseInt(arr.join(""), 2) % 5 === 0);
    }
    return sol;
};

//////////////////////////////////////////////////////////////////////////////////////

// #257
const binaryTreePaths = (root) => {
    var sol = [];
    const recur = (root, path) => {
        if(root) {
            if(root.left) {
                recur(root.left, path + `->${root.left.val}`);
            }
            if(root.right) {
                recur(root.right, path + `->${root.right.val}`);
            }
        }
        if(!root.left && !root.right) {
            sol.push(path);  
        }
    };
    recur(root, `${root.val}`);
    return sol;
};

//////////////////////////////////////////////////////////////////////////////////////

// #344
const reverseString = (s) => {
    var start = 0, end = s.length - 1;
    while(start < end) {
        [s[start], s[end]] = [s[end], s[start]];
        start++;
        end--;
    }
    return s;
};

//////////////////////////////////////////////////////////////////////////////////////

// #1748
const sumOfUnique = (nums) => {
    var map = new Map(), sum = 0;
    nums.forEach((el) => {
        map.has(el) ? map.set(el, map.get(el) + 1) : map.set(el, 1);
    });
    for(let [key, value] of map) {
        if(value === 1) {
            sum += key;
        }
    }
    return sum;
};

//////////////////////////////////////////////////////////////////////////////////////

// #1636
const frequencySort = (nums) => {
    var map = new Map();
    nums.forEach((el) => map.has(el) ? map.set(el, map.get(el) + 1) : map.set(el, 1));
    return nums.sort((a, b) => map.get(a) === map.get(b) ? b - a : map.get(a) - map.get(b));
};

//////////////////////////////////////////////////////////////////////////////////////

// #