// JavaScript Document

import * as d3 from 'd3';

export default class BarDisplay {
	// ES6 class
	constructor() {
		// a function that gets called automatically
		this.width = 1200;
		this.height = 900;
		this.padding = 0.2;
		//create margins and dimensions
		this.margin = { top: 20, right: 20, bottom: 100, left: 100 };
		this.graphWidth = 1200 - this.margin.left - this.margin.right;
		this.graphHeight = 900 - this.margin.top - this.margin.bottom;
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

		d3.json('data.json').then(data => {
			const extent = d3.extent(data.data, d => d.precip);

			//linear Scale
			const y = d3
				.scaleLinear()
				.domain(extent)
				.range([this.graphHeight, 0]);

			const x = d3
				.scaleBand()
				.domain(data.data.map(item => item.year))
				.range([0, 1600])
				.range([0, this.graphWidth])
				.paddingInner(this.padding)
				.paddingOuter(this.padding);
			//join the data to rects
			const rects = graph.selectAll('rect').data(data.data);

			//update any existing
			rects
				.attr('width', x.bandwidth)
				// .attr('height', d => graphHeight - y(d.precip))
				.attr('height', d => Math.abs(y(0) - y(d.precip)))
				.attr('fill', 'orange')
				.attr('x', d => x(d.year))
				// .attr('y', d => y(d.precip));
				.attr('y', d => (d.precip >= 0 ? y(d.precip) : y(0)));

			//append the enter selection to the DOM
			rects
				.enter()
				.append('rect')
				.attr('width', x.bandwidth)
				// .attr('height', d => graphHeight - y(d.precip))
				.attr('height', d => Math.abs(y(0) - y(d.precip)))
				.attr('fill', 'orange')
				.attr('x', d => x(d.year))
				// .attr('y', d => y(d.precip));
				.attr('y', d => (d.precip >= 0 ? y(d.precip) : y(0)));

			//create and call the axes
			const xAxis = d3.axisBottom(x);
			const yAxis = d3

				.axisLeft(y)
				.ticks(20)
				.tickFormat(d => d + ' precip');

			xAxisGroup.call(xAxis);
			yAxisGroup.call(yAxis);

			xAxisGroup
				.selectAll('text')
				.attr('transform', 'rotate(-40)')
				.attr('text-anchor', 'end')
				.attr('fill', 'orange');
		});
	}
}
