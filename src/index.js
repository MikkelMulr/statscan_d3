/**
 * Authors: Suleman, Usman, Michael
 * Description: Two charts (line and bar) recieving data from an external set of data,
 * one display the precipitation and the other temperature over the span of 40 years.
 * The data is specific to the canadian artctic tundra from the years 1970 - 2010.
 */


// importing classes for graph and the legend
import BarDisplay from './BarDisplay';
import LineDisplay from './LineDisplay';
import Legend from './legend';

// variables to store the height, width, and dataset for the graph to be drawn
let dataset = [];
let width = 1200;
let height = 600;

// fetching the data from data.json file and parsing it through data.json()
fetch('./data.json')
	.then(data => data.json())
	.then(data => {
		// assigning the data to dataset array
		dataset = data.data;

		// creating new instance of bar chart with the specified height, width and imported data
		let myBars = new BarDisplay(height, width, dataset);

		// creating new instance of line chart with the specified height, width and imported data
		let myLine = new LineDisplay(height, width, dataset);
	});

// creating a new instance of legend
let mylegend = new Legend();