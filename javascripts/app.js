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

function createShip() {
  var geometry = new THREE.BoxGeometry(0.1, 0.1, 0.3)
  var material = new THREE.MeshPhongMaterial({
    color: 'lightgrey'
  })
  var mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = 1
  mesh.position.z = 1
  return mesh
}

function rotatePlanet() {
  planet.rotation.y += 0.01
}

var loader = new THREE.JSONLoader(); // init the loader util


var modelPath = 'model/spaceship.json'

loader.load(modelPath, function (geometry) {
  var material = new THREE.MeshLambertMaterial({
    map: THREE.ImageUtils.loadTexture('model/spaceship.png'),  // specify and load the texture
    colorAmbient: [0.480000026226044, 0.480000026226044, 0.480000026226044],
    colorDiffuse: [0.480000026226044, 0.480000026226044, 0.480000026226044],
    colorSpecular: [0.8999999761581421, 0.8999999761581421, 0.8999999761581421]
  });

  var mesh = new THREE.Mesh(
    geometry,
    material
  );

  mesh.scale.x = 0.1
  mesh.scale.y = 0.1
  mesh.scale.z = 0.1

  scene.add(mesh);
});

window.setInterval(rotatePlanet, 20)

var planet = createSphere()
scene.add(planet)
scene.add(createShip())
scene.add(createLight())
scene.add(createDirectionalLight())
