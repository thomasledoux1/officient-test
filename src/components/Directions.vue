
<template>
  <div>
    <div v-for="(day, index) in week" :key="day">
      <div style="cursor: pointer;  text-align: left" v-on:click="changeDay(index)">
        <span class="day-title">{{day}}</span><i class="fas fa-chevron-right" style="margin-left: 2%" v-bind:class="{ rotate: isActive[index], 'rotate-back': !isActive[index] }"></i>
      </div>
      <div style="text-align: left">
      <div v-if="isActive[index] && directionsToWork && directionsFromWork">
        <h4 style="text-align: left">Thuis <i class="fas fa-arrow-right" style="font-size: 80%;"></i> Werk</h4>
        <ol>
          <li>Vertrek van {{directionsToWork[index].start_address}}</li>
          <li v-for="(step, indexStep) in directionsToWork[index].steps" :key="indexStep">
            {{step.html_instructions}}
          </li>
          <li>Aankomst op {{directionsToWork[index].end_address}}</li>
        </ol>
        <span>Tijd onderweg: <b>{{directionsToWork[index].duration.text}}</b></span>
        <h4 style="text-align: left">Werk <i class="fas fa-arrow-right" style="font-size: 80%;"></i> Thuis</h4>
        <ol>
          <li>Vertrek van {{directionsFromWork[index].start_address}}</li>
          <li v-for="(step, indexStep) in directionsFromWork[index].steps" :key="indexStep">
            {{step.html_instructions}}
          </li>
          <li>Aankomst op {{directionsFromWork[index].end_address}}</li>
        </ol>
        <span>Tijd onderweg: <b>{{directionsFromWork[index].duration.text}}</b></span>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "directions",
    props: ["directionsToWork", "directionsFromWork"],
    data() {
      return {
        week: ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag"],
        isActive: [true, false, false, false, false]
      };
    },
    methods: {
      //collapse day view
      changeDay: function(index) {
        this.$set(this.isActive, index, !this.isActive[index]);
      }
    }
  };
</script>

<style scoped>
  .rotate-back {
    transition: all 0.3s;
    transform: rotate(0);
  }
  
  .rotate {
    transition: all 0.3s;
    transform: rotate(90deg);
  }

  .day-title {
    font-size: 170%;
    font-weight: 700;
  }
</style>
