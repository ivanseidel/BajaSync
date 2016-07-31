angular.module('3DSetupHelper', [

])

// Helps with pre-defined lights, cameras, reneders, updatings and
// repeated code that needs to be done in order to setup a scene.
// Also, keeps track of the parent's element and adjusts size acordingly.
.factory('Basic3DSetup', function ($window){

  function Basic3DScene($scope, canvas, opts){
    this.canvas = canvas;
    this.opts = opts = opts || {};

    this._mouse = new THREE.Vector2();

    // Initialize Scene, Camera and Renderer
    var scene = this.scene = new THREE.Scene();
    var camera = this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    var renderer = this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true
    });

    // Setup Renderer
    renderer.setClearColor(0xFFFFFFFF);
    renderer.setPixelRatio($window.devicePixelRatio);


    // Add Grid helper
    if(opts.grid){
      var grid = new THREE.GridHelper( 2, 0.1 );
      scene.add(grid);
    }

    // Add Axis
    if(opts.axis){
      var axisHelper = new THREE.AxisHelper( 2 );
      scene.add(axisHelper);
    }

    // Set timeout to update size
    // setTimeout(thisupdateSize, 0)

    // Add Lights
    var lights = [];
    scene.add( new THREE.HemisphereLight( 0xFFFFFF, 0x404040, 1.0 ) );

    // Render once
    this.updateSize();

    // Update the size once the window get's resized
    $window.addEventListener('resize',
      _.throttle(this.updateSize.bind(this), 500), false);
  }

  Basic3DScene.prototype.getMousePosition = function (dom, x, y){
    var rect = dom.getBoundingClientRect();
    this._mouse.x =  ( x - rect.left ) / rect.width * 2 - 1;
    this._mouse.y = -( y - rect.top ) / rect.height * 2 + 1;
  }

  // Raytrace objects registered with addRaytraceObject and highlight them
  Basic3DScene.prototype.raytrace = function (pos){
    // console.log('Raytrace', this._raycaster);
    // update the picking ray with the camera and mouse position
  	this._raycaster.setFromCamera(pos.clone(), this.camera);
    
  	// calculate objects intersecting the picking ray
  	var intersects = this._raycaster.intersectObjects(this._raytraceObjects, true);

    console.log('Intersects: ', this._raytraceObjects.length, intersects.length);

  	for(var i = 0; i < intersects.length; i++) {
  		intersects[i].object.material.color.set(0xff0000);
  	}

  	this.render();
  }

  Basic3DScene.prototype.addRaytraceObject = function (group) {
    var self = this;

    if( !('_raytraceObjects' in this) ){
      // Setup listener once
      console.log('Setup raytrace');
      this._raytraceObjects = [];
      this._raycaster = new THREE.Raycaster();
      console.log(this._raycaster);
      this.canvas.addEventListener('mousemove', function (event){
        self.getMousePosition(
          self.canvas,
          event.clientX,
          event.clientY
        );

        // Raytrace mouse position
        self.raytrace(self._mouse);
      });
    }

    // Initialize raytrace array and push new group to verify
    this._raytraceObjects.push(group);
  }

  Basic3DScene.prototype.updateSize = function (shouldRender){
    // Measure Width and Height from parent
    var w = this.canvas.parentElement.offsetWidth;
    var h = this.canvas.parentElement.offsetHeight;
    $(this.canvas).width(w);
    $(this.canvas).height(h);

    // Update camera and renderer aspect/size
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight);

    // Render frame
    shouldRender && this.render();
  }

  Basic3DScene.prototype.render = function () {
    this.renderer.render(this.scene, this.camera);
  }

  return Basic3DScene;

})
