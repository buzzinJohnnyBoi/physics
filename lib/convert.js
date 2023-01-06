function radiansToDegrees(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
}

function degreesToRadians(deg)
{
  var pi = Math.PI;
  return deg *pi/180;
}

function pxmi(pixelsmilisecond) {
    return(100/6 * pixelsmilisecond);
}

function clamp(min, max, num) {
  if(num < min) {
    return min;
  }
  if(num > max) {
    return max;
  }
  return num;
}