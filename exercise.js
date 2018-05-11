//By Christopher Bendel
//I tried to provide answers for each question in a different style

//Answer 1 uses functional methods that are built into the language
//Answer 2 uses sets because they have quick lookup times
//Answer 3 is a homebrewed solution to show that I don't solely rely on built in language methods

const ints = [1, 1, 2, 4, 4, 5, 5, 5, 6, 7, 9];
const unsortedInts = [7, 1, 4, 5, 9, 6, 5, 1, 2, 4, 5];

target = 10;


//Merge sort implementation in case the array is not sorted
//O (n logn)
mergeSort = arr => {
  //Already sorted
  if (arr.length == 1) {
    return arr;
  }

  //Get our pivot element in the middle
  const pivot = Math.floor(arr.length / 2);
  //Get our left and right slices of the array (based on the pivot)
  const left = arr.slice(0, pivot);
  const right = arr.slice(pivot);

  //Recursively sort the slices
  return merge(mergeSort(left), mergeSort(right));
}

merge = (left, right) => {
  let sorted = [];
  //Left and right indices
  let l = 0, r = 0;

  while (l < left.length && r < right.length) {
    if (left[l] < right[r]) {
      sorted.push(left[l]);
      l++;
    } else {
      sorted.push(right[r]);
      r++;
    }
  }

  return sorted.concat(left.slice(l)).concat(right.slice(r));
}

//Sorting test
console.log("Unsorted list: ", unsortedInts);
console.log("Sorted list: ", mergeSort(unsortedInts));

//Prints all pairs
//O(n^3) worst case complexity
//Initial foreach loop O(n)
//Filter to find all matching remainders in the set O(n)
//Foreach over the filtered list of remainders O(n)
//Gives us O(n^3)
printAllPairs = (nums, target) => {
  nums.forEach((num, index) => {
    remainder = target - num;
    //Find all matching remainders while excluding the current number we're on
    nums.filter((num, filterIndex) => num == remainder && index != filterIndex)
      .forEach(remainder => {
        console.log("[" + num + ", " + remainder + "]");
      });
  });
}

console.log("------------------");
console.log("Printing all pairs");
console.log("------------------");
printAllPairs(ints, target);


//Prints unique pairs not accounting for reversed dupes
//O(n^2) worst case, O(n) average case depending on the set's performance
printUniquePairs = (nums, target) => {
  //Remove the duplicates by creating a set
  //since we don't need to worry about them in this example
  //Sets have O(n) worst case lookup time, but O(1) average time
  numSet = new Set(nums);

  numSet.forEach(num => {
    remainder = target - num;
    if (numSet.has(remainder)) {
      console.log("[" + num + ", " + remainder + "]");
    }
  });
}

console.log("------------------");
console.log("Printing unique pairs");
console.log("------------------");
printUniquePairs(ints, target);


//Prints combo pairs only once
//O(n) complexity
//Assumes a sorted array is given
printUniqueComboPairs = (nums, target) => {
  if (nums.length < 2) {
    console.log("Less than 2 numbers in the array, can't sum anything");
    return;
  }

  //Start at the left and right most elements
  left = 0;
  right = nums.length - 1;

  //Work our way inwards
  while (left < right) {
    //Get the sum of the current positions
    sum = nums[left] + nums[right];
    //If they're the same, we have our match and we move one element inward from each end
    if (sum == target) {
      console.log("[" + nums[left] + ", " + nums[right] + "]");
      left += 1;
      right -= 1;
    } else if (sum < target) {
      //We move in from the beginning of the array
      left += 1;
    } else if (sum > target) {
      //We move in from the end of the array
      right -= 1;
    }
  }
}

console.log("------------------");
console.log("Printing unique combos");
console.log("------------------");
printUniqueComboPairs(ints, target);