<script>
import * as THREE from "three";

export default {
  name: 'three-viewer-responsive-axes',

  components: {
  },
  inject: ['scene', 'protoscene'],
  data: () => ({
      axes: null,
      bboxcache: null,
  }),
  methods: {
      updateAxes: function(dim) {
        if(this.axes != null)
        {
            this.protoscene().remove(this.axes);
            this.axes = null;
        }



        this.axes = new THREE.AxesHelper( dim );
        this.protoscene().add( this.axes );
      },
      originClearance: function(bbox) {
        var clear = [ this.axisClearance(bbox.min.x, bbox.max.x),
                      this.axisClearance(bbox.min.y, bbox.max.y),
                      this.axisClearance(bbox.min.z, bbox.max.z) ];//.filter((c) => { return c > 0; });
        console.log(clear);
        
        return clear.length == 0 ? 0 : clear.sort((a,b) => { return Math.abs(b) - Math.abs(a); })[0];
      },
      nanZ: function(val) {
        return isFinite(val) ? val : 0;
      },
      axisClearance: function(min, max) {
        min = this.nanZ(min);
        max = this.nanZ(max);
        console.log(Math.abs(max + min) <= Math.abs(max) ? 0 : [max, min].sort((a,b) => { return (Math.abs(a) - Math.abs(b)); }));
        return Math.abs(max + min) <= Math.abs(max) ? 0 : [max, min].sort((a,b) => { return (Math.abs(a) - Math.abs(b)); })[0];
      },
      parentAnimate: function() {
          // TODO: do for individual objects
          var bbox = new THREE.Box3().setFromObject(this.scene());

          if(this.bboxcache == null || !this.bboxcache.min.equals(bbox.min) || !this.bboxcache.max.equals(bbox.max))
          {
              this.bboxcache = bbox;

              // TODO: make object size dependant
              const clearance = this.originClearance(bbox);
              console.log(clearance);
              const dim = (clearance > 1.5 || clearance < 0) ? 1 : (Math.max(this.nanZ(bbox.max.x), this.nanZ(bbox.max.y), this.nanZ(bbox.max.z), 0.5) + 0.5);
              console.log(dim);

              this.updateAxes(dim);
          }
      },
    init: function () {
        this.updateAxes(2);
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
