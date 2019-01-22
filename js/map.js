'use strict'

function Map(canvas) {
  this.canvas = canvas;
  this.context = canvas.getContext('2d');
  this.atlasImage = new Image();
  this.atlasImage.src = './assets/tiles-atlas.png';
  this.map = {
    cols: 16,
    rows: 9,
    tsize: 64,
    tiles: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
  };
}

Map.prototype.getTile = function(col, row) {
  return this.map.tiles[row * this.map.cols + col]
}
Map.prototype.getCol = function (x) {
  return Math.floor(x / this.tsize);
}
Map.prototype.getRow = function (y) {
  return Math.floor(y / this.tsize);
}
Map.prototype.getX = function (col) {
  return col * this.tsize;
}
Map.prototype.getY = function (row) {
  return row * this.tsize;
}
Map.prototype.isSolidTileAtXY = function (x, y) {
  // Convert x, y position to a tile position on map
  var col = Math.floor(x / this.map.tsize);
  var row = Math.floor(y / this.map.tsize);

  // tiles 1, 2, 4 and 5 are solid -- the rest are walkable
  // loop through all layers and return TRUE if any tile is solid
  return this.map.tiles.reduce(function (res, layer) {
      var tile = this.getTile(col, row);
      var isSolid = tile === 1 
      || tile === 2
      || tile === 4
      || tile === 5;
      return res || isSolid;
  }.bind(this), false);
}

Map.prototype.generateRandomMap = function() {
  // Ensure there is free space at Hero initial position
  this.map.tiles[17] = 3;
  // Create icing border for our map; value 1 is for ice sprite
  this.map.tiles.forEach(function(tile, i, arr){
    if (i < 16) {
      arr[i] = 1;
    }
    if (i % 16 === 0) {
      arr[i] = 1;
      arr[i - 1] = 1;
    }
    if (i >= 128) {
      arr[i] = 1;
    } 
  });

  // Fill the rest of the map randomly with obstacles and free space
  this.map.tiles.forEach(function(tile, i, arr){
    // Ensure first tile of our map is free for our Hero
    arr[17] === 3;
    if (tile === 0) {
      var random = Math.random();
      // With 10% chance put an  tree obstacle
      if(random > 0.95) {
        arr[i] = 2;
      // With 5% chance put a hole obstacle
      } else if (random > 0.85 && random < 0.9) {
        arr[i] = 4;
      } else {
        arr[i] = 3;
      }
    }
  });
}

Map.prototype.drawMap = function () {
  for (var c = 0; c < this.map.cols; c++) {
    for (var r = 0; r < this.map.rows; r++) {
      var tile = this.getTile(c, r);
      if (tile !== 0) { // 0 => empty tile
        this.context.drawImage(
          this.atlasImage, // image
          (tile - 1) * this.map.tsize, // source x
          0, // source y
          this.map.tsize, // source width
          this.map.tsize, // source height
          c * this.map.tsize, // target x
          r * this.map.tsize, // target y
          this.map.tsize, // target width
          this.map.tsize // target height
        );
      }
    }
  }
}
