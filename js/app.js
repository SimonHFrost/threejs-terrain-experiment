const THREE = require('three')

const initialize = require('./initializer.js').initialize
const createAmbientLight = require('./object-creator.js').createAmbientLight
const createDirectionalLight = require('./object-creator.js').createDirectionalLight
const createCube = require('./object-creator.js').createCube

const output = initialize()
const scene = output.scene

scene.add(createAmbientLight())
scene.add(createDirectionalLight())

const geometry = new THREE.Geometry();

for (let i = -5; i < 5; i++) {
  for (let j = -5; j < 5; j++) {
    geometry.vertices.push(new THREE.Vector3(i, j, 0))
  }
}

for (let row = 0; row < 9; row++) {
  for (let col = 0; col < 9; col++) {
    let first = row * 10 + col
    let second = (row + 1) * 10 + col
    let third = row * 10 + col + 1
    let fourth = (row + 1) * 10 + col + 1
    geometry.faces.push(new THREE.Face3(first, second, third))
    geometry.faces.push(new THREE.Face3(second, fourth, third))
  }
}

const material = new THREE.MeshLambertMaterial({
  color: '#ed8989',
  flatShading: true
})

const shape = new THREE.Mesh(
  geometry,
  material
)

scene.add(shape)
