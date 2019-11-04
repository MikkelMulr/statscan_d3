import BarDisplay from './BarDisplay';
import LineDisplay from './LineDisplay';

let dataset = [];

fetch('./data.json')
	.then(data => data.json())
	.then(data => {
		dataset = data.data;
		let myBars = new BarDisplay(dataset);
		let myLine = new LineDisplay(dataset);
	});