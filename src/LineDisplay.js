import * as d3 from 'd3';

export default class LineDisplay {
	// ES6 class
	constructor(height, width, dataset) {
		this.h = height;
		this.w = width;
		this.tempData = dataset;

		// create margins and dimensions
		this.margin = {
			top: 5,
			right: 0,
			bottom: 5,
			left: 15
		};

		// defining graphWidth and graphHeight to calculate the height and width with margins accounted
		this.graphWidth = this.w - this.margin.left - this.margin.right;
		this.graphHeight = this.h - this.margin.top - this.margin.bottom;

		// function to build the line chart
		this.buildLineChart();
	}

	buildLineChart() {
		// defining an array with upper and lower limit for the temperature values from the dataset
		const extent = d3.extent(this.tempData, d => d.temp);

		// defining the scale for the x axis and mapping it to the year value from the dataset
		const x = d3
			.scaleBand()
			.domain(this.tempData.map(item => item.year))
			.range([0, this.w]);
		
		// defining the scale for the y axis and setting the domain based on the extent obtained from the temperature values in the dataset
		const y = d3
			.scaleLinear()
			.domain(extent)
			.range([this.h, 0]);

		// defining the svg dimentions
		let svg = d3
			.select('#lineSpace')
			.attr('width', this.w)
			.attr('height', this.h);

		// adding def for defining a gradient to the svg
		let defs = svg.append('defs');

		// gradient definitions
		let gradient = defs
			.append('linearGradient')
			.attr('id', 'gradient')
			.attr('x1', '0%')
			.attr('y1', '100%')
			.attr('x2', '0%')
			.attr('y2', '0%');

		let stop1 = gradient
			.append('stop')
			.attr('offset', '0%')
			.attr('stop-color', '#00f');

		let stop2 = gradient
			.append('stop')
			.attr('offset', '30%')
			.attr('stop-color', '#fff');

		let stop3 = gradient
			.append('stop')
			.attr('offset', '100%')
			.attr('stop-color', '#f00');

		// grouping everyting in a group inside the svg
		const graph = svg
			.append('g')
			.attr('transform', `translate(${this.margin.left},0)`);

		// Adding the axis
		// adding the y axis group to the graph
		const yAxisGroup = graph
			.append('g')
			.attr("transform", "translate( " + this.graphWidth + ", 0 )");
		
		// formatting ticks before adding to the graph
		const yAxis = d3
			.axisRight(y)
			.ticks(20)
			.tickFormat(d => d + '\xB0 C');
		
		yAxisGroup.call(yAxis);

		// adding text to the y axis
		yAxisGroup
			.selectAll('text')
			.attr('fill', 'white')
			.attr('font-size', '16px');

		// drawing the axis line
		yAxisGroup
			.select('path')
			.attr('stroke', 'white');

		// adding and styling the ticks
		yAxisGroup
			.selectAll('line')
			.attr('stroke', 'white');

		// function to define each point for the line graph
		let lineFun = d3
			.line()
			.x(d => x(d.year))
			.y(d => y(d.temp) - (d.temp <= 0 ? this.margin.bottom : -this.margin.bottom))
			.curve(d3.curveCatmullRom);

		// THE PATH / LINE GRAPH

		// drawing and styling the path for the line graph
		// the lineFun is used to calculate the points for the path to be drawn
		let viz = graph
			.append('path')
			.attr('id', 'tempLine')
			.attr('d', lineFun(this.tempData))
			.attr('stroke', 'yellow')
			.attr('stroke-width', 5)
			.attr('fill', 'none')
			.attr('stroke-linecap', 'round')
			.attr('stroke-linejoin', 'round');
	}
}