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
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
      1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
      1, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
      1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 1,
      1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
      1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
      1, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
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
