import * as d3 from 'd3';

export default class LineDisplay {
	constructor(dataset) {
		this.h = 700;
		this.w = 1230;
		this.tempData = dataset;

		this.lineFun = d3
			.line()
			.x((d) => (d.year - 1969.5) * 30)
			.y((d) => this.h / 1.44 - d.temp * 50)
			.curve(d3.curveLinear);

		this.buildLineChart();
	}
	buildLineChart() {
		fetch('./data.json').then((data) => data.json()).then((data) => {
			this.tempData = data.data;
			console.log(this.tempData);

			let svg = d3.select('#lineSpace').attr('width', this.w).attr('height', this.h);

			let defs = svg.append('defs');

			let gradient = defs
				.append('linearGradient')
				.attr('id', 'gradient')
				.attr('x1', '0%')
				.attr('y1', '100%')
				.attr('x2', '0%')
				.attr('y2', '0%');

			let stop1 = gradient.append('stop').attr('offset', '0%').attr('stop-color', 'rgb(31, 138, 238)');

			let stop2 = gradient.append('stop').attr('offset', '100%').attr('stop-color', 'rgb(219, 0, 55)');

			let viz = svg
				.append('path')
				.attr('d', this.lineFun(this.tempData))
				.attr('stroke', 'url(#gradient)')
				.attr('stroke-width', 8)
				.attr('fill', 'none')
				.attr('stroke-linecap', 'round')
				.attr('stroke-linejoin', 'round');

			let tmepLabels = svg.append('g').attr('id', 'tempLabels');
		});
	}
}
