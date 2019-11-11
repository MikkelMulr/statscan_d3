import * as d3 from 'd3';

export default class LineDisplay {
	constructor(height, width, dataset) {
		this.h = height;
		this.w = width;
		this.tempData = dataset;

		//create margins and dimensions
		this.margin = {
			top: 5,
			right: 0,
			bottom: 5,
			left: 15
		};
		this.graphWidth = this.w - this.margin.left - this.margin.right;
		this.graphHeight = this.h - this.margin.top - this.margin.bottom;

		this.buildLineChart();
	}

	buildLineChart() {
		const extent = d3.extent(this.tempData, d => d.temp);

		//linear Scale
		const y = d3
			.scaleLinear()
			.domain(extent)
			.range([this.h, 0]);

		const x = d3
			.scaleBand()
			.domain(this.tempData.map(item => item.year))
			.range([0, this.w]);

		const yAxis = d3
			.axisRight(y)
			.ticks(20)
			.tickFormat(d => d + '\xB0 C');

		let svg = d3
			.select('#lineSpace')
			.attr('width', this.w)
			.attr('height', this.h);

		//grouping
		const graph = svg
			.append('g')
			.attr('transform', `translate(${this.margin.left},0)`);

		let defs = svg.append('defs');

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

		// THE AXIS

		let lineFun = d3
			.line()
			.x(d => x(d.year))
			.y(d => y(d.temp) - (d.temp <= 0 ? this.margin.bottom : -this.margin.bottom))
			// .curve(d3.curveLinear);
			.curve(d3.curveCatmullRom);


		const yAxisGroup = graph
			.append('g')
			.attr("transform", "translate( " + this.graphWidth + ", 0 )");

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

		// THE PATH / LINE GRAPH

		let viz = graph
			.append('path')
			.attr('id', 'tempLine')
			.attr('d', lineFun(this.tempData))
			// .attr('stroke', 'url(#gradient)')
			.attr('stroke', 'yellow')
			.attr('stroke-width', 5)
			.attr('fill', 'none')
			.attr('stroke-linecap', 'round')
			.attr('stroke-linejoin', 'round');
	}
}