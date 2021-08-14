// 扁平化数据
let originData = [
  { id: 1, name: "部门1", pid: 0 },
  { id: 2, name: "部门2", pid: 1 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 4, name: "部门4", pid: 3 },
  { id: 5, name: "部门5", pid: 4 },
];
let treeList = [];
// 处理函数
function handleItem(target) {
  // 法一
  // 这种写法会提示 Maximum call stack size exceeded
  // 可能是一直是从头遍历 treeList 导致超栈
  // for (let i = 0; i < treeList.length; i++) {
  //   if (treeList[i].id == treeList.pid) {
  //     if (treeList[i].children) {
  //       treeList[i].children.push(target);
  //     } else {
  //       treeList[i].children = [target];
  //     }
  //     result = 'find'
  //     break;
  //   } else if (treeList[i].children.length) {
  //     // console.log(searchParent, "sea");
  //     searchParent(target, treeList[i]);
  //     break;
  //   } else {
  //     console.log(target.id, "执行");
  //   }
  // }

  // 法二  修改法一 实现扁平化
  //  换到了在函数内定义遍历方法 进行
  // let searchResult = false;
  // let getFunc = (dataList = []) => {
  //   dataList.filter((data) => {
  //     if (data.id == target.pid) {
  //       searchResult = true;
  //     } else if (Reflect.has(data, "children")) {
  //       getFunc(data.children);
  //     }
  //   });
  // };
  // let setFunc = (dataList = []) => {
  //   dataList.filter((data) => {
  //     if (data.id == target.pid) {
  //       if (Reflect.has(data, "children")) {
  //         data.children.push(target);
  //       } else {
  //         data.children = [target];
  //       }
  //     } else if (Reflect.has(data, "children")) {
  //       setFunc(data.children);
  //     }
  //   });
  // };
  // // 获取查询结果
  // getFunc(treeList);
  // // 通过查询结果处理
  // if (searchResult) {
  //   // console.log("有找到父级id", target.name);
  //   // 有找到父级的遍历推入相应的列表下
  //   setFunc(treeList);
  // } else {
  //   // 没找到父级的直接推入
  //   treeList.push(target);
  // }

  // 法三  综合 法二 getFunc 与 setFunc
  let searchResult = false;
  let doFunc = (dataList = []) => {
    dataList.filter((data) => {
      if (data.id == target.pid) {
        if (Reflect.has(data, "children")) {
          data.children.push(target);
        } else {
          data.children = [target];
        }
        searchResult = true;
      } else if (Reflect.has(data, "children")) {
        doFunc(data.children);
      }
    });
  };
  // 获取查询结果
  doFunc(treeList);
  // 通过查询结果处理
  if (!searchResult) {
    // console.log("有找到父级id", target.name);
    // 有找到父级的遍历推入相应的列表下
    treeList.push(target);
  }
}

(function _initTree() {
  console.time("timing");
  originData.filter((data) => {
    handleItem(data);
  });
  setTimeout(() => {
    console.log(JSON.stringify(treeList), "处理结果");
    console.timeEnd("timing");
  });
})();

// _initTree();
