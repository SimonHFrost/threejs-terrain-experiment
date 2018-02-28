const THREE = require('three')

const initialize = require('./initializer.js').initialize
const createAmbientLight = require('./object-creator.js').createAmbientLight
const createDirectionalLight = require('./object-creator.js').createDirectionalLight
const createCube = require('./object-creator.js').createCube

const output = initialize()
const scene = output.scene

// scene.add(createCube())
scene.add(createAmbientLight())
scene.add(createDirectionalLight())




const geometry = new THREE.Geometry();

geometry.vertices.push(
	new THREE.Vector3( -10,  10, 0 ),
	new THREE.Vector3( -10, -10, 0 ),
	new THREE.Vector3(  10, -10, 0 )
);

geometry.faces.push( new THREE.Face3( 0, 1, 2 ), new THREE.Face3( 2, 1, 0 ) );
geometry.computeBoundingSphere();

const material = new THREE.MeshLambertMaterial({
  color: '#ed8989',
  flatShading: true
})

const shape = new THREE.Mesh(
  geometry,
  material
)

scene.add(shape)
