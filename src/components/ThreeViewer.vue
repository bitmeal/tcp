<template>
  <div id="THREEcontainer" class="THREEcontainer">
    <slot></slot>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
export default {
  name: "three-viewer",

  components: {},
  data: () => ({
    renderer: null,
    scene: null,
    protoscene: null,
    camera: null,
    controls: null
  }),
  props: {
    cameraUp: {
      type: Array,
      validator: val => {
        return val.length == 3 && !val.map(el => isFinite(el)).includes(false);
      },
      default: () => {
        return [0, 0, 1];
      }
    },
    cameraPosition: {
      type: Array,
      validator: val => {
        return val.length == 3 && !val.map(el => isFinite(el)).includes(false);
      },
      default: () => {
        return [3, 3, 3];
      }
    }
  },
  provide() {
    return {
      camera: () => {
        return this.camera;
      },
      renderer: () => {
        return this.renderer;
      },
      controls: () => {
        return this.controls;
      },
      scene: () => {
        return this.scene;
      },
      protoscene: () => {
        return this.protoscene;
      }
    };
  },
  methods: {
    initTHREE: function() {
      var scenebackground = new THREE.Color(0xf0f0f0);

      // BACKGROUND SCENE / COMMON CONFIG
      this.protoscene = new THREE.Scene();
      this.protoscene.background = scenebackground;

      this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.camera.up.set(...this.cameraUp);
      this.camera.position.set(...this.cameraPosition);
      this.camera.lookAt(0, 0, 0);

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.shadowMap.enabled = true;

      // USER SCENE
      this.scene = new THREE.Scene();

      this.scene.add(new THREE.AmbientLight(0xf0f0f0));
      var light = new THREE.SpotLight(0xffffff, 1.5);
      light.position.set(0, 1500, 200);
      light.angle = Math.PI * 0.2;
      light.castShadow = true;
      light.shadow.camera.near = 200;
      light.shadow.camera.far = 2000;
      light.shadow.bias = -0.000222;
      light.shadow.mapSize.width = 1024;
      light.shadow.mapSize.height = 1024;
      this.scene.add(light);
    },
    mountTHREE: function() {
      var container = document.getElementById("THREEcontainer");
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);

      var controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.enableDamping = true;
      controls.rotateSpeed = 0.35;
      controls.dampingFactor = 0.5;
      controls.enableZoom = true;
      this.controls = controls;

      // resize canvas
      this.resizeRenderer();
      // install window resize listener
      window.addEventListener("resize", this.resizeRenderer);
    },
    animate: function() {
      requestAnimationFrame(this.animate);

      // call childrens parentAnimate() hook
      for (let child of Array.isArray(this.$children)
        ? this.$children
        : this.$children != null
        ? [this.$children]
        : []) {
        if (child.parentAnimate) {
          child.parentAnimate();
        }
      }

      this.controls.update();

      this.renderer.autoClear = true; // clear renderer on next render call
      this.renderer.render(this.protoscene, this.camera);
      this.renderer.autoClear = false; // render over existing
      this.renderer.render(this.scene, this.camera);
    },
    resizeRenderer: function() {
      var container = document.getElementById("THREEcontainer");
      this.$nextTick(() => {
        this.renderer.setSize(
          container.clientWidth,
          window.innerHeight - container.getBoundingClientRect().top
        );
        this.camera.aspect = container.clientWidth / container.clientHeight;
        this.camera.updateProjectionMatrix();
      });

      // call childrens parentResizeRenderer() hook
      // delayed by two ticks
      this.$nextTick(
        this.$nextTick(() => {
          for (let child of Array.isArray(this.$children)
            ? this.$children
            : this.$children != null
            ? [this.$children]
            : []) {
            if (child.parentResizeRenderer) {
              child.parentResizeRenderer();
            }
          }
        })
      );
    }
  },
  created() {
    this.initTHREE();
  },
  mounted() {
    this.mountTHREE();
    this.animate();
  },
  watch: {
    cameraUp: function(val) {
      this.camera.up.set(...val);
    },
    cameraPosition: function(val) {
      this.camera.position.set(...val);
    }
  },
  beforeDestroy: function() {
    window.removeEventListener("resize", this.resizeRenderer);
  }
};
</script>

<style>
body {
  margin: 0;
  overflow: hidden;
}
.THREEcontainer {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  padding: 0 !important;
  margin: 0 !important;
  max-width: 100%;
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>