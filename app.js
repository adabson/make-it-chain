document.addEventListener("DOMContentLoaded",function()
{
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setClearColor( 0xffffff, 1 );
  document.body.appendChild(renderer.domElement);

  hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x222222, 10); //( skyColor, groundColor, intensity )
  hemisphereLight.position.set(0, 100, 0);
  scene.add(hemisphereLight);

  hemisphereLight2 = new THREE.HemisphereLight(0xffffff, 0x222222, 10); //( skyColor, groundColor, intensity )
  hemisphereLight2.position.set(0, -100, 0);
  scene.add(hemisphereLight2);

  var ambLight = new THREE.AmbientLight(0xffffff,1);
  scene.add(ambLight);

  var pointLightLeft = new THREE.PointLight(0x77aa88,1);
  pointLightLeft.position.set(-2,-1,10);
  scene.add(pointLightLeft);

  var pointLightRight = new THREE.PointLight(0xff8833,1);
  pointLightRight.position.set(2,-1,2);
  scene.add(pointLightRight);

  var whitePointLight = new THREE.PointLight(0xffffff,0.3);
  whitePointLight.position.set(0,2,20);
  scene.add(whitePointLight);

  var dirLight = new THREE.DirectionalLight(0xff8833,1);
  dirLight.position.z = 2;

  scene.add(dirLight);

  var texture = new THREE.TextureLoader().load('./bit.jpg');
  var geom = new THREE.CylinderGeometry(3,3,0.4,100);
  var material = new THREE.MeshStandardMaterial({
    color:0xffffff,
    map:texture,
    metalness:0.9,
    roughness:0.3
  });
  var mesh0 = new THREE.Mesh(geom,material);
  var mesh1 = new THREE.Mesh(geom,material);
  var mesh2 = new THREE.Mesh(geom,material);
  mesh1.position.x = 10;
  mesh2.position.x = -10;
  var mesh = [mesh0, mesh1, mesh2];

  mesh.forEach(m => {
    scene.add(m);
  });

  var bound = 20;
  var fallspeed = bound / 100;

  camera.position.set(0,0,20);


  mesh[1].position.y=bound*.66;
  mesh[2].position.y=bound*1.33;

  mesh[0].rotation.y=1.5;
  mesh[2].rotation.y=6;
  function animate()
  {
    mesh[0].rotation.x+=0.1;
    mesh[2].rotation.z+=0.1;
    mesh[2].rotation.y+=0.1;
    mesh[1].rotation.z+=.2;
    requestAnimationFrame(animate);
    renderer.render(scene,camera);

    mesh.forEach(m=>{
      m.position.y -= fallspeed;
      if(m.position.y < -bound){
        m.position.y = bound;
      }
    });
  }
  animate();
});