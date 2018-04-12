window.chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(231,233,237)'
};

var config = {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Water',
            backgroundColor: window.chartColors.red,
            borderColor: window.chartColors.red,
            data: [],
            fill: false,
        }]
    },
    options: {
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,   // minimum value will be 0.
                },
                scaleLabel: {
                    display: true,
                    labelString: 'No. of Molecules'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Time (hh:mm:ss)'
                }
            }]
        }   
    }
};

//line Graph
var ctx = document.getElementById("lineChart").getContext('2d');            
window.myLine = new Chart(ctx, config);

//Add data to graph
function addLabel(label){
    window.myLine.data.labels.push(label);
    window.myLine.update();
}
function addData(i, data) {
    window.myLine.data.datasets[i].data.push(data);
    window.myLine.update();
}

//Delete Data from graph
function removeData() {

    var count=window.myLine.data.labels.length;
    for (var i = 0; i < count; i++) {
        window.myLine.data.labels.pop();
    }
    window.myLine.data.datasets.forEach((dataset) => {
        for (var i = 0; i < count; i++) {
            dataset.data.pop();
        }
    });
    window.myLine.update();
}

//Add new substance to chart
function addDataset(label){

    var colorNames = Object.keys(window.chartColors);
    var colorName = colorNames[window.myLine.data.datasets.length % colorNames.length];
    var newColor = window.chartColors[colorName];
    var newDataset = {
        label: label,
        backgroundColor: newColor,
        borderColor: newColor,
        data: [],
        fill: false
    };

    window.myLine.data.datasets.push(newDataset);
    window.myLine.update();
    
}
function removeDataset(){
    window.myLine.data.datasets.pop();
}