const { start } = require('repl')
const util = require('util')

class Point {
  r
  c
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
}

const findBoxSize = ({ startPoint , endPoint }) => {
  return (Math.abs(startPoint.c - endPoint.c) + 1) * (Math.abs(startPoint.r - endPoint.r) + 1)
}

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

  

  
  // if (isBox({matrix, startPoint, endPoint: nextRight})) {
  //   let size = findBoxSize({ startPoint, endPoint: nextRight })
  //   if (size > maxSize) {
  //     maxSize = size
  //   }
  // }
  // let nextBottom = iterator.nextBottom()
  // if (isBox({matrix, startPoint, endPoint: nextBottom})) {
  //   let size = findBoxSize({ startPoint, endPoint: nextBottom })
  //   if (size > maxSize) {
  //     maxSize = size
  //   }
  // }

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
  // let box = [
  //   [0,1,1,0],
  //   [0,1,1,0],
  //   [0,0,0,0],
  // ]
  
  let box = req.body.box
  for (let i = 0; i < box.length; i++) {
    const row = box[i]
    for (let j = 0; j < row.length; j++) {
      const column = row[j]
      let startPoint = new Point(i, j)
      let valueAtPoint = startPoint.valueAtPoint(box)
      if (valueAtPoint === 1) {
        // if ((i > 1 && Point.valueAtPoint({ r: i-1, c: j, matrix: box}) !== 1) || (j > 1 && Point.valueAtPoint({ r: i, c: j-1, matrix: box}) !== 1)) {
        //   continue
        // }
        const { size, point } = scanPoint({ startPoint, matrix: box })
        return res.send({size, point})
      }
    }
  }
  return res.send("No result")

}
module.exports = {
  calculateBox
}
