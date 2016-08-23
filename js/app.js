/* global THREE */

var initialize = require('./initializer.js').initialize;

var scene = initialize();

function createSphere () {
  var geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  var material = new THREE.MeshPhongMaterial({
    color: '#55BB55',
    shading: THREE.FlatShading
  });
  var mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

function createLight() {
  return new THREE.AmbientLight( 0xCCCCCC, 0.5 );
}

function createDirectionalLight() {
  var directionalLight = new THREE.DirectionalLight( 0x999999, 0.5 );
  directionalLight.position.set( 10, 1, 10 );
  return directionalLight;
}

function rotatePlanet() {
  planet.rotation.y -= 0.01;
}

var loader = new THREE.JSONLoader();

var spaceShip = null;
var planet = null;
var modelPath = 'model/spaceship.json';

loader.load(modelPath, function (geometry) {
  var material = new THREE.MeshLambertMaterial({
    color: '#ed8989',
    shading: THREE.FlatShading,
    colorAmbient: [0.480000026226044, 0.480000026226044, 0.480000026226044],
    colorDiffuse: [0.480000026226044, 0.480000026226044, 0.480000026226044],
    colorSpecular: [0.8999999761581421, 0.8999999761581421, 0.8999999761581421]
  });

  spaceShip = new THREE.Mesh(
    geometry,
    material
  );

  spaceShip.scale.x = 0.1;
  spaceShip.scale.y = 0.1;
  spaceShip.scale.z = 0.1;

  spaceShip.position.z = 1;

  planet = createSphere();
  planet.add(spaceShip);
  scene.add(planet);
});

document.addEventListener("keydown", function( event ) {
  if ( event.keyCode === 65 ) {
    spaceShip.lookAt( new THREE.Vector3(0,0,0) );
    spaceShip.rotation.y += Math.PI;

    var matrix = new THREE.Matrix4();
    matrix.extractRotation( spaceShip.matrix );

    var direction = new THREE.Vector3( 0, 0, 1 );
    matrix.multiplyVector3( direction );

    spaceShip.position.add( direction );
  }
});

window.setInterval(rotatePlanet, 20);

scene.add(createLight());
scene.add(createDirectionalLight());
