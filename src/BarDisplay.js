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
		this.graphWidth = this.w - this.margin.left - this.margin.right;
		this.graphHeight = this.h - this.margin.top - this.margin.bottom;
		this.dataset = dataset;
		console.log(dataset);

		this.buildChart();
	}

	buildChart() {
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

		const xAxisGroup = graph
			.append('g')
			.attr('transform', `translate(0,${this.graphHeight})`);
		const yAxisGroup = graph.append('g');

		// d3.json('data.json').then(data => {
		// this.dataset.then(data => {
		console.log(this.dataset);
		const chartData = this.dataset;
		const extent = d3.extent(chartData, d => d.precip);
		// const extent = [-41, 61];

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

		const stop3 = gradient
			.append('stop')
			.attr('offset', '100%')

			.attr('stop-color', '#0f0');

		//append the enter selection to the DOM
		rects
			.enter()
			.append('rect')
			.attr('width', x.bandwidth)
			.attr('height', d => Math.abs(y(0) - y(d.precip)))
			// .attr('fill', 'url(#gradientBar)')
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
		// .attr('fill', 'white');

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
		// });
	}
}