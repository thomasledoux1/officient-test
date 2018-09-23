
<template>
  <div>
    <div style="margin-bottom: 5%;" v-if="employee && !error" class="col-sm-12">
        <div>
          <h1>Persoonlijke gegevens</h1>
        </div>
        <div v-if="employee">
          <div class="col-sm-6">
            <div class="personal-details">
              <div class="row" style="margin-bottom: 3%;">
                <img :src="employee.avatar" class="avatar" />
              </div>
              <p style="font-size: 130%;">{{employee.name}}</p>
              <p><a :href="`mailto:${employee.email}`">{{employee.email}}</a></p>
              <p v-if="employee.current_role">Als {{employee.current_role.name}} gestart op {{employee.current_role.start_date}}</p>
              <p>{{addressFull}}</p>
            </div>
          </div>
          <div class="col-sm-6 map-wrapper">
            <google-map :coordinates=employee.address.coordinates></google-map>
          </div>
        </div>
        
        <div class="col-sm-12" style="margin-top: 5%;">
          <div>
            <h1 style="margin-bottom: 10px;">Woon-werkverkeer</h1>
            <p v-if="durationWeek">
              Totale tijd onderweg per week: <b>{{getTimeFromMins(durationWeek)}}</b>
            </p>
          </div>
          <div class="col-sm-12" v-if="directionsToWork && directionsToWork.length > 0">
            <directions :directionsToWork=directionsToWork :directionsFromWork=directionsFromWork></directions>
          </div>
        </div>
    </div>
    <p class="error" v-if="error">Er ging iets fout, probeer later opnieuw.</p>
  </div>
</template>

<script>
  import EmployeeService from "../services/employee.service.js";
  import GoogleMap from "./Map";
  import Directions from "./Directions";
  export default {
    name: "EmployeeDetail",
    components: {
      "google-map": GoogleMap,
      directions: Directions
    },
    data() {
      return {
        employee: null,
        error: null,
        directionsToWork: null,
        directionsFromWork: null,
        addressFull: '',
        durationWeek: 0,
        week: ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag"]
      };
    },
    methods: {
      getTimeFromMins(mins) {
        if (mins >= 60) {
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
          this.addressFull =
            data.data.address.line_1 +
            "," +
            data.data.address.line_2 +
            " " +
            data.data.address.zipcode +
            " " +
            data.data.address.city;
            //replace default avatar with other avatar
          this.employee.avatar =
            this.employee.avatar.split("/avatar")[0] ===
            "https://www.gravatar.com" ?
            "https://collaborativecbt.com/wp-content/uploads/2016/12/default-avatar.png" :
            this.employee.avatar;
            //load directions to work
          EmployeeService.getDirections(
            this.$route.params.employeeId,
            this.addressFull,
            data => {
              this.directionsToWork = data;
              //calculate week total commute
              this.durationWeek += Math.ceil(
                data.reduce((a, b) => a + b.duration.value, 0) / 60
              );
            },
            response => {
              this.error = response;
            },
            true
          );
          //load directions from work
          EmployeeService.getDirections(
            this.$route.params.employeeId,
            this.addressFull,
            data => {
              this.directionsFromWork = data;
              //calculate week total commute
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

<style scoped>
  h1,
  h2 {
    margin-bottom: 20px;
  }
  
  .personal-details {
    padding: 10px;
    border: 1px solid #cbddec;
    border-radius: 5px;
  }
  
  .personal-details p {
    margin: 0;
  }
  
  .avatar {
    border-radius: 50%;
    border: 5px solid #cbddec;
    min-height: 200px;
    min-width: 200px;
    max-height: 200px;
    max-width: 200px;
  }
  
  @media (max-width: 768px) {
    .map-wrapper {
      margin-top: 20px;
    }
  }
</style>
