const THREE = require('three')

function createAmbientLight () {
  return new THREE.AmbientLight(0xEEEEEE, 0.75)
}

function createDirectionalLight () {
  const directionalLight = new THREE.DirectionalLight(0x999999, 0.5)
  directionalLight.position.set(10, 1, 10)
  return directionalLight
}

function createSpaceship (geometry) {
  const material = new THREE.MeshLambertMaterial({
    color: '#ed8989',
    flatShading: true
  })

  const spaceship = new THREE.Mesh(
    geometry,
    material
  )

  spaceship.scale.x = 0.1
  spaceship.scale.y = 0.1
  spaceship.scale.z = 0.1

  return spaceship
}

module.exports = {
  createAmbientLight,
  createDirectionalLight,
  createSpaceship
}
