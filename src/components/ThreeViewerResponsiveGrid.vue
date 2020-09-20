<script>
import * as THREE from "three";

export default {
  name: 'three-viewer-responsive-grid',

  components: {
  },
  inject: ['scene', 'protoscene'],
  data: () => ({
      grid: null,
      bboxcache: null,
  }),
  methods: {
      updateGrid: function(dim, offx, offy) {
        if(this.grid != null)
        {
            this.protoscene().remove(this.grid);
            this.grid = null;
        }

        this.grid = new THREE.GridHelper( dim, dim*10, "#888888", "#888888" );
        this.grid.position.z = 0;
        this.grid.material.opacity = 0.25;
        this.grid.material.transparent = true;
        this.grid.geometry.rotateX( Math.PI / 2 );
        this.grid.translateX(offx);
        this.grid.translateY(offy);

        this.protoscene().add( this.grid );
      },
      parentAnimate: function() {
          var bbox = new THREE.Box3().setFromObject(this.scene());

          if(this.bboxcache == null || !this.bboxcache.min.equals(bbox.min) || !this.bboxcache.max.equals(bbox.max))
          {
              this.bboxcache = bbox;

              var dim = Math.round(Math.max(
                            (isFinite(bbox.max.x)?bbox.max.x:0) - (isFinite(bbox.min.x)?bbox.min.x:0),
                            (isFinite(bbox.max.y)?bbox.max.y:0) - (isFinite(bbox.min.y)?bbox.min.y:0)
                        ) + 3 );
              var offx = Math.round(((isFinite(bbox.min.x)?bbox.min.x:0) + (isFinite(bbox.max.x)?bbox.max.x:0))/2*10)/10;
              var offy = Math.round(((isFinite(bbox.min.y)?bbox.min.y:0) + (isFinite(bbox.max.y)?bbox.max.y:0))/2*10)/10;
                
                this.updateGrid(dim, offx, offy);
          }
      },
    init: function () {
        this.updateGrid(5,0,0);
    },
  },
  mounted() {
    this.init();
  },
  render(createElement) {
    return createElement();
  }
};
</script>
