const THREE = require('three')

const initialize = require('./initializer.js').initialize
const createAmbientLight = require('./object-creator.js').createAmbientLight
const createDirectionalLight = require('./object-creator.js').createDirectionalLight

const output = initialize()
const scene = output.scene

scene.add(createAmbientLight())
scene.add(createDirectionalLight())

const geometry = new THREE.Geometry();

for (let i = -5; i < 5; i++) {
  for (let j = -5; j < 5; j++) {
    let x = i - 0.2 + 0.4 * Math.random()
    let y = j - 0.2 + 0.4 * Math.random()
    let z = 0.2 + 0.4 * Math.random()
    geometry.vertices.push(new THREE.Vector3(x, y, z))
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
  wireframe: true
})

const shape = new THREE.Mesh(
  geometry,
  material
)

scene.add(shape)
