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

  public static buildSeriesChart(chartData, option): any {

    for (var i = 0; i < option.chartConfigurations.length; i++) {
      for (var j = 0; j < chartData.data.length; j++) {
        if (option.chartConfigurations[i].name == chartData.data[j].name) {
          var series = option.chartConfigurations[i];
          series.data = chartData.data[j].data;
          chartData.data[j] = series;
        }
      }
    }
    let defaultOption = {
      title: {
        text: option.title,
        subtext: option.subTitle
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow' // 'line' | 'shadow'
        }
      },
      legend: {
        x: "right",
        data: chartData.legends
      },
      color: (option.color ? option.color : ['#f4511e', '#ffb300', '#00897b', '#7CB342', '#708090']),
      grid: {
        left: '35',
        right: '15',
        bottom: '25',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: chartData.xAxis
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: option.chartConfigurations,
      dataZoom: []
    };
    if (chartData.xAxis.length > 20) {
      defaultOption.grid.bottom = '45';
      defaultOption.dataZoom = [
        {
          type: 'inside',
          start: 0,
          end: 20
        },
        {
          show: true,
          height: 17,
          type: 'slider',
          top: '90%',
          xAxisIndex: [0],
          start: 0,
          end: 20,
          realtime: true,
          handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '120%',
          handleStyle: {
            color: '#009688',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }];
    }
    return defaultOption;
  }

  public static build3DChart(chartData, option): any {

    for (var i = 0; i < option.chartConfigurations.length; i++) {
      for (var j = 0; j < chartData.data.length; j++) {
        if (option.chartConfigurations[i].name == chartData.data[j].name) {
          var series = option.chartConfigurations[i];
          series.data = chartData.data[j].data;
          chartData.data[j] = series;
        }
      }
    }
    let defaultOption = {
      title: {
        text: option.title,
        subtext: option.subTitle
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow' // 'line' | 'shadow'
        }
      },
      legend: {
        x: "center",
        y: "bottom",
        data: chartData.legends
      },
      color: (option.color ? option.color : ['#f4511e', '#ffb300', '#00897b', '#7CB342', '#708090']),
      grid: {
        left: '0',
        right: '0',
        top: '10',
        bottom: '30',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: chartData.xAxis
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: option.chartConfigurations,
      dataZoom: [],
    }
    if (chartData.xAxis.length > 20) {
      defaultOption.grid.bottom = '45';
      defaultOption.dataZoom = [
        {
          type: 'inside',
          start: 0,
          end: 20
        },
        {
          show: true,
          height: 17,
          type: 'slider',
          top: '90%',
          xAxisIndex: [0],
          start: 0,
          end: 20,
          realtime: true,
          handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '120%',
          handleStyle: {
            color: '#009688',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }];
    }

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

  public static transformFor2DChart(originalData): any {
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

  public static transformFor3DChart(originalData): any {
    var finalData = {
      "xAxis": [],
      "legends": [],
      "data": [],
      "count": []
    };
    for (let category of originalData.data) {
      finalData.xAxis.push(category.name);
      for (let series of category.data) {
        if (finalData.legends.indexOf(series.name) < 0) {
          finalData.legends.push(series.name);
        }
      }
    }
    for (let legend of finalData.legends) {
      var temp = { name: legend, data: [] }
      for (let category of originalData.data) {
        for (let data of category.data) {
          if (legend == data.name) {
            temp.data.push(data.data);
          }
        }
      }
    }
    finalData.data.push(temp);
    return finalData;
  }
}
