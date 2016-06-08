angular.module('Baja', [
  '3DSceneHelper'
])


.service('BajaMenuSensors', function () {
  this.name = 'Sensores'
  this.icon = 'mdi-lightbulb-outline'
  this.params = {test: 'lol'}
  this.template = 'views/baja.menu.sensors.html'
})

.service('BajaWindowModelos', function () {
  this.name = 'Gerenciar Modelos'
  this.params = {test: 'lol'}
  this.template = 'views/baja.window.modelos.html'
})


.controller('BajaWindowModelosCtrl', function ($scope, $timeout, $element, $window) {
  // Find element where to render
  var canvas = $($element).find('.three-view')[0];

  // Initialize Scene
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });

  // Setup Renderer
  renderer.setClearColor( 0xFFFFFFFF );
  renderer.setPixelRatio($window.devicePixelRatio);

  // Lights
  scene.add( new THREE.HemisphereLight( 0xFFFFFF, 0x404040, 1.0 ) );

  var lights = [];
	lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
	lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
	lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

	lights[ 0 ].position.set( 0, 200, 0 );
	lights[ 1 ].position.set( 100, 200, 100 );
	lights[ 2 ].position.set( - 100, - 200, - 100 );

	scene.add( lights[ 0 ] );
	scene.add( lights[ 1 ] );
	scene.add( lights[ 2 ] );

  // Controls
  // var controls = new THREE.OrbitControls( camera );
	// controls.target.set( 0, 0, 0 );
	// controls.update();

  // Specific to the app
  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  // var material = new THREE.MeshBasicMaterial( { color: 0xff9700 } );

  var diffuseColor = new THREE.Color( 0xFF9700 );
	var material = new THREE.MeshLambertMaterial( {
    // map: imgTexture,
    // bumpMap: imgTexture,
    // bumpScale: bumpScale,
    color: diffuseColor,
    metalness: 0.6,
    roughness: 0.8,
    shading: THREE.SmoothShading,
    // envMap: localReflectionCube
  })

  var cube = new THREE.Mesh( geometry, material );
  scene.add( cube );
  camera.position.z = 5;

  // Update the scene size once the view is ready
  $timeout(ready);

  // Update the size once the window get's resized
  $window.addEventListener('resize', _.throttle(updateSize, 200), false);

  function ready(){

    updateSize();
    render();
  }

  function updateSize(){
    // Measure Width and Height from parent
    var w = canvas.parentElement.offsetWidth;
    var h = canvas.parentElement.offsetHeight;
    $(canvas).width(w);
    $(canvas).height(h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
  }

  function render() {
  	requestAnimationFrame( render );

    cube.rotation.y += 0.02;
  	renderer.render( scene, camera );
  }

})

console.log($);
