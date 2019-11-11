import * as d3 from 'd3';

export default class Legend {
	// ES6 Class
	constructor() {
		// defining the height width for the legend
		this.width = 200;
		this.height = 200;

		// defining the text and box colors for the legend to be displayed
		this.legendTextColor = 'White';
		this.tempTextColor = 'yellow';
		this.precipTextColor = 'salmon';
		this.tempRectColor = 'yellow';
		this.precipRectColor = 'salmon';
		this.fontSize = '17px';

		// function to build the legends
		this.buildLegend();
	}

	buildLegend() {
		// adding the svg with specified height and width
		const svg = d3
			.select('#legend')
			.attr('width', this.width)
			.attr('height', this.height);

		// adding legend text
		svg
			.append('text')
			.attr('x', 30)
			.attr('y', 25)
			.attr('fill', this.legendTextColor)
			.text('Legend');

		// adding text and rectangle for the temperature for the
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
			.text('Temperature')
			.attr('font-size', this.fontSize);

		// adding text and rectangle for the precipitation graph
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
			.text('Precipitation')
			.attr('font-size', this.fontSize);
	}
}
