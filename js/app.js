const THREE = require('three')

const initialize = require('./initializer.js').initialize
const createAmbientLight = require('./object-creator.js').createAmbientLight
const createDirectionalLight = require('./object-creator.js').createDirectionalLight
const createSpaceship = require('./object-creator.js').createSpaceship
const createCube = require('./object-creator.js').createCube

const scene = initialize()

const loader = new THREE.JSONLoader()

const LOAD_MODEL = true

if (LOAD_MODEL) {
  let spaceship = null
  const modelPath = 'model/spaceship.json'

  function rotateSpaceship () {
    spaceship.rotation.y -= 0.01
  }

  loader.load(modelPath, geometry => {
    spaceship = createSpaceship(geometry)
    scene.add(spaceship)
  })

  window.setInterval(rotateSpaceship, 20)
} else {
  scene.add(createCube())
}

scene.add(createAmbientLight())
scene.add(createDirectionalLight())
