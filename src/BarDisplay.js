// JavaScript Document
import * as d3 from 'd3';

export default class BarDisplay {
	// ES6 class
	constructor(height, width, dataset) {
		// a function that gets called automatically
		this.w = width;
		this.h = height;
		this.padding = 0.2;
		//create margins and dimensions
		this.margin = {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0
		};
		// size params of the graphs
		this.graphWidth = this.w - this.margin.left - this.margin.right;
		this.graphHeight = this.h - this.margin.top - this.margin.bottom;
		this.dataset = dataset;
		console.log(dataset);

		// Calling the primary function to build the chart
		this.buildChart();
	}

	// primary function to build the chart
	buildChart() {
		// select element to to add chart to and set the height and width 
		const svg = d3
			.select('#barSpace')
			.attr('width', this.w)
			.attr('height', this.h);

		//grouping
		const graph = svg
			.append('g')
			.attr('width', this.graphWidth)
			.attr('height', this.graphHeight)
			.attr('transform', `translate(${this.margin.left},${this.margin.top})`);

		// Define x Axis group
		const xAxisGroup = graph
			.append('g')
			.attr('transform', `translate(0,${this.graphHeight})`);
		// Define y Axis group
		const yAxisGroup = graph.append('g');

		const chartData = this.dataset;
		const extent = d3.extent(chartData, d => d.precip);

		//linear Scale
		// define y data/ range
		const y = d3
			.scaleLinear()
			.domain(extent)
			.range([this.graphHeight, 0]);

		// define x data/ range
		const x = d3
			.scaleBand()
			.domain(chartData.map(item => item.year))
			.range([0, this.graphWidth])
			.paddingInner(this.padding)
			.paddingOuter(this.padding);

		//join the data to rects
		const rects = graph.selectAll('rect').data(chartData);


		//append the enter selection to the DOM
		rects
			.enter()
			.append('rect')
			.attr('width', x.bandwidth)
			.attr('height', d => Math.abs(y(0) - y(d.precip)))
			.attr('fill', 'salmon')
			.attr('stroke-width', 2)
			.attr('x', d => x(d.year))
			.attr('y', d => (d.precip >= 0 ? y(d.precip) : y(0)));

		//create and call the axes
		const xAxis = d3.axisBottom(x);
		const yAxis = d3
			.axisLeft(y)
			.ticks(20)
			.tickFormat(d => d + '%');

		// calling the x Axis and setting its display params
		xAxisGroup.call(xAxis);
		xAxisGroup
			.selectAll('text')
			.attr('transform', 'rotate(-40)')
			.attr('text-anchor', 'end')
			.attr('fill', 'orange')
			.attr('font-size', '14px');

		xAxisGroup
			.select('path')
			.attr('stroke', 'white');

		xAxisGroup
			.selectAll('line')
			.attr('stroke', 'white');

		// Calling the y Axis and setting its display params
		yAxisGroup.call(yAxis);
		yAxisGroup
			.selectAll('text')
			.attr('fill', 'white')
			.attr('font-size', '16px');

		yAxisGroup
			.select('path')
			.attr('stroke', 'white');

		yAxisGroup
			.selectAll('line')
			.attr('stroke', 'white');
	}
}