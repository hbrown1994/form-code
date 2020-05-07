let xs = []
let ys = []
let dxs = []
let dys = []
let d = 10
let total = 20
let inc = 0.01
let startPos = 0
let d_index=0
let yMod_main = 0
let noiseMod_main = 0
let yMod_index = 0
let noiseMod_index = 0
let start_mod = 0
let end_mod = 0
let start_mod_index = 0
let end_mod_index = 0
let bg_mod_index = 0
let fr_mod_index = 0

function setup () {
  createCanvas(innerWidth, innerHeight)
  background(0)
  for (var i = 0; i < total; i++) {
    xs.push(random(0, width))
    ys.push(innerHeight/2)
    dxs.push(random(-10,10))
    dys.push(random(-10,10))
  }
}

//make squiggly lines via perlin noise
function make_line(start, end, y, yMod, noiseMod) {
  beginShape()
  let xoff=random(10000)
  for (var i = start*start_mod; i < end*end_mod; i++) {
    stroke(255)
    let n = map(noise(xoff), 0, 1, -noiseMod, noiseMod)
    let s = map(sin(xoff), -1, 1, y-yMod, y+yMod)
    let yPos = s + n
    vertex(i, yPos)
    xoff += inc
  }
  endShape()
  startPos += inc
}

function drawOverLaps (x, y) {
  stroke(random(100,255))
  noFill()
  for (var i = 0; i < total; i++) {
    let distance = dist(x, y, xs[i], ys[i])
    if (distance < d && distance !== 0 ) {
      make_line(x, xs[i], y, yMod_main, noiseMod_main)
    }
  }
}

function draw() {

  d_index += 0.001
  yMod_index += 0.1
  noiseMod_index += 0.125
  start_mod_index += 0.15
  end_mod_index += 0.2
  bg_mod_index += 0.4
  fr_mod_index += 0.3

  //draw() modulations
  background(0, 0, 0, map(sin(fr_mod_index), -1, 1, 1, 1000))
  frameRate(map(sin(fr_mod_index), -1, 1, 1, 24))

  //line modulations
  d =  map(sin(d_index), -1, 1, 1, 100)
  yMod_main = map(sin(yMod_index), -1, 1, 1, 50)
  noiseMod_main = map(sin(noiseMod_index), -1, 1, 1, 100)
  start_mod = map(sin(start_mod_index), -1, 1, 1, 1.2)
  end_mod = map(sin(end_mod_index), -1, 1, 1, 1.4)

  //draw lines
  for (var i = 0; i < total; i++) {
    ys[i] += dys[i]
    if (ys[i]>height || ys[i] < 0) dys[i] = -dys[i]
    drawOverLaps(xs[i], ys[i])
  }
}
