/*
 * Code modified from: https://github.com/mbostock/d3/blob/489eb0cde7e31ee84b48b1ad1f79d699737a9129/examples/donut/donut.html
 */

var w = Math.min(window.innerWidth/2, 100),			// Width of the viz node
    h =  Math.min(window.innerWidth/2, 100),			// Height of the viz node
    r1 = Math.min(w, h) / 2,	// Outer radius of the donut
    r0 = r1 * .6,		// Inner radius of the donut
    n = 4,			// Number of donut segments
    q = 0,
    data0 = [0.5, 0.5, 0.5, 0.5],
    data1 = [0.2, 0.1, 0.5, 0.5],
    //data0 = d3.range(n).map(Math.random),
    //data1 = d3.range(n).map(Math.random),
    data,
    color = d3.scale.category20(),	// Selects the colour of the segments
    arc = d3.svg.arc(),
    donut = d3.layout.pie();

var vis = d3.select("#viz")
  .append("svg:svg")
    .attr("width", w)
    .attr("height", h);

vis.selectAll("g.arc")
    .data(arcs(data0, data1))
  .enter().append("svg:g")
    .attr("class", "arc")
    .attr("transform", "translate(" + r1 + "," + r1 + ")")
  .append("svg:path")
    .attr("fill", function(d, i) { return color(i); })
    .attr("d", arc)
    .on("mouseover", reduceArc)
    .on("mouseout", restoreArc);

// Whenever a key is pressed, we swap between data0 and data1
//window.addEventListener("keypress", swap, false);

function submitForm() {
   var userData = [document.getElementById("nonnativepositive").value,
                   document.getElementById("nonnativemissing").value,
                   document.getElementById("nativemissing").value,
                   document.getElementById("nativepositive").value
                   ];
   console.log(userData);

   d3.selectAll("g.arc > path")
      .data(arcs(data0, userData))
      .each(transitionSplit);

   data0 = userData;
}

// Reduces the width of the donut for the given arc
function reduceArc(d, i) {
   d3.select(this)			// Get the given arc
      .attr("fill", "black")		// Set the colour
      .transition().duration(1000)	// 1 sec transition
         .attrTween("d", tweenArc({
        outerRadius: r1 - 20		// Reduce outer radius by 20px
      }))
}

// Restores the width of the donut for the given arc
function restoreArc(d, i) {
   d3.select(this)			// Get the given arc
      .attr("fill", color(i))		// Restore to its original colour
      .transition().duration(1000)	// 1 sec transition
         .attrTween("d", tweenArc({
        outerRadius: r1			// Restore the outer radius
      }))
}

function arcs(data0, data1) {
  var arcs0 = donut(data0),		// Its current position
      arcs1 = donut(data1),		// Its next position
      i = -1,
      arc;
  while (++i < n) {			// For each segment
    arc = arcs0[i];
    arc.innerRadius = r0;
    arc.outerRadius = r1;
    arc.next = arcs1[i];
  }
  return arcs0;
}

// Transitions from displaying data0 to displaying data1 (or vice versa)
function swap() {
  d3.selectAll("g.arc > path")
      .data(++q & 1 ? arcs(data0, data1) : arcs(data1, data0))
      .each(transitionSplit);
}

// 1. Wedges split into two rings.
function transitionSplit(d, i) {
  d3.select(this)
    .transition().duration(1000)
      .attrTween("d", tweenArc({
        innerRadius: i & 1 ? r0 : (r0 + r1) / 2,
        outerRadius: i & 1 ? (r0 + r1) / 2 : r1
      }))
      .each("end", transitionRotate);
}

// 2. Wedges translate to be centered on their final position.
function transitionRotate(d, i) {
  var a0 = d.next.startAngle + d.next.endAngle,
      a1 = d.startAngle - d.endAngle;
  d3.select(this)
    .transition().duration(1000)
      .attrTween("d", tweenArc({
        startAngle: (a0 + a1) / 2,
        endAngle: (a0 - a1) / 2
      }))
      .each("end", transitionResize);
}

// 3. Wedges then update their values, changing size.
function transitionResize(d, i) {
  d3.select(this)
    .transition().duration(1000)
      .attrTween("d", tweenArc({
        startAngle: d.next.startAngle,
        endAngle: d.next.endAngle
      }))
      .each("end", transitionUnite);
}

// 4. Wedges reunite into a single ring.
function transitionUnite(d, i) {
  d3.select(this)
    .transition().duration(1000)
      .attrTween("d", tweenArc({
        innerRadius: r0,
        outerRadius: r1
      }));
}

function tweenArc(b) {
  return function(a) {
    var i = d3.interpolate(a, b);
    for (var key in b) a[key] = b[key]; // update data
    return function(t) {
      return arc(i(t));
    };
  };
}
