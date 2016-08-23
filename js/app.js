/* global THREE */

var initialize = require('./initializer.js').initialize;
var createCube = require('./object-creator.js').createCube;
var createLight = require('./object-creator.js').createLight;
var createDirectionalLight = require('./object-creator.js').createDirectionalLight;

var scene = initialize();

var loader = new THREE.JSONLoader();

var spaceShip = null;
var cube = null;
var modelPath = 'model/spaceship.json';

function rotatePlanet() {
  cube.rotation.y -= 0.01;
}

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
