/**
 * Authors: Suleman, Usman, Michael
 * Description: Two charts (line and bar) recieving data from an external set of data,
 * one display the precipitation and the other temperature over the span of 40 years.
 * The region and the season for the data can be selected using the dropdowns.
 * 
 * 
 */

// importing classes for graph and the legend
import BarDisplay from './BarDisplay';
import LineDisplay from './LineDisplay';
import Legend from './legend';

// variables to store the height, width, and dataset for the graph to be drawn
let climateData = [];
let graphData = [];
let width = 1200;
let height = 600;
let myBars;
let myLine;
let myLegend;
let svgs = document.querySelectorAll("svg");

// variable to store dropdown data
let regionList = [];
let seasonList = [];
let regionOptions = "";
let seasonOptions = "";

let regionSelector = document.querySelector("#regionSelector");
let seasonSelector = document.querySelector("#seasonSelector");

let selectedRegion = 0;
let selectedSeason = 0;



// fetching the data from data.json file and parsing it through data.json()
fetch('./data.json')
	.then(data => data.json())
	.then(data => {
		// assigning the data to dataset array
		climateData = data.climateData;
		// dataset = data.climateData.regions[1].seasons[0].seasonData;
		// console.log(climateData);

		// resetting the indexes for the dropdowns
		seasonSelector.selectedIndex = -1;
		regionSelector.selectedIndex = -1;

		/* CODE FOR THE DROPDOWNS */

		// fetching region data and populating region dropdown
		regionList = climateData.regions;
		regionList.forEach(region => {
			regionOptions += `<option>${region.regionName}</option>`;
		});
		regionSelector.innerHTML = regionOptions;

		// fetching season data and populating season dropdown
		selectedRegion = regionSelector.selectedIndex;
		seasonList = regionList[selectedRegion].seasons;
		seasonOptions = "";
		seasonList.forEach(season => {
			seasonOptions += `<option>${season.seasonName}</option>`;
		});
		seasonSelector.innerHTML = seasonOptions;
		selectedSeason = seasonSelector.selectedIndex;

		drawGraphs();

		// event listener to change the season dropdown
		regionSelector.addEventListener("change", () => {
			selectedRegion = regionSelector.selectedIndex;
			seasonList = regionList[selectedRegion].seasons;
			seasonOptions = "";
			seasonList.forEach(season => {
				seasonOptions += `<option>${season.seasonName}</option>`;
			});
			seasonSelector.innerHTML = seasonOptions;
			seasonSelector.selectedIndex = 0;
			selectedSeason = seasonSelector.selectedIndex;
			drawGraphs();
		});

		// resetting season index to set it up be fired when an option is selected
		// necessary cuz if there's only one season fetched, then selected index will be 0 everytime and graph won't changed
		seasonSelector.addEventListener("focus", () => {
			seasonSelector.selectedIndex = -1;
		});

		// resetting the svgs and drawing the graph again with the new data
		seasonSelector.addEventListener("change", () => {
			selectedSeason = seasonSelector.selectedIndex;
			drawGraphs();
		});
		/* END --- CODE FOR THE DROPDOWNS */

		// function to clear the svg and draw the graph
		function drawGraphs() {
			svgs.forEach(svg => {
				svg.innerHTML = "";
			});

			graphData = seasonList[selectedSeason].seasonData;

			// creating new instance of bar chart with the specified height, width and imported data
			myBars = new BarDisplay(height, width, graphData);

			// creating new instance of line chart with the specified height, width and imported data
			myLine = new LineDisplay(height, width, graphData);
			
			// adding legend to the graph
			myLegend = new Legend();
		}
	});