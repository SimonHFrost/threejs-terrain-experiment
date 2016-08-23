/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* global THREE */
	/* global initialize */

	var createRenderer = __webpack_require__(1).createRenderer;
	var createCamera = __webpack_require__(1).createCamera;
	var createRenderLoop = __webpack_require__(1).createRenderLoop;
	var initialize = __webpack_require__(1).initialize;

	var scene = initialize()

	function createSphere () {
	  var geometry = new THREE.CubeGeometry(0.5, 0.5, 0.5)
	  var material = new THREE.MeshPhongMaterial({
	    color: '#55BB55',
	    shading: THREE.FlatShading
	  })
	  var mesh = new THREE.Mesh(geometry, material)
	  return mesh
	}

	function createLight() {
	  return new THREE.AmbientLight( 0xCCCCCC, 0.5 );
	}

	function createDirectionalLight() {
	  var directionalLight = new THREE.DirectionalLight( 0x999999, 0.5 );
	  directionalLight.position.set( 10, 1, 10 );
	  return directionalLight
	}

	function rotatePlanet() {
	  planet.rotation.y -= 0.01
	}

	var loader = new THREE.JSONLoader(); // init the loader util

	var spaceShip
	var planet
	var modelPath = 'model/spaceship.json'

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

	  spaceShip.scale.x = 0.1
	  spaceShip.scale.y = 0.1
	  spaceShip.scale.z = 0.1

	  spaceShip.position.z = 1

	  planet = createSphere()
	  planet.add(spaceShip)
	  scene.add(planet)
	});


	document.addEventListener("keydown", function( event ) {
	  if ( event.keyCode === 65 ) {
	    spaceShip.lookAt( new THREE.Vector3(0,0,0) )
	    spaceShip.rotation.y += Math.PI

	    var matrix = new THREE.Matrix4()
	    matrix.extractRotation( spaceShip.matrix )

	    var direction = new THREE.Vector3( 0, 0, 1 )
	    matrix.multiplyVector3( direction )

	    spaceShip.position.add( direction )
	  }
	});

	window.setInterval(rotatePlanet, 20)

	scene.add(createLight())
	scene.add(createDirectionalLight())


/***/ },
/* 1 */
/***/ function(module, exports) {

	/* global THREE */
	/* global requestAnimationFrame */

	function createRenderer () {
	  var renderer = new THREE.WebGLRenderer({
	    antialias: true
	  })
	  renderer.setClearColor(new THREE.Color('lightblue'), 1)
	  renderer.setSize(window.innerWidth, window.innerHeight)
	  document.body.appendChild(renderer.domElement)
	  return renderer
	}

	function createCamera (renderer) {
	  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000)
	  camera.position.z = 5
	  camera.position.y = 3
	  // NOTE: unused variable must be assigned for the orbit controller to work
	  var controls = new THREE.OrbitControls(camera)

	  window.addEventListener('resize', function () {
	    renderer.setSize(window.innerWidth, window.innerHeight)
	    camera.aspect = window.innerWidth / window.innerHeight
	    camera.updateProjectionMatrix()
	  }, false)
	  return camera
	}

	function createRenderLoop () {
	  var renderLoop = []
	  var before = null
	  requestAnimationFrame(function animate (now) {
	    requestAnimationFrame(animate)
	    before = before || now - 1000 / 60
	    var deltaMsec = Math.min(200, now - before)
	    before = now
	    renderLoop.forEach(function (renderLoop) {
	      renderLoop(deltaMsec / 1000, now / 1000)
	    })
	  })
	  return renderLoop
	}

	function initialize () {
	  var scene
	  var camera
	  var renderer
	  var renderLoop

	  renderer = createRenderer()
	  renderLoop = createRenderLoop()

	  scene = new THREE.Scene()
	  camera = createCamera(renderer)

	  renderLoop.push(function () {
	    renderer.render(scene, camera)
	  })

	  return scene
	}

	module.exports = {
	  createRenderer: createRenderer,
	  createCamera: createCamera,
	  createRenderLoop: createRenderLoop,
	  initialize: initialize
	}


/***/ }
/******/ ]);