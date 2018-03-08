const THREE = require('three')

const initialize = require('./initializer.js').initialize
const createAmbientLight = require('./object-creator.js').createAmbientLight
const createDirectionalLight = require('./object-creator.js').createDirectionalLight

const output = initialize()
const scene = output.scene

scene.add(createAmbientLight())
scene.add(createDirectionalLight())

const RANDOM_CONSTANT = 0.5


const drawTerrain = (size) => {
  const geometry = new THREE.Geometry();

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
      geometry.faces.push(new THREE.Face3(third, second, first))
      geometry.faces.push(new THREE.Face3(third, fourth, second))
    }
  }

  const material = new THREE.MeshLambertMaterial({
    color: '#00CC00'
  })

  geometry.computeFaceNormals()

  return new THREE.Mesh(
    geometry,
    material
  )
}

const mesh = drawTerrain(10)
const mesh2 = drawTerrain(20)
mesh2.position.y = -1
const mesh3 = drawTerrain(30)
mesh3.position.y = -2
const mesh4 = drawTerrain(40)
mesh4.position.y = -3
const mesh5 = drawTerrain(50)
mesh5.position.y = -4
const mesh6 = drawTerrain(60)
mesh6.position.y = -5

setInterval(() => {
  mesh.rotation.y += 0.006
  mesh2.rotation.y += 0.005
  mesh3.rotation.y += 0.004
  mesh4.rotation.y += 0.003
  mesh5.rotation.y += 0.002
  mesh6.rotation.y += 0.001
}, 20)

scene.add(mesh)
scene.add(mesh2)
scene.add(mesh3)
scene.add(mesh4)
scene.add(mesh5)
scene.add(mesh6)
