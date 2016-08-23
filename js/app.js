/* global THREE */

var initialize = require('./initializer.js').initialize;

var scene = initialize();

function createCube () {
  var geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  var material = new THREE.MeshPhongMaterial({
    color: '#ed8989',
    shading: THREE.FlatShading
  });
  var mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

function createLight() {
  return new THREE.AmbientLight( 0xEEEEEE, 0.75 );
}

function createDirectionalLight() {
  var directionalLight = new THREE.DirectionalLight( 0x999999, 0.5 );
  directionalLight.position.set( 10, 1, 10 );
  return directionalLight;
}

function rotatePlanet() {
  cube.rotation.y -= 0.01;
}

var loader = new THREE.JSONLoader();

var spaceShip = null;
var cube = null;
var modelPath = 'model/spaceship.json';

loader.load(modelPath, function (geometry) {
  var material = new THREE.MeshLambertMaterial({
    color: '#ed8989',
    shading: THREE.FlatShading
  });

  spaceShip = new THREE.Mesh(
    geometry,
    material
  );

  spaceShip.scale.x = 0.1;
  spaceShip.scale.y = 0.1;
  spaceShip.scale.z = 0.1;

  spaceShip.position.z = 1;

  cube = createCube();
  cube.add(spaceShip);
  scene.add(cube);
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
