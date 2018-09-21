
<template>
  <div v-if="employee">
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
    <p v-if="error">{{error}}</p>
  </div>
</template>
<script>
import EmployeeService from "../services/employee.service.js";
import GoogleMap from './Map'
export default {
  name: "thomasLedoux",
  components: {'google-map': GoogleMap},
  data() {
    return {
      employee: null,
      error: null
    };
  },
  methods: {
    openDetail: function(id) {
      /*EmployeeService.getEmployeeById(id, 
      data => {
        console.log(data);
        //this.employees = data.data;
      },
      response => {
        this.error = response;
      }
    );*/
      //router.push({ name: 'user', params: { userId: 123 }});
    }
  },
  mounted() {
    EmployeeService.getEmployeeById(
      this.$route.params.employeeId,
      data => {
        console.log(data.data.address.coordinates);
        this.employee = data.data;
        this.employee.avatar = this.employee.avatar.split("?")[0];
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
