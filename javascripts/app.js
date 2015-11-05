/* global THREE */
/* global initialize */

var scene = initialize()

function createSphere () {
  var geometry = new THREE.SphereGeometry(0.5, 0.5, 0.5)
  var material = new THREE.MeshPhongMaterial({
    color: '#55BB55'
  })
  var mesh = new THREE.Mesh(geometry, material)
  return mesh
}

function createLight() {
  return new THREE.AmbientLight( 0x999999, 0.5 );
}

function createDirectionalLight() {
  var directionalLight = new THREE.DirectionalLight( 0x999999, 0.5 );
  directionalLight.position.set( 10, 1, 10 );
  return directionalLight
}

function rotatePlanet() {
  planet.rotation.y += 0.01
}

window.setInterval(rotatePlanet, 20)

var planet = createSphere()
scene.add(planet)
scene.add(createLight())
scene.add(createDirectionalLight())
