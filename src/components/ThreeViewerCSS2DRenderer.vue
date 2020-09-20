<template>
  <div class="THREEcss2Drenderer" id="THREEcss2Drenderer"></div>
</template>

<script>
import * as THREE from "three";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";

export default {
  name: "three-viewer-css-2d-renderer",

  components: {},
  inject: ["renderer", "scene", "camera"],
  data: () => ({
    cssrenderer: null
  }),
  methods: {
    init: function() {
      this.cssrenderer = new CSS2DRenderer();
      this.cssrenderer.setSize(window.innerWidth, window.innerHeight);
      this.cssrenderer.domElement.style.position = "absolute";
      this.cssrenderer.domElement.style.top = "0px";
      this.cssrenderer.domElement.style.pointerEvents = "none";

      var container = document.getElementById("THREEcss2Drenderer");
      container.appendChild(this.cssrenderer.domElement);
    },
    parentResizeRenderer: function() {
      // var container = document.getElementById("THREEcss2Drenderer");
      var rendererSize = new THREE.Vector2();
      this.renderer().getSize(rendererSize);

      this.$nextTick(() => {
        this.cssrenderer.setSize(rendererSize.width, rendererSize.height);
      });
    },
    parentAnimate: function() {
      this.cssrenderer.render(this.scene(), this.camera());
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style>
.THREEcss2Drenderer {
  padding: 0 !important;
  margin: 0 !important;
  pointer-events: none;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: inherit;
}
</style>