const THREE = require('three')

const initialize = require('./initializer.js').initialize
const createAmbientLight = require('./object-creator.js').createAmbientLight
const createDirectionalLight = require('./object-creator.js').createDirectionalLight

const output = initialize()
const scene = output.scene

scene.add(createAmbientLight())
scene.add(createDirectionalLight())

const FastSimplexNoise = require('fast-simplex-noise')
const noiseGen = new FastSimplexNoise.default({ frequency: 0.1, max: 5, min: 0, octaves: 8 })

const drawTerrain = (size) => {
  const geometry = new THREE.Geometry();

  // Generate verticies
  for (let i = -(size/2); i < size/2; i++) {
    for (let j = -(size/2); j < (size/2); j++) {
      let x = i
      let z = j
      let y = noiseGen.scaled([i, j])
      geometry.vertices.push(new THREE.Vector3(x, y, z))
    }
  }

  // Generate faces
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

const mesh = drawTerrain(20)
scene.add(mesh)

setInterval(() => {
  mesh.rotation.y += 0.005
}, 25)
