var penguinPromise = d3.json("classData.json");


	var drawPlot = function (penguins,screen,xScale,yScale)
	{
		console.log(xScale);
		d3.select("#graph")
		.selectAll("circle")
		.data(penguins)
		.enter()
		.append("circle")
		
			.attr("cx",function (penguin)
			 {
			return xScale(getTest(penguin))
			})
		.attr("cy",function (penguin)
			 {
			return yScale(getGradeshomework(penguin))
			})
		.attr("r",2)
		.on("mouseenter", function(penguins)
		   {
			console.log("hey2")
			var xPos = d3.event.pageX;
			var yPos = d3.event.pageY;
			d3.select("#tooltip")
			.classed("hidden",false)
			.style("top",yPos+"px")
			.style("left",xPos+"px")
			d3.select("img")
			.attr("src","imgs/" + penguins.picture)
			d3.select("")
		})}
			
				  
			
		
	}


var initgraph = function (penguins)
{
	var screen = {width:500, height:500}
	d3.select("#graph")
	.attr("width", screen.width)
	.attr("height", screen.height)
	var xScale = d3.scaleLinear()
					.domain([0,100])
					.range([0,screen.width])
	var yScale = d3.scaleLinear()
					.domain([0,100])
					.range([screen.height,0])
	drawPlot(penguins,screen,xScale,yScale);
		
		
		
	}








var getTest = function(penguin)
	{
		console.log("hello")
		return penguin.final[0].grade
	};

var getGradeshomework = function(penguin)
{
	console.log("hey")
	var getGrade3 = function(homework)
	{
		return homework.grade;
	}
	var getGrades3 = penguin.homework.map(getGrade3)
	return d3.mean(getGrades3)
};




var successFcn = function(penguins)
{
	console.log("penguins",penguins)
	initgraph(penguins)
	
}
var failureFcn = function(error)
{
	console.log("error", error)

}
penguinPromise.then(successFcn, failureFcn)