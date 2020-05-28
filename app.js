const timeLineAPI = 'https://data.nepalcorona.info/api/v1/covid/timeline'
const Testing = 'https://nepalcorona.info/api/v1/data/nepal'

var positive = document.getElementById('positive')
var dead = document.getElementById('dead')
var recovered = document.getElementById('recovered')
var positivenew = document.getElementById('positivenew')
var deadnew = document.getElementById('deadnew')
var recoverednew = document.getElementById('recoverednew')
var dates = []
var ch_dead = []
var ch_recovered = []
var total_cases = []


async function getTimelineHistory(){
	var fetch_data = await fetch(timeLineAPI)
	var timeline_data = await fetch_data.json()
	timeline_data.forEach(timeline => {
		total_cases.push(timeline.totalCases)
		ch_recovered.push(timeline.totalRecoveries)
		ch_dead.push(timeline.totalDeaths)
		dates.push(timeline.date)
	})
	positive.innerHTML = timeline_data[timeline_data.length-1].totalCases	
	dead.innerHTML = timeline_data[(timeline_data.length-1)].totalDeaths	
	recovered.innerHTML = timeline_data[(timeline_data.length-1)].totalRecoveries
	positivenew.innerHTML = `+${timeline_data[timeline_data.length-1].newCases}`	
	deadnew.innerHTML = `+${timeline_data[(timeline_data.length-1)].newDeaths}`	
	recoverednew.innerHTML = `+${timeline_data[(timeline_data.length-1)].newRecoveries}`		

}


function makechart(){
	var ctx = document.getElementById('covid-chart').getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels:dates.slice(63),
			datasets: [{
				label: 'Total Cases',
				fill:false,
				backgroundColor:'yellow',
				borderColor:'yellow',
				data: total_cases.slice(63),
				borderWidth: 1
			},
			{
				label: 'Recovered',
				fill:false,
				backgroundColor:'green',
				borderColor:'green',
				data: ch_recovered.slice(63),
				borderWidth: 1
			},
			{
				label: 'Dead',
				fill:false,
				backgroundColor:'red',
				borderColor:'red',
				data: ch_dead.slice(63),
				borderWidth: 1
			}
		]
		},
		options: {
			maintainAspectRatio: false,
			responsive: true,
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	});
}

function show(){
	
	document.getElementsByClassName('list-container')[0].style.display = 'none'
	document.getElementById('footor').style.display = 'none'
	document.getElementsByClassName('loading')[0].style.display = 'flex'
}

function displayever(){
	
	document.getElementsByClassName('list-container')[0].style.display = 'block'
	document.getElementsByClassName('loading')[0].style.display = 'none'
	document.getElementById('footor').style.display = 'block'

}

show()
getTimelineHistory()
.then(()=>{
	makechart()
})
.then(()=>{
	displayever()
})
