<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <!-- <v-btn icon>
        <v-icon @click="toggleCube()" large :color="cubeBtnColor()">mdi-cube-outline</v-icon>
      </v-btn>-->
    </v-app-bar>

    <v-main>
      <three-viewer ref="viewer" :camera-up="[0,0,-1]" :camera-position="[0.2,0.2,0.2]">
        <three-viewer-frame-display />
        <three-viewer-css-2d-renderer />
      </three-viewer>
    </v-main>
      <v-navigation-drawer :app="true" absolute permanent right width="320px">
        <template v-slot:prepend>
          <v-list-item two-line>
            <v-list-item-avatar>
              <v-icon large>mdi-axis</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>Tool Transform</v-list-item-content>
            <v-list-item-action>
              <v-btn color="green" icon x-large>
                <v-icon large>mdi-matrix</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </template>
        <v-divider></v-divider>
        <!-- translation -->
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-axis-arrow</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Translation</v-list-item-title>
            <v-list-item-subtitle>{{ translationInTool ? 'in Tool' : 'in Flange' }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-switch v-model="translationInTool"></v-switch>
          </v-list-item-action>
        </v-list-item>
        <v-list dense class="ml-4">
          <v-list-item v-for="ax in ['x', 'y', 'z']" :key="ax">
            <v-list-item-icon>
              <v-icon>{{`mdi-axis-${ax}-arrow`}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-text-field
                type="number"
                :hide-details="true"
                v-model="translation[ax]"
                :label="ax.toUpperCase()"
                dense
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <!-- rotations -->
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-backup-restore</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Rotation</v-list-item-content>
          <v-list-item-action>
            <v-btn icon>
              <v-icon @click="addRotation" small>mdi-plus</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list dense class="ml-4">
          <v-list-item v-for="rotation in rotations" :key="rotation.id">
            <v-list-item-icon class="mt-6">
              <v-icon>{{`mdi-axis-${rotation.axis.axis}-rotate-${(rotation.value >= 0) ? 'counter' : ''}clockwise`}}</v-icon>
              {{rotation.newFrame ? "'" : ""}}
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="ml-0 pl-0">
                <v-btn-toggle v-model="rotation['axis']" group dense mandatory>
                  <v-btn
                    x-small
                    v-for="ax in axisToggle"
                    :key="ax.name"
                    :value="ax.model"
                    class="ma-1 pa-1"
                  >{{ax.name}}</v-btn>
                </v-btn-toggle>
              </v-list-item-title>
              <v-text-field type="number" :hide-details="true" v-model="rotation.value" dense></v-text-field>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-icon @click="removeRotation(rotation)" small color="red">{{mdi.mdiDeleteForever}}</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    <!-- </v-main> -->
  </v-app>
</template>

<script>
import * as THREE from "three";
import ThreeViewer from "./components/ThreeViewer.vue";
import ThreeViewerFrameDisplay from "./components/ThreeViewerFrameDisplay.vue";

import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";

import { mdiDeleteForever } from "@mdi/js";

import { v4 as uuidv4 } from "uuid";
import ThreeViewerCSS2DRenderer from "./components/ThreeViewerCSS2DRenderer.vue";

// var unitRot = [1,0,0,0,1,0,0,0,1];
var rotationProto = {
  id: null,
  value: 0,
  axis: { axis: "null", newFrame: false }
};

export default {
  name: "App",

  components: {
    "three-viewer": ThreeViewer,
    "three-viewer-frame-display": ThreeViewerFrameDisplay,
    "three-viewer-css-2d-renderer": ThreeViewerCSS2DRenderer
  },

  data: () => ({
    scene: null,
    flange: null,
    flangeLabel: null,
    tool: null,
    toolLabel: null,
    offset: null,
    translation: { x: 0, y: 0, z: 0 },
    translationInTool: false,
    rotations: [], //{id, value, axis: {axis, newFrame}}
    axisToggle: [
      { name: "X", model: { axis: "x", newFrame: false } },
      { name: "Y", model: { axis: "y", newFrame: false } },
      { name: "Z", model: { axis: "z", newFrame: false } },
      { name: "X'", model: { axis: "x", newFrame: true } },
      { name: "Y'", model: { axis: "y", newFrame: true } },
      { name: "Z'", model: { axis: "z", newFrame: true } }
    ],
    mdi: {
      mdiDeleteForever: mdiDeleteForever
    }
  }),
  methods: {
    addRotation: function() {
      var rot = Object.assign(Object.assign({}, rotationProto), {
        id: uuidv4(),
        axis: { axis: "x", newFrame: false }
      });
      this.rotations.push(rot);
    },
    removeRotation: function(rot) {
      this.rotations = this.rotations.filter(item => {
        return item.id != rot.id;
      });
    },
    updatePosition: function() {
      var pos = this.translation;
      var Vtrans = new THREE.Vector3(pos.x, pos.y, pos.z);
      if (this.translationInTool) {
        // var invTF = new THREE.Matrix4();
        // invTF.getInverse(this.TF);
        Vtrans.multiplyScalar(-1).applyMatrix4(this.TF);
      }

      this.tool.position = Vtrans;
      this.toolLabel.position = Vtrans;
      // this.toolLabel.position = new THREE.Vector3(-0.01,-0.01,-0.01).add(Vtrans);


      var points = [];
      points.push(new THREE.Vector3(0,0,0));
      points.push(new THREE.Vector3(0,0,Vtrans.z));
      points.push(new THREE.Vector3(0,Vtrans.y,Vtrans.z));
      points.push(Vtrans);

      var geometry = new THREE.BufferGeometry().setFromPoints(points);

      var material = new THREE.LineDashedMaterial({
        color: 0xbbbbbb,
        linewidth: 0.1,
        scale: 1,
        dashSize: 0.005,
        gapSize: 0.0025
      });

      if (this.offset) this.scene.remove(this.offset);

      this.offset = new THREE.Line(geometry, material);
      this.offset.computeLineDistances();
      this.scene.add(this.offset);
    }
  },
  mounted() {
    this.scene = this.$refs.viewer.scene;

    // make frames
    this.flange = new THREE.AxesHelper(0.05);
    this.tool = new THREE.AxesHelper(0.05);

    this.scene.add(this.flange);
    this.scene.add(this.tool);

    // make labels
    // flange
    var flangeText = document.createElement("div");
    flangeText.className = "THREEcss2Dlabel";
    flangeText.textContent = "flange";
    flangeText.style = "transform: "

    this.flangeLabel = new CSS2DObject(flangeText);
    this.flangeLabel.position = new THREE.Vector3(0,0,-0.02).add(this.flange.position);
    this.scene.add(this.flangeLabel);

    // tool
    var toolText = document.createElement("div");
    toolText.className = "THREEcss2Dlabel";
    toolText.textContent = "tool";

    this.toolLabel = new CSS2DObject(toolText);
    this.toolLabel.position = new THREE.Vector3(-0.01,-0.01,-0.01).add(this.tool.position);
    this.scene.add(this.toolLabel);

    // make flange cylinder
    var geometry = new THREE.CylinderGeometry(0.15, 0.15, 0.025, 64);
    const material = new THREE.MeshStandardMaterial({ color: 0x3366bb, opacity: 0.6, transparent: true });
    var cylinder = new THREE.Mesh(geometry, material);
    cylinder.rotation.x = 0.5 * Math.PI;
    cylinder.position.z = -0.0125;
    this.scene.add(cylinder);
  },
  computed: {
    TF: function() {
      // sort transformations; depending on old or new frame rotation
      var TF = this.rotations.reduce((acc, elem) => {
        var mat = new THREE.Matrix4();
        switch (elem.axis.axis) {
          case "x":
            mat.makeRotationX((elem.value / 180) * Math.PI);
            break;
          case "y":
            mat.makeRotationY((elem.value / 180) * Math.PI);
            break;
          case "z":
            mat.makeRotationZ((elem.value / 180) * Math.PI);
            break;
        }
        if (elem.axis.newFrame) {
          return acc.multiply(mat);
        } else {
          return mat.multiply(acc);
        }
      }, new THREE.Matrix4());

      return TF;
    }
  },
  watch: {
    translationInTool: function() {
      this.updatePosition();
    },
    TF: function(val) {
      this.tool.quaternion.setFromRotationMatrix(val);
    },
    translation: {
      handler: function(val) {
        console.log(val);
        this.updatePosition();
      },
      deep: true
    }
    // rotations: {
    //   handler: function(val) {
    //     console.log(val);
    //   },
    //   deep: true
    // }
  }
};
</script>

<style>
.THREEcss2Dlabel {
  padding: 0 !important;
  margin: 0 !important;
  /* transform: translate(50%, 0%);
  -webkit-transform: translate(50%, 0%); */

  text-shadow: -1px 1px 5px rgba(0, 0, 0, 0.5);

  -webkit-text-stroke: 1px #505050;
  -webkit-text-fill-color: white;
  font-weight: 600;
  font-size: 12pt;
}
</style>