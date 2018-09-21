<template>
  <div class="google-map" :id="mapName"></div>
</template>

<script>
export default {
  name: 'google-map',
  props: ['coordinates'],
  data: function () {
    return {
      mapName: "map",
    }
  },
  mounted: function () {
    const element = document.getElementById(this.mapName);
    const options = {
      zoom: 14,
      center: new google.maps.LatLng(Number(this.coordinates.split(',')[0]),Number(this.coordinates.split(',')[1]))
    }
    const map = new google.maps.Map(element, options);
    const position = new google.maps.LatLng(Number(this.coordinates.split(',')[0]), Number(this.coordinates.split(',')[1]));
    const marker = new google.maps.Marker({position, map});
  }
};
</script>

<style scoped>
.google-map {
  width: 400px;
  height: 300px;
  margin: 0 auto;
  background: gray;
}
</style>