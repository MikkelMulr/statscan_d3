import BarDisplay from './BarDisplay';
import LineDisplay from './LineDisplay';

let dataset = [];
let height = 700;
let width = 1230;

fetch('./data.json')
	.then(data => data.json())
	.then(data => {
		dataset = data.data;
		let myBars = new BarDisplay(height, width, dataset);
		let myLine = new LineDisplay(height, width, dataset);
	});