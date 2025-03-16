function plusMinus(arr) {
  let post = 0, neg = 0, zero = 0;

  arr.forEach(num => {
    if (num > 0) post++;
    else if (num < 0) neg++;
    else zero++;
  });

  let n = arr.length;
  console.log((post / n).toFixed(6));
  console.log((neg / n).toFixed(6));
  console.log((zero / n).toFixed(6));
}
