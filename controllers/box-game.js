const { start } = require('repl')
const util = require('util')

class Point {

  /**
   * 
   * @param {number} x 
   * @param {number} y 
   */
  constructor (r, c) {
    if (isNaN(r) || isNaN(c)) throw new Error('Not valid input')
    this.r = Math.floor(r)
    this.c = Math.floor(c)
  }
  r
  c
  r() {
    return this.r
  }
  c() {
    return this.c
  }
  static valueAtPoint({r, c, matrix}) {
    if (!matrix[r]) {
      return undefined
    }
    return matrix[r][c]
  }
  valueAtPoint(matrix) {
    return Point.valueAtPoint({
      r: this.r,
      c: this.c,
      matrix
    })
  }
  
  clone() {
    return new Point(this.r, this.c)
  }
  nextBottom() {
    return new Point(this.r + 1, this.c)
  }
  nextUp() {
    return new Point(this.r - 1, this.c)
  }
  nextRight() {
    return new Point(this.r, this.c + 1 )
  }
  nextLeft() {
    return new Point(this.r, this.c - 1 )
  }
  nextDiag() {
    return new Point(this.r + 1, this.c + 1 )
  }
  props() {
    return {
      r: this.r, 
      c: this.c
    }
  }
}

const findBoxSize = ({ startPoint , endPoint }) => {
  return (Math.abs(startPoint.c - endPoint.c) + 1) * (Math.abs(startPoint.r - endPoint.r) + 1)
}

/**
 * @description I solved it with recursion, and created my own logic to go depth first approach and find the maxSize a rectangle can offer.
 * Although I can improve some function like (isBox) with dynamic programming where I store already what i have calculated and calculate from ahead, instead of doing it all over again,
 * However because I was already late in submission I did not improve that bit.
 * I could also have done it with bruit force which would take n^2(n) calculation however it would mess it up in performance.
 * Recursion was the only way I could think of doing it since it was a depth crawling. I hope you like code and apologize for not making a frontend.
 * @param {Object} param0
 * @param {Point} param0.endPoint
 * @param {Point} param0.startPoint
 * @param {number[][]} param0.matrix
 * @param {number} param0.maxSize 
 * @returns 
 */
function scanPoint({ startPoint, endPoint, matrix, maxSize = 1}) {
  
  let maxPoint, maxPointSize
  endPoint = endPoint ?? startPoint.clone()
  if (isBox(matrix, startPoint, endPoint)) {
    let currSize = findBoxSize({ startPoint, endPoint })
    if (currSize >= maxSize) {
      maxSize = currSize
      if (!maxPointSize || maxPointSize < maxSize) {
        maxPoint = endPoint
        maxPointSize = maxSize
      } 
    }
    
  }
  let iterator = endPoint.clone()
  let nextDiag = iterator.nextDiag()
  if (isBox(matrix, startPoint, nextDiag)) {
    const {size, point} = scanPoint({ startPoint, endPoint: nextDiag, matrix, maxSize: maxPointSize })
    if (size > maxPointSize) {
      maxPoint = point
      maxPointSize = size
    }
  }

  // go right
  let nextRight = iterator.nextRight()
  if (nextRight.valueAtPoint(matrix) === 1) {
    const {size, point} = scanPoint({ startPoint, endPoint: nextRight, matrix, maxSize: maxPointSize })
    if (size > maxPointSize) {
      maxPoint = point
      maxPointSize = size
    }
  }
  let nextBottom = iterator.nextBottom()
  if (nextBottom.valueAtPoint(matrix) === 1) {
    const {size, point} = scanPoint({ startPoint, endPoint: nextBottom, matrix, maxSize: maxPointSize })
    if (size > maxPointSize) {
      maxPoint = point
      maxPointSize = size
    }
  }

  return {
    size: maxPointSize,
    point: maxPoint
  }


}
function isBox (matrix, startPoint, endPoint) {
  for (let i = startPoint.r; i <= endPoint.r; i++) {
    const row = matrix[i]
    if (!row) return false
    for (let j = startPoint.c; j <= endPoint.c; j++) {
      const value = row[j];
      if (value !== 1) {
        return false
      }
    }
  }
  return true
}
const calculateBox = (req, res, next) => {
  
  let box = req.body.box
  let startPoint = null, endPoint = null, maxSize = 0
  for (let i = 0; i < box.length; i++) {
    const row = box[i]
    for (let j = 0; j < row.length; j++) {
      const column = row[j]
      let startPointR = new Point(i, j)
      let valueAtPoint = startPointR.valueAtPoint(box)
      if (valueAtPoint === 1) {
        const { size, point } = scanPoint({ startPoint: startPointR, matrix: box })
        if (size > maxSize) {
          startPoint = startPointR
          endPoint = point
          maxSize = size
        }
      }
    }
  }

  return res.send({
    startPoint: startPoint?.props(),
    endPoint: endPoint?.props(),
    size: maxSize,
  })

}
module.exports = {
  calculateBox
}
