let movieDataUrl =
  " https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";

let movieData;

let canvas = d3.select("#canvas");

let drawTreeMap = () => {
  let hierarchy = d3
    .hierarchy(movieData, (node) => {
      return node["children"];
    })
    .sum((node) => {
      return node["value"];
    })
    .sort((node1, node2) => {
      return node2["value"] - node1["value"];
    });

  let createTreeMap = d3.treemap().size([1000, 600]);
  let movieTiles = hierarchy.leaves();
  console.log(movieTiles);

  createTreeMap(hierarchy);

  let block = canvas.selectAll("g").data(movieTiles).enter().append("g");

  block
    .append("rect")
    .attr("class", "tile")
    .attr("fill", (movie) => {
      let category = movie["data"]["category"];
      if (category === "Action") {
        return "#845EC2";
      } else if (category === "Drama") {
        return "#D65DB1";
      } else if (category === "Biography") {
        return "#FF6F91";
      } else if (category === "Adventure") {
        return "#FF9671";
      } else if (category === "Animation") {
        return "#FFC75F";
      } else if (category === "Comedy") {
        return "#F9F871";
      } else if (category === "Family") {
        return "#00C9A7";
      }
    });
};

d3.json(movieDataUrl).then((data, error) => {
  if (error) {
    console.log(error);
  } else {
    movieData = data;
    console.log(movieData);
    drawTreeMap();
  }
});
