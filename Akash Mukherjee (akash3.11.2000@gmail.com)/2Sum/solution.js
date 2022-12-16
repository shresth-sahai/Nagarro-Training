//Given inputs
let arr = [2,7,11,15];
let v = 9;

//Algorithm
const dict = {};
for (let i = 0; i < arr.length; i++) {
    const r = v - arr[i];
    if (r in dict) {
        console.log([dict[r], i]);
        break;
    }
    dict[arr[i]] = i;
}