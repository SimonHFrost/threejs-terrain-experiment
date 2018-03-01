const THREE = require('three')

const initialize = require('./initializer.js').initialize
const createAmbientLight = require('./object-creator.js').createAmbientLight
const createDirectionalLight = require('./object-creator.js').createDirectionalLight

const output = initialize()
const scene = output.scene

scene.add(createAmbientLight())
scene.add(createDirectionalLight())

const RANDOM_CONSTANT = 0.5

const geometry = new THREE.Geometry();

const drawTerrain = (size) => {
  for (let i = -(size/2); i < size/2; i++) {
    for (let j = -(size/2); j < (size/2); j++) {
      let x = i - (RANDOM_CONSTANT / 2) + RANDOM_CONSTANT * Math.random()
      let z = j - (RANDOM_CONSTANT / 2) + RANDOM_CONSTANT * Math.random()
      let y = (RANDOM_CONSTANT / 2) + RANDOM_CONSTANT * Math.random()
      geometry.vertices.push(new THREE.Vector3(x, y, z))
    }
  }

  for (let row = 0; row < size - 1; row++) {
    for (let col = 0; col < size - 1; col++) {
      let first = row * size + col
      let second = (row + 1) * size + col
      let third = row * size + col + 1
      let fourth = (row + 1) * size + col + 1
      geometry.faces.push(new THREE.Face3(first, second, third))
      geometry.faces.push(new THREE.Face3(second, fourth, third))
    }
  }

  const material = new THREE.MeshLambertMaterial({
    color: '#00CC00',
    wireframe: true
  })

  return new THREE.Mesh(
    geometry,
    material
  )
}

const mesh = drawTerrain(20)

setInterval(() => {
  mesh.rotation.y += 0.002
}, 20)

scene.add(mesh)
