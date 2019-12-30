// @TODO: YOUR CODE HERE!

// Set the dimensions and margins of the graph
var margin = {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40
    },
    svgWidth = 800
    svgHeight = 600
    chartWidth = svgWidth - margin.left - margin.right,
    chartHeight = svgHeight - margin.top - margin.bottom
    circRad = 20
    console.log("Chart height:", chartHeight, "Chart width:", chartWidth)
    console.log("SVG height:", svgHeight, "SVG width:", svgWidth)

// Append SVG object to the scatter element
var svg = d3.select("#scatter").append("svg").attr("width", svgWidth).attr("height", svgHeight)

// Append chart element to the SVG
var chartGroup = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

// Slide the text over to align with chart
// d3.select("#article").attr("transform", `translate(${margin.left}, 0)`);

//Read the data and get ready to do stuff with it
d3.csv("assets/data/data.csv").then(function(data) {
  
    // Check on the data
    console.log(data);
    console.log("Obesity:")
    data.forEach(function(data) {
        console.log(data.obesity)
    })

    // Add X axis (income)
    var xScale = d3.scaleLinear()
        .domain([38000, 75000]) // see same line for y-axis
        .range([0, chartWidth]);
  
    // xScale.nice();

    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(d3.axisBottom(xScale));

    // Add Y axis (obesity)
    var yScale = d3.scaleLinear()
        .domain([21, 36]) // switch to [0, d3.max(data.**columnName**)]
        .range([chartHeight, 0]);
  
    // yScale.nice();

    chartGroup.append("g")
        .call(d3.axisLeft(yScale));

    // Add dots
    chartGroup.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function(data) {return xScale(data.income);})
            .attr("cy", function(data) {return yScale(data.obesity);})
            .attr("r", function(data) { // Do some silly math to reflect variance and margin of error in circle size
                return circRad + (data.incomeMoe * (data.obesityHigh - data.obesityLow) / (circRad ** 2));
            })
            .style("fill", "#69b382")
            .attr("opacity", .7);
            
    chartGroup.append('g')
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
            .attr("text-anchor", "middle")
            .attr("x", function (data) {return xScale(data.income);})
            .attr("y", function (data) {return yScale(data.obesity) + 5;})
            .attr("font_family", "sans-serif")  // Font type
            .attr("font-size", "16px")  // Font size
            .attr("fill", "white")   // Font color
            .text(function(data) {return data.abbr;});
    
    chartGroup.append("text")
                .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
                    .text("Your da");
    
    chartGroup.append("text")
                .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top})`)
                    .text("Your mum");
          
})

// TO DO:
// DONE! Properly center graph inside element (i.e. Move axes into frame)
// DONE! Fix axes' range and domain, and set ticks
// DONE! Plot data
// DONE! Label data points with state abbreviations
// 5. Label graph & axes