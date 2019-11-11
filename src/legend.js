import * as d3 from 'd3';

export default class Legend {
	constructor() {
		this.width = 200;
		this.height = 200;
		this.legendTextColor = 'White';
		this.tempTextColor = 'yellow';
		this.precipTextColor = 'orange';
		this.tempRectColor = 'yellow';
		this.precipRectColor = 'orange';
		this.buildLegend();
	}
	buildLegend() {
		const svg = d3
			.select('#legend')
			.attr('width', this.width)
			.attr('height', this.height);

		svg
			.append('text')
			.attr('x', 30)
			.attr('y', 25)
			.attr('fill', this.legendTextColor)
			.text('Legend');
		svg
			.append('rect')
			.attr('width', 10)
			.attr('height', 10)
			.attr('fill', this.tempRectColor)
			.attr('x', 30)
			.attr('y', 40);

		svg
			.append('text')
			.attr('x', 45)
			.attr('y', 50)
			.attr('fill', this.tempTextColor)
			.text('Temperature');
		svg
			.append('rect')
			.attr('width', 10)
			.attr('height', 10)
			.attr('fill', this.precipRectColor)
			.attr('x', 30)
			.attr('y', 60);

		svg
			.append('text')
			.attr('x', 45)
			.attr('y', 70)
			.attr('fill', this.precipTextColor)
			.text('Precipitation');
	}
}
