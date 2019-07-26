   /* 
  x2 = x0+(x-x0)*cos(theta)+(y-y0)*sin(theta)
  y2 = y0-(x-x0)*sin(theta)+(y-y0)*cos(theta)
  (x0,y0) is the center around which you are rotating
  */
  //根据旋转角度求   
  function CalcCoord(centerX, centerY, rw, rh, radians) {
    if (!this.rotate) {
      var x1 = 0,
        x2 = rw,
        x3 = rw,
        x4 = 0,
        y1 = 0,
        y2 = rh,
        y3 = -rh,
        y4 = -rh;
    } else {
      var x1 = -rw / 2,
        x2 = rw / 2,
        x3 = rw / 2,
        x4 = -rw / 2,
        y1 = rh / 2,
        y2 = rh / 2,
        y3 = -rh / 2,
        y4 = -rh / 2;
    }
    var x11 = x1 * Math.cos(radians) + y1 * Math.sin(radians),
      y11 = -x1 * Math.sin(radians) + y1 * Math.cos(radians),
      x21 = x2 * Math.cos(radians) + y2 * Math.sin(radians),
      y21 = -x2 * Math.sin(radians) + y2 * Math.cos(radians),
      x31 = x3 * Math.cos(radians) + y3 * Math.sin(radians),
      y31 = -x3 * Math.sin(radians) + y3 * Math.cos(radians),
      x41 = x4 * Math.cos(radians) + y4 * Math.sin(radians),
      y41 = -x4 * Math.sin(radians) + y4 * Math.cos(radians);
    return [{
      x: Math.round(x11 + centerX),
      y: Math.round(y11 + centerY)
    }, {
      x: Math.round(x21 + centerX),
      y: Math.round(y21 + centerY)
    }, {
      x: Math.round(x31 + centerX),
      y: Math.round(y31 + centerY)
    }, {
      x: Math.round(x41 + centerX),
      y: Math.round(y41 + centerY)
    }]
  }