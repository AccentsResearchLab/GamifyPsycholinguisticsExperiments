
// Code based on: http://www.visualizing.org/full-screen/37074

// values will show up as slices in the circles. 
var dataset = [
    {name: "Native", values: {0: 0, 1: 1 }},
    //{name: "Maybe", values: {0: 0, 1: 1 }},
    {name: "Not", values: {0: 0, 1: 1 }}
];

// number of values in the rings, needs to be the same number as the values in the rows
var valencies = [
    {val: 0, name: 'Incorrect'},
    {val: 1, name: 'Correct'}

];

// numbers and colors, needs to be larger than the rows in the dataset
var rings = [
    {ring: 0, color: 'RdGn'}, 
    {ring: 1, color: 'RdGn'}, 
    {ring: 2, color: 'RdGn'}
];

var color = [
    'rgb(49,163,84)', 
    'rgb(222,45,38)'
];
var sizes = {
    small: {inner: 0.6, outer: 0.95, xoffset: 0, x_legoffset: 215, y_legoffset: 286},
    large: {inner: 0.6, outer: 0.85, xoffset: 0, x_legoffset: 645, y_legoffset: 15, gap_factor: 0.85 }
};

var font_size = 15;

////////////////////////////////////////////////////////////////////////////////
// Layout & Page controls //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// various spacing parameters
var chartW      = 300;
var chartH      = 200;
var radius      = chartW / 8;
var background  = '#FEFEFE';
var foreground  = '#fff';

// main svg for the chart
var chart = d3.select('#viz')
  .append('div')
  .append('svg:svg')
    .attr('id', 'chart')
    .attr('width', chartW)
    .attr('height', chartH)
    .attr('fill', background);

/////////////////////////////////////////////////////////////////////////////////
// ring set up and calculation function  ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// Set the ring positions
rings.map(function(d,i) {
    rings[i]['x'] = (i + 1) * radius*1.33 + sizes.small.xoffset;
    rings[i]['y'] = ((i % 2)*1.9 + 1) * radius;
})

function get_proportion(group, valence, dataset){
    total = 0;
    for(i in dataset[group].values){
        total = total+dataset[group].values[i];
    }
    count = dataset[group].values[valence];
    return (count / total);
}

function get_arc_start_position(group, valence, dataset){
    offset = 0;
    valencies.map(function(v2){
        if (v2.val < valence){
            offset += get_proportion(group, v2.val, dataset);
        }
    });
    return offset;
}

function get_arc_end_position(group, valence, dataset){
    return get_arc_start_position(group, valence, dataset) + get_proportion(group, valence, dataset);
}

//////////////////////////////////////////////////////////////////////////////
// animate rings on keypress /////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

window.addEventListener("keypress", change_dataset, false);

function change_dataset(newDataset) {
    // create a random newDataset to change to
    if(!newDataset){
        newDataset = [
            {name: "Native", values: {0: 3, 1: 1 }},
            //{name: "Maybe", values: {0: 2, 1: 1 }},
            {name: "Not", values: {0: 4, 1: 1 }}
        ];
    }
    arcs.transition()
        .duration(1500)			// 1 sec transition
        .attrTween('d', function(d){return arc_tween(d, newDataset)})	// tween from dataset to newDataset
        .each("end", function() { dataset = newDataset});					// set dataset to newDataset
}

///////////////////////////////////////////////////////////////////////////////
// Animation functions ////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function arc_tween(d, newDataset) {
    // calculate the starting point for the old arc
    var arc_start_old = get_arc_start_position(d.theme, d.valence, dataset) * 2 * Math.PI;
    // calculate the starting point for the new arc
    var arc_start_new = get_arc_start_position(d.theme, d.valence, newDataset) * 2 * Math.PI;
    // calculate the ending point for the old arc
    var arc_end_old = get_arc_end_position(d.theme, d.valence, dataset) * 2 * Math.PI;
    // calculate the starting point for the new arc
    var arc_end_new = get_arc_end_position(d.theme, d.valence, newDataset) * 2 * Math.PI;

    var iS = d3.interpolate(arc_start_old , arc_start_new);
    var iE = d3.interpolate(arc_end_old, arc_end_new);

    return function(t) {
        return arc.startAngle(iS(t)).endAngle(iE(t))();
    };
};

function get_formation_translation(ring){
    return 'translate(' + rings[ring].x + ',' + rings[ring].y + ')';
}

/////////////////////////////////////////////////////////////////////////////
/////// This is what happens on page load ///////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

// make an svg:g for each ring
ring_group = chart.selectAll('.ring_group')
    .data(d3.range(dataset.length))// Theoretically should be values of each theme
    .enter().append('svg:g')
    .attr('class', 'ring_group')
    .attr('opacity', 1)
    .attr('transform', function(d) { return get_formation_translation(d)} );
    
// add the title for each ring
ring_labels = ring_group
    .append('svg:text')
    .text(function(d) { return dataset[d].name; })
    .attr('fill', foreground)
    .attr("font-size", font_size)
            
// arc generator
arc = d3.svg.arc()
    .innerRadius(radius*sizes.small.inner)
    .outerRadius(radius*sizes.small.outer)
    .startAngle(function(d) { return get_arc_start_position(d.theme, d.valence, dataset) * 2 * Math.PI; })
    .endAngle(function(d) { return get_arc_end_position(d.theme, d.valence, dataset) * 2 * Math.PI; });

// add an arc for each response
arcs = ring_group.selectAll('.arc')
    .data(function(d){
        return d3.range(valencies.length).map(function(i){
            return {theme: d, valence: i};
        });
    })
    .enter().append('svg:path')
    .attr('d', arc)
    .attr('fill', function(d, i) {
        return color[i]; })
    .attr('fill-opacity', .5)
    .attr('stroke', background)
    .attr('fill-opacity', 1)
    .attr('stroke-width', 2);



function submitForm() {
   var userData = [
        {name: "Native", values: {0: parseFloat(document.getElementById("nativepositive").value), 1: parseFloat(document.getElementById("nativemissing").value) }},
        //{name: "Maybe", values: {0: parseFloat(document.getElementById("nonnativepositive").value), 1: parseFloat(document.getElementById("nonnativemissing").value) }},
        {name: "Not", values: {0: parseFloat(document.getElementById("prenonnativepositive").value), 1: parseFloat(document.getElementById("prenonnativemissing").value) }}
    ];
    //console.log(userData);
    change_dataset(userData);
}

change_dataset();