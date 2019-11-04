import * as d3 from 'd3';

export default class LineDisplay {
	constructor() {
		this.h = 700;
		this.w = 1230;
		this.tempData = [];

		this.lineFun = d3.line()
			.x(d => (d.year - 1969.5) * 30)
			.y(d => this.h / 1.75 - d.temp * 70)
			.curve(d3.curveNatural);

		this.buildLineChart();
	}
	buildLineChart() {

		fetch("./data.json")
			.then(data => data.json())
			.then(data => {
				// console.log(data.data);
				this.tempData = data.data;
				console.log(this.tempData);


				let svg = d3.select("#lineSpace")
					.attr("width", this.w)
					.attr("height", this.h);

				let defs = svg.append("defs");

				let gradient = defs.append("linearGradient")
					.attr("id", "gradient")
					.attr("x1", "0%")
					.attr("y1", "100%")
					.attr("x2", "0%")
					.attr("y2", "0%")

				let stop1 = gradient.append("stop")
					.attr("offset", "0%")
					.attr("stop-color", "#004aba")

				let stop2 = gradient.append("stop")
					.attr("offset", "35%")
					.attr("stop-color", "#ddeef4")

				let stop3 = gradient.append("stop")
					.attr("offset", "100%")
					.attr("stop-color", "#fe3500")

				let viz = svg.append("path")
					.attr("d", this.lineFun(this.tempData))
					.attr("stroke", "url(#gradient)")
					.attr("stroke-width", 7)
					.attr("fill", "none")
					// .attr("fill", "url(#gradient)")
					.attr("stroke-linecap", "round")

				let zero = svg.append("polyline")
					.attr("points", `0,${this.h/1.7} ${this.w},${this.h/1.7}`)
					.attr("stroke", "#383838")
					.attr("stroke-width", "2")
					.attr("stroke-linecap", "round")
					.attr("stroke-dasharray", "5")

				let tmepLabels = svg.append("g");

				let labels = tmepLabels.selectAll("text")
					.data(this.tempData)
					.enter()
					.append("text")
					.text(d => d.temp)
					.attr("class", "temp")
					.attr("x", d => (d.year - 1970) * 30)
					// .attr("x", 0)
					.attr("y", d => this.h / 1.7 - d.temp * 65)
					.attr("font-size", "12px")
					.attr("font-family", "sans-serif")
					.attr("fill", "#666")
					.attr("text-anchor", "start")
					.attr("dy", "0.35em")

				let yearLabels = svg.append("g");

				let years = yearLabels.selectAll("text")
					.data(this.tempData)
					.enter()
					.append("text")
					.text(d => d.year)
					.attr("class", "year")
					.attr("x", d => (d.year - 1970) * 30)
					// .attr("x", 0)
					.attr("y", this.h + 10)
					.attr("font-size", "12px")
					.attr("font-family", "sans-serif")
					.attr("fill", "#666")
					.attr("text-anchor", "start")
					.attr("dy", "0.35em")
					.attr("font-weight", "bold")
			});
	}
}