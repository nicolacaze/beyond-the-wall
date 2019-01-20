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
      1, 3, 4, 2, 2, 3, 3, 3, 2, 3, 3, 3, 3, 2, 3, 1,
      1, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 2, 3, 2, 3, 1,
      1, 3, 2, 2, 3, 5, 5, 3, 3, 2, 3, 3, 4, 3, 3, 1,
      1, 3, 2, 3, 3, 3, 3, 3, 3, 2, 3, 2, 3, 3, 3, 1,
      1, 3, 3, 3, 3, 2, 3, 2, 3, 2, 3, 3, 2, 2, 3, 1,
      1, 3, 3, 2, 3, 2, 3, 3, 4, 3, 3, 3, 5, 5, 3, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ],
  };
  this._getTile = function(col, row) {
    return this.map.tiles[row * this.map.cols + col]
  }
}

Map.prototype.drawMap = function () {
  for (var c = 0; c < this.map.cols; c++) {
    for (var r = 0; r < this.map.rows; r++) {
      var tile = this._getTile(c, r);
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
