// JavaScript Document

import * as d3 from 'd3';
// import * as legend from 'd3-svg-legend';

export default class BarDisplay {
	// ES6 class
	constructor(dataset) {
		// a function that gets called automatically
		this.width = 1230;
		this.height = 700;
		this.padding = 0.2;
		//create margins and dimensions
		// this.margin = { top: 20, right: 20, bottom: 100, left: 100 };
		this.margin = { top: 0, right: 0, bottom: 0, left: 0 };
		this.graphWidth = 1230 - this.margin.left - this.margin.right;
		this.graphHeight = 700 - this.margin.top - this.margin.bottom;
		this.dataset = dataset;
		console.log(dataset);

		this.buildChart();
	}

	buildChart() {
		const svg = d3
			.select('#barSpace')
			.attr('width', this.width)
			.attr('height', this.height);

		//grouping
		const graph = svg
			.append('g')
			.attr('width', this.graphWidth)
			.attr('height', this.graphHeight)
			.attr('transform', `translate(${this.margin.left},${this.margin.top})`);

		const xAxisGroup = graph
			.append('g')
			.attr('transform', `translate(0,${this.graphHeight})`);
		const yAxisGroup = graph.append('g');

		//legend setup
		// const legendGroup = svg.append('g');
		// // .attr('transform', 'translate(50,50)');
		// // .attr('transform', `translate(${this.graphWidth + 10}, 10)`);

		// const legend1 = d3.legend
		// 	.legendColor()
		// 	.shape('rect')
		// 	.scale('name');

		// legendGroup.call(legend1);

		// d3.json('data.json').then(data => {
		// this.dataset.then(data => {
		console.log(this.dataset);
		const chartData = this.dataset;
		const extent = d3.extent(chartData, d => d.precip);

		//linear Scale
		const y = d3
			.scaleLinear()
			.domain(extent)
			.range([this.graphHeight, 0]);

		const x = d3
			.scaleBand()
			.domain(chartData.map(item => item.year))
			.range([0, 1600])
			.range([0, this.graphWidth])
			.paddingInner(this.padding)
			.paddingOuter(this.padding);
		//join the data to rects
		const rects = graph.selectAll('rect').data(chartData);

		const defs = svg.append('defs');

		const gradient = defs
			.append('linearGradient')
			.attr('id', 'gradientBar')
			.attr('gradientUnits', 'userSpaceOnUse')
			.attr('x1', '0%')
			.attr('y1', '100%')
			.attr('x2', '0%')
			.attr('y2', '0%');

		const stop1 = gradient
			.append('stop')
			.attr('offset', '0%')
			.attr('stop-color', '#f00');

		// const stop2 = gradient
		// 	.append('stop')
		// 	.attr('offset', '35%')
		// 	// .attr('stop-color', '#86A8E7');
		// 	.attr('stop-color', '#D16BA5');

		const stop3 = gradient
			.append('stop')
			.attr('offset', '100%')

			.attr('stop-color', '#0f0');

		//append the enter selection to the DOM
		rects
			.enter()
			.append('rect')
			.attr('width', x.bandwidth)
			// .attr('height', d => graphHeight - y(d.precip))
			.attr('height', d => Math.abs(y(0) - y(d.precip)))
			// .attr('fill', 'orange')
			.attr('fill', 'url(#gradientBar)')
			.attr('stroke-width', 2)
			// .attr('stroke', 'black')
			.attr('x', d => x(d.year))
			// .attr('y', d => y(d.precip));
			.attr('y', d => (d.precip >= 0 ? y(d.precip) : y(0)));

		//create and call the axes
		const xAxis = d3.axisBottom(x);
		const yAxis = d3

			.axisLeft(y)
			.ticks(20)
			.tickFormat(d => d + ' precip');
		// .attr('fill', 'white');

		xAxisGroup.call(xAxis);
		yAxisGroup.call(yAxis);

		xAxisGroup
			.selectAll('text')
			.attr('transform', 'rotate(-40)')
			.attr('text-anchor', 'end')
			.attr('fill', 'orange');
		// });
	}
}
