// Set 语法 new Set
//  去除数组或字符串中重复的元素

// eg1
const tempA = new Set([2, 3, 2, 5, 5, 1, 5]);
console.log(tempA, "处理数组");

//eg2
const tempB = [...new Set("hellow word")];
console.log(tempB, "处理字符串");
