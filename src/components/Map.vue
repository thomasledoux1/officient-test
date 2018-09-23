<template>
  <div class="map-wrapper">
    <div class="google-map" :id="mapName">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'google-map',
    props: ['coordinates'],
    data: function() {
      return {
        mapName: "map",
      }
    },
    mounted: function() {
      const element = document.getElementById(this.mapName);
      const options = {
        zoom: 15,
        center: new google.maps.LatLng(Number(this.coordinates.split(',')[0]), Number(this.coordinates.split(',')[1]))
      }
      //create google map instance
      const map = new google.maps.Map(element, options);
      //calculate position marker
      const position = new google.maps.LatLng(Number(this.coordinates.split(',')[0]), Number(this.coordinates.split(',')[1]));
      //place marker on map
      const marker = new google.maps.Marker({
        position,
        map
      });
    }
  };
</script>

<style scoped>
  .google-map {
    width: 100%;
    height: 295px;
    margin: 0 auto;
    background: gray;
  }
  
  .map-wrapper {
    padding: 10px;
    border: 1px solid #cbddec;
    border-radius: 5px;
  }
</style>