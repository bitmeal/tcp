<template>
  <div class="THREEframecontainerWrapper" id="THREEframecontainerWrapper">
    <div class="THREEframecontainer" id="THREEframecontainer">
        <div class="axeslabel" id="frameXcontainer">X</div>
        <div class="axeslabel" id="frameYcontainer">Y</div>
        <div class="axeslabel" id="frameZcontainer">Z</div>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";

export default {
  name: 'three-viewer-frame-display',

  components: {
  },
  inject: ['camera', 'controls'],
  data: () => ({
      framerenderer: null,
      framescene: null,
      framecamera: null,
      framecontainer: null,
  }),
  methods: {
    //   parentAnimate: function() {
    //   },
    init: function () {
      // AXES HELPER OVERLAY SCENE
      this.framerenderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
      this.framecontainer = document.getElementById('THREEframecontainer');
      this.framerenderer.setSize(this.framecontainer.clientWidth, this.framecontainer.clientHeight);
      this.framecontainer.appendChild(this.framerenderer.domElement);
      this.framescene = new THREE.Scene();
      // this.framescene.background = new THREE.Color( 0xf0f0ff );
      this.framerenderer.setClearColor( 0x000000, 0 );
      this.framescene.add(new THREE.AmbientLight( 0xf0f0f0 ));
      this.framecamera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 );
      this.framecamera.up = this.camera().up; // important!
      this.framecamera.position.z = 5;
      this.framescene.add( new THREE.AxesHelper( 5 ) );
    },
    syncAxesLabels: function(length) {
      // position labels and adjust opacity
      this.syncAxesLabel(new THREE.Vector3(length, 0, 0), "frameXcontainer");
      this.syncAxesLabel(new THREE.Vector3(0, length, 0), "frameYcontainer");
      this.syncAxesLabel(new THREE.Vector3(0, 0, length), "frameZcontainer");

      // adjust stacking order based on opacity
      var labels = [
          document.getElementById("frameXcontainer"),
          document.getElementById("frameYcontainer"),
          document.getElementById("frameZcontainer")
        ];
      labels.sort((a, b) => { return a.style.opacity - b.style.opacity; });
      for(let i in [0,1,2]) { labels[i].style.zIndex = i; }
    },
    syncAxesLabel: function(AXvector, id) {
      var labelpos = AXvector.clone();
      const canvas = this.framerenderer.domElement;
      const Ovector = new THREE.Vector3(0, 0, 0);
      const originDist = this.framecamera.position.distanceTo(Ovector);
      const labelDist = this.framecamera.position.distanceTo(AXvector.projectOnVector(this.framecamera.position));
      
      labelpos.project(this.framecamera);
      labelpos.x = Math.round((0.5 + labelpos.x * 0.7) * (canvas.width / window.devicePixelRatio));
      labelpos.y = Math.round((0.5 - labelpos.y *0.7) * (canvas.height / window.devicePixelRatio));

      var label = document.getElementById(id);
      label.style.top = `${100*labelpos.y / this.framecontainer.clientHeight}%`;
      label.style.left = `${100*labelpos.x / this.framecontainer.clientWidth}%`;
      label.style.opacity = (labelDist > originDist) ? Math.min(0.25 + 1/(labelDist - originDist), 1) : 1;
    },
    syncCoordinateFrames: function() {
      this.framecamera.position.copy( this.camera().position );
      this.framecamera.position.sub( this.controls().target );
      this.framecamera.position.setLength( 15 );
      this.framecamera.lookAt( this.framescene.position );
    },
    animate: function () {
      requestAnimationFrame(this.animate);

      // skip if controls are not ready
      if(this.controls() == null)
        return;
    
      this.syncCoordinateFrames();
      this.framerenderer.render(this.framescene, this.framecamera);
      this.syncAxesLabels(5);
    },
  },
  mounted() {
    this.init();
    this.animate();
  },
};
</script>

<style>
  .THREEframecontainerWrapper {
    padding: 0!important;
    margin: 0!important;
    pointer-events: none;
    width: 128px;
    height: 128px;
    position:absolute;
    left:10px;
    bottom:10px;
  }
  .THREEframecontainer {
    padding: 0!important;
    margin: 0!important;
    pointer-events: none;
    width: 100%;
    height: 100%;
    position:relative;
  }
  .axeslabel {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: default;
    position:absolute;
    padding: 0!important;
    margin: 0!important;
    transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%, -50%);
    -webkit-text-stroke: 1px #505050;
    -webkit-text-fill-color: white;
    font-weight:900;
    font-size: 14pt;
  }
</style>