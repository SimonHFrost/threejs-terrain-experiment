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

module.exports = {
  createCube: createCube,
  createLight: createLight,
  createDirectionalLight: createDirectionalLight
}
