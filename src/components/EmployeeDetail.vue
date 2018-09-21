
<template>
  <div style="margin-bottom: 5%;" v-if="employee" class="col-sm-12">
    <img :src="employee.avatar" style="border-radius: 50%;"/> 
    <div style="display: flex; flex-direction: column">
      <div style="font-size: 130%;">{{employee.name}}</div>
      <div>{{employee.email}}</div>
      <div v-if="employee.current_role">Als {{employee.current_role.name}} gestart op {{employee.current_role.start_date}}</div>
      <div v-if="employee.address">
        Woont te: {{employee.address.line_1}} {{employee.address.line_2}}, {{employee.address.country_code}}{{employee.address.zipcode}} {{employee.address.city}}
      </div>
      <google-map
        :coordinates=employee.address.coordinates
      ></google-map>
    </div>
      <div v-if="durationWeek">
        Totale tijd onderweg per week: {{getTimeFromMins(durationWeek)}}
      </div>
      <div class="col-sm-6" v-if="directionsToWork && directionsToWork.length > 0">
        <h2>Weg naar het werk: </h2>
        <div v-for="(day, index) in week" :key="day">
          <h1>{{day}}</h1>
          <p>Vertrek: {{directionsToWork[index].start_address}}</p>
          <div v-for="step in directionsToWork[index].steps">
            <span>{{step.html_instructions}} {{index < directionsToWork[index].steps.length -1 ? '=> ' : ''}}</span>
          </div>
          <span>Tijd onderweg: <b>{{directionsToWork[index].duration.text}}</b></span>
        </div>
      </div>
      <div class="col-sm-6" v-if="directionsFromWork && directionsFromWork.length > 0">
        <h2>Weg van het werk: </h2>
        <div v-for="(day, index) in week" :key="day">
          <h1>{{day}}</h1>
          <p>Vertrek: {{directionsFromWork[index].start_address}}</p>
          <div v-for="(step, indexStep) in directionsFromWork[index].steps">
            <span>{{step.html_instructions}} {{indexStep < directionsFromWork[index].steps.length -1 ? '=> ' : ''}}</span>
          </div>
          <span>Tijd onderweg: <b>{{directionsFromWork[index].duration.text}}</b></span>
        </div>
      </div>
    <p v-if="error">{{error}}</p>
  </div>
</template>
<script>
import EmployeeService from "../services/employee.service.js";
import GoogleMap from "./Map";
import moment from "moment";
export default {
  name: "thomasLedoux",
  components: { "google-map": GoogleMap },
  data() {
    return {
      employee: null,
      error: null,
      directionsToWork: null,
      directionsFromWork: null,
      durationWeek: 0,
      week: ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag"]
    };
  },
  methods: {
    getTimeFromMins(mins) {
      // do not include the first validation check if you want, for example,
      // getTimeFromMins(1530) to equal getTimeFromMins(90) (i.e. mins rollover)
      if (mins >= 60) {
        const hours = Math.floor(mins / 60);
        const minutes = mins % 60;
        return Math.floor(mins / 60) + "u" + mins % 60 + "min";
      } else {
        return mins + "min";
      }
    }
  },
  mounted() {
    EmployeeService.getEmployeeById(
      this.$route.params.employeeId,
      data => {
        this.employee = data.data;
        this.employee.avatar = this.employee.avatar.split("?")[0];
        EmployeeService.getDirections(
          data.data.address.line_1 +
            " " +
            data.data.address.line_2 +
            " " +
            data.data.address.country_code +
            " " +
            data.data.address.zipcode +
            " " +
            data.data.address.city,
          data => {
            this.directionsToWork = data;
            this.durationWeek += Math.ceil(
              data.reduce((a, b) => a + b.duration.value, 0) / 60
            );
          },
          response => {
            this.error = response;
          },
          true
        );
        EmployeeService.getDirections(
          data.data.address.line_1 +
            " " +
            data.data.address.line_2 +
            " " +
            data.data.address.country_code +
            " " +
            data.data.address.zipcode +
            " " +
            data.data.address.city,
          data => {
            this.directionsFromWork = data;
            this.durationWeek += Math.ceil(
              data.reduce((a, b) => a + b.duration.value, 0) / 60
            );
          },
          response => {
            this.error = response;
          }
        );
      },
      response => {
        this.error = response;
      }
    );
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
