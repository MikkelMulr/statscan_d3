// JavaScript Document

import * as d3 from "d3";

export default class BarDisplay {
    // ES6 class
    constructor() {
        // a function that gets called automatically
        this.w = 300;
        this.h = 100;
        this.padding = 2;
        this.dataset = [50, 10, 15, 20, 25];
        this.buildChart();
    }

    buildChart() {
        let svg = d3.select("#barSpace")
            .attr("width", this.w)
            .attr("height", this.h);
        
        svg.selectAll("rect")
            .data(this.dataset)
            .enter()
            .append("rect")
                .attr("x", (d, i) => i * (this.w / this.dataset.length))
                .attr("y", d => this.h - d)
                .attr("width", this.w / this.dataset.length - this.padding)
                .attr("height", d => d)
                .attr("fill", d => `rgba(${d * 10}, 0, 0)`)
    }
}