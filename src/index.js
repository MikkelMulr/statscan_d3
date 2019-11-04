import BarDisplay from './BarDisplay';
import LineDisplay from './LineDisplay';

let myBars = new BarDisplay(dataset);
let myLine = new LineDisplay(dataset);

const dataset = fetch('./data.json')
	.then(data => data.json())
	.then(data => {
		return data.data;
	});

console.log(dataset);
