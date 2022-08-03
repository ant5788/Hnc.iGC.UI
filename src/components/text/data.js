import * as echarts from "echarts";
//数据组装函数
const dataAssembly = () => {
  const assArray = [];
  //三种状态
  const typesStatus = [
    {
      name: "运行",
      color: "#2f4554",
    },
    {
      name: "待机",
      color: "#d48265",
    },
    {
      name: "宕机",
      color: "#c23531",
    },
  ];
  //定义设备
  const categories = ["设备1", "设备2", "设备3", "设备4"];
  //获取当前时间
  const nowData = new Date().getTime();
  //设置开始时间为过去两个小时
  const inThePastTime = nowData - 1000 * 60 * 60 * 2;
  //组装基本数据
  //时间
  const timerArr = [];
  //状态
  const stateArr = [];
  const baseAssData = (timer) => {
    for (let index = 0; index < 24; index++) {
      stateArr.push(typesStatus[Math.floor(Math.random() * 3)]["name"]);
      timerArr.push(timer + 1000 * 60 * 5 * index);
    }
  };
  // console.log(stateArr);
  // console.log(timerArr);
  baseAssData(inThePastTime);
  //组装对象数据
  const assvalue = () => {
    for (let idx = 0; idx < 4; idx++) {
      for (let i = 0; i < 24; i++) {
        assArray.push({
          //设备名称
          name: categories[idx],
          value: [
            //设备索引 作为y轴
            idx,
            //状态开始时间
            timerArr[i],
            //状态结束时间 i===23时候 ,timerArr[i+1] 不存在的
            i === 23 ? timerArr[23] + 1000 * 60 * 5 : timerArr[i + 1],
          ],
          //状态颜色
          itemStyle: {
            normal: {
              color: typesStatus[Math.floor(Math.random() * 3)]["color"],
            },
          },
        });
      }
    }
    return assArray;
  };
  return assvalue();
  // console.log(assArray);
};
// 时间格式化
const formattered = (val) => {
  if (parseInt(val) < 10) {
    val = "0" + val;
  }
  return val;
};
const formatters = (value) => {
  const date = new Date(value);
  return (
    formattered(date.getHours()) +
    ":" +
    formattered(date.getMinutes()) +
    ":" +
    formattered(date.getSeconds())
  );
};
//状态格式化
const formateText = (params) => {
  switch (params) {
    case "#95EC69":
      return "复位";
    case "#FFC600":
      return "停止";
    case "#3A80EA":
      return "进给保持";
    case "#1583A2":
      return "循环启动";
    case "#00B8F5":
      return "启动状态";
    case "#EF4848":
      return "报警";
    case "#C1CDC1":
      return "离线";
    default:
      break;
  }
};
//坐标封装函数抽取  //echarts自己封装的方法
const renderItem = (params, api) => {
  //开发者自定义的图形元素渲染逻辑，是通过书写 renderItem 函数实现的
  const categoryIndex = api.value(0); //这里使用 api.value(0) 取出当前 dataItem 中第一个维度的数值。
  const start = api.coord([api.value(1), categoryIndex]); // 这里使用 api.coord(...) 将数值在当前坐标系中转换成为屏幕上的点的像素值。
  const end = api.coord([api.value(2), categoryIndex]);
  const height = api.size([0, 1])[1] * 0.6;
  return {
    type: "rect",
    shape: echarts.graphic.clipRectByRect(
      {
        // 矩形的位置和大小。
        x: start[0],
        y: start[1] - height / 2,
        width: end[0] - start[0],
        height: height,
      },
      {
        // 当前坐标系的包围盒。
        x: params.coordSys.x,
        y: params.coordSys.y,
        width: params.coordSys.width,
        height: params.coordSys.height,
      }
    ),
    style: api.style(),
  };
};
export { dataAssembly, formattered, formatters, formateText, renderItem };
