export class EchartOptionBuilder {
  public static buildPieChartOption(chartData, option) {
    let defaultOption = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        data: chartData.legends,
        bottom: "10%"
      },
      color: option.color
        ? option.color
        : ["#f4511e", "#ffb300", "#00897b", "#7CB342", "#708090"],
      series: [
        {
          name: option.title,
          type: "pie",
          radius: option.radius ? option.radius : "90%",
          center: ["50%", "30%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: "center"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "10",
                fontWeight: "bold"
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: chartData.data
        }
      ]
    };
    return defaultOption;
  }
}

export class EchartDataTrnsformer {
  public static transformForPieChart(originalData) {
    let finalData = {
      legends: [],
      data: []
    };
    for (let l = 0; l < originalData.length; l++) {
      finalData.legends.push(originalData[l].name);
      finalData.data.push({
        name: originalData[l].name,
        value: originalData[l].data
      });
    }
    return finalData;
  }

  public static transformFor2DChart(originalData) {
    let finalData = {
      xAxis: [],
      legends: [],
      data: [],
      count: []
    };
    for (let i = 0; i < originalData.data.length; i++) {
      finalData.xAxis.push(originalData.data[i].name);
      if (finalData.legends.length == 0) {
        for (let j = 0; j < originalData.data[i].data.length; j++) {
          finalData.legends.push(originalData.data[i].data[j].name);
        }
      }
    }
    for (let j = 0; j < finalData.legends.length; j++) {
      let seriesData = {
        name: finalData.legends[j],
        data: []
      };
      finalData.data.push(seriesData);
      for (let i = 0; i < originalData.data.length; i++) {
        seriesData.data.push(originalData.data[i].data[j].data);
      }
    }

    if (originalData.count) {
      for (let l = 0; l < originalData.count.length; l++) {
        finalData.count.push({
          name: originalData.count[l].name,
          value: originalData.count[l].data
        });
      }
    }
    return finalData;
  }

  public static transformFor3DChart(originalData) {
    let finalData = {
      xAxis: [],
      timeline: [],
      legends: [],
      data: [],
      count: []
    };
    for (let i = 0; i < originalData.data.length; i++) {
      finalData.timeline.push(originalData.data[i].name);
      for (let j = 0; j < originalData.data[i].data.length; j++) {
        if (finalData.xAxis.indexOf(originalData.data[i].data[j].name) < 0) {
          finalData.xAxis.push(originalData.data[i].data[j].name);
        }
        if (finalData.legends.length == 0) {
          for (let k = 0; k < originalData.data[i].data[j].data.length; k++) {
            finalData.legends.push(originalData.data[i].data[j].data[k].name);
          }
        }
      }
    }
    for (let i = 0; i < originalData.data.length; i++) {
      let data = {};
      data["title"] = {
        text: originalData.data[i].name + " Statistics"
      };
      finalData.data.push(data);
      data["series"] = [];
      for (let j = 0; j < finalData.legends.length; j++) {
        let seriesData = {};
        data["series"].push(seriesData);
        seriesData["data"] = [];
        for (let k = 0; k < originalData.data[i].data.length; k++) {
          seriesData["data"].push({
            name: originalData.data[i].data[k].name,
            value: originalData.data[i].data[k].data[j].data
          });
        }
      }
      if (originalData.data[i].additionalData) {
        let temp = [];
        for (let l = 0; l < originalData.data[i].additionalData.length; l++) {
          temp.push({
            name: originalData.data[i].additionalData[l].name,
            value: originalData.data[i].additionalData[l].data
          });
        }
        data["series"].push({
          data: temp
        });
      }
    }

    if (originalData.count) {
      for (let l = 0; l < originalData.count.length; l++) {
        finalData.count.push({
          name: originalData.count[l].name,
          value: originalData.count[l].data
        });
      }
    }
    return finalData;
  }
}
