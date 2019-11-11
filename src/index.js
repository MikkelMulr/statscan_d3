import BarDisplay from './BarDisplay';
import LineDisplay from './LineDisplay';
import Legend from './legend';

let dataset = [];

fetch('./data.json')
	.then(data => data.json())
	.then(data => {
		dataset = data.data;
		let myBars = new BarDisplay(dataset);
		let myLine = new LineDisplay(dataset);
	});

let mylegend = new Legend();
