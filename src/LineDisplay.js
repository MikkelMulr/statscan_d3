import * as d3 from 'd3';

export default class LineDisplay {
	constructor(height, width, dataset) {
		this.h = height;
		this.w = width;
		this.tempData = dataset;

		// this.lineFun = d3
		// 	.line()
		// 	.x(d => (d.year - 1969.5) * this.w / this.tempData.length)
		// 	.y(d => this.h / 1.7 - d.temp * 7)
		// 	// .curve(d3.curveNatural);
		// 	.curve(d3.curveCatmullRom);
		console.log(this.w / this.tempData.length);


		this.buildLineChart();
	}
	buildLineChart() {
		// fetch('./data.json')
		// 	.then(data => data.json())
		// 	.then(data => {
		// console.log(data.data);
		// this.tempData = data.data;
		console.log(this.tempData);

		let svg = d3
			.select('#lineSpace')
			.attr('width', this.w)
			.attr('height', this.h);

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
			.attr('stop-color', '#004aba');

		let stop2 = gradient
			.append('stop')
			.attr('offset', '35%')
			.attr('stop-color', '#ddeef4');

		let stop3 = gradient
			.append('stop')
			.attr('offset', '100%')
			.attr('stop-color', '#fe3500');

		// THE AXIS

		let lineFun = d3
			.line()
			.x(d => (d.year - 1969.5) * this.w / this.tempData.length)
			.y(d => this.h / 1.7 - d.temp * 70)
			.curve(d3.curveLinear);
			// .curve(d3.curveCatmullRom);

		const yAxisGroup = svg
			.append('g')
			.attr("transform", "translate( " + this.w + ", 0 )");

		const extent = d3.extent(this.tempData, d => d.temp);

		//linear Scale
		const y = d3
			.scaleLinear()
			.domain(extent)
			.range([this.h, 0]);

		const yAxis = d3
			.axisRight(y)
			.ticks(20)
			.tickFormat(d => d + '\xB0 C');

		// xAxisGroup.call(xAxis);
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

		let viz = svg
			.append('path')
			.attr('d', lineFun(this.tempData))
			// .attr('stroke', 'url(#gradient)')
			.attr('stroke', 'yellow')
			.attr('stroke-width', 10)
			.attr('fill', 'none')
			.attr('stroke-linecap', 'round')
			.attr('stroke-linejoin', 'round');

		let zero = svg.append("polyline")
			.attr("points", `0,${this.h / 1.678} ${this.w},${this.h / 1.678}`)
			.attr("stroke", "white")
			.attr("stroke-width", "2")
			.attr("stroke-linecap", "round")
			.attr("stroke-dasharray", "5")

		// let tmepLabels = svg.append('g').attr('id', 'tempLabels');

		// let labels = tmepLabels
		// 	.selectAll('text')
		// 	.data(this.tempData)
		// 	.enter()
		// 	.append('text')
		// 	.text(d => d.temp)
		// 	.attr('class', 'temp')
		// 	.attr('x', d => (d.year - 1969.5) * this.w / this.tempData.length)
		// 	// .attr("x", 0)
		// 	.attr('y', d => this.h / 1.44 - d.temp * 60)
		// 	.attr('font-size', '12px')
		// 	.attr('font-family', 'sans-serif')
		// 	.attr('fill', '#fff')
		// 	.attr('text-anchor', 'start')
		// 	.attr('dy', '0.35em');

		// let yearLabels = svg.append("g")
		// 	.attr("id", "yearLabels");

		// let years = yearLabels.selectAll("text")
		// 	.data(this.tempData)
		// 	.enter()
		// 	.append("text")
		// 	.text(d => d.year)
		// 	.attr("class", "year")
		// 	.attr("x", d => (d.year - 1970) * 30)
		// 	// .attr("x", 0)
		// 	.attr("y", this.h / 1.44 + 10)
		// 	.attr("font-size", "12px")
		// 	.attr("font-family", "sans-serif")
		// 	.attr("fill", "#666")
		// 	.attr("text-anchor", "start")
		// 	.attr("dy", "0.35em")
		// 	.attr("font-weight", "bold")

		// });
	}
}