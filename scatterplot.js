var penguinPromise = d3.json("classData.json");

//----------drawingFinalvsHW-------------
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
			var xPos = d3.event.pageX;
			var yPos = d3.event.pageY;
			d3.select("#tooltip")
			.classed("hidden",false)
			.style("top",yPos+"px")
			.style("left",xPos+"px")
			d3.select("img")
			.attr("src","imgs/" + penguins.picture)
		})}
//------------drawHWvsQuiz-------------
var drawPlot2 = function (penguins,screen,xScale,yScale)
	{
		console.log(xScale);
		d3.select("#graph")
		.selectAll("circle")
		.data(penguins)
		.enter()
		.append("circle")
		.attr("cx",function (penguin)
			 {
			return xScale2(getGradeshomework(penguin))
			})
			.attr("cy",function (penguin)
			 {
			return yScale2(getGradesquiz(penguin))
			})
		
		.attr("r",2)
		.on("mouseenter", function(penguins)
		   {
			var xPos = d3.event.pageX;
			var yPos = d3.event.pageY;
			d3.select("#tooltip")
			.classed("hidden",false)
			.style("top",yPos+"px")
			.style("left",xPos+"px")
			d3.select("img")
			.attr("src","imgs/" + penguins.picture)
		})}	
	
//--------buttons----------
		var FinalvsHwButton = function (penguins,screen,xScale,yScale)
		{
			d3.select("#banner")
			.on("click", function()
			   {
				d3.selectAll("circle")
				.remove()
			drawPlot(penguins,screen,xScale,yScale)
				
			})
		}
		
		var HwvsQuizButton = function (penguins,screen,xScale,yScale)
		{
			console.log("hey14")
			d3.select("#banner2")
			.on("click", function()
			   {
				d3.selectAll("circle")
				.remove()
			drawPlot2(penguins,screen,xScale,yScale)
				
			})
		}
			
		
	
//---------scale---------
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
	var xScale2 = d3.scaleLinear()
					.domain([0,100])
					.range([0,screen.width])
	var yScale2 = d3.scaleLinear()
					.domain([0,100])
					.range([screen.height,0])
	drawPlot(penguins,screen,xScale,yScale);
	drawPlot2(penguins,screen,xScale,yScale);
		
		
		
}



//---------gradeFunctions---------
var getTest = function(penguins)
	{
		return penguins.final[0].grade
	};

var getGradeshomework = function(penguins)
{
	var getGrade3 = function(homework)
	{
		return homework.grade;
	}
	var getGrades3 = penguins.homework.map(getGrade3)
	return d3.mean(getGrades3)
};
var getGradesquiz = function(penguins)
{
	var getGrade2 = function(quiz)
	{
		return quiz.grade;
	}
	var getGrades2 = penguins.quizes.map(getGrade2)
	return d3.mean(getGrades2)
};



//--------promise-----------
var successFcn = function(penguins)
{
	console.log("penguins",penguins)
	initgraph(penguins)
	FinalvsHwButton(penguins)
	HwvsQuizButton(penguins)
	
}
var failureFcn = function(error)
{
	console.log("error", error)

}
penguinPromise.then(successFcn, failureFcn)