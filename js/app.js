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

geometry.faces.push(
   new THREE.Face3( 0, 10, 1 ),
   new THREE.Face3( 1, 10, 11),
   new THREE.Face3( 1, 11, 2),
   new THREE.Face3( 2, 11, 12)
)

const material = new THREE.MeshLambertMaterial({
  color: '#ed8989',
  flatShading: true
})

const shape = new THREE.Mesh(
  geometry,
  material
)

scene.add(shape)
