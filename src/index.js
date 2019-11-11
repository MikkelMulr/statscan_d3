import BarDisplay from './BarDisplay';
import LineDisplay from './LineDisplay';
import Legend from './legend';

let dataset = [];
let width = 1200;
let height = 600;

fetch('./data.json')
	.then(data => data.json())
	.then(data => {
		dataset = data.data;
		let myBars = new BarDisplay(height, width, dataset);
		let myLine = new LineDisplay(height, width, dataset);
	});


let mylegend = new Legend();