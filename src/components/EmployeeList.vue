
<template>
  <div>
    <h1>Officient | Overzicht medewerkers</h1>
    <div class="col-sm-12">
      <div class="search">
        <i class="fa fa-search"></i>
        <input v-model="search" placeholder="Zoek medewerker"/>
      </div>
    </div>
    <div class="col-xs-12 col-sm-4 col-md-3" v-if="employees && !error" v-for="item in filteredList" v-on:click="openDetail(item.id)" :key="item.id" style="margin-top: 2%;">
      <div class="employee-cell">
        <p style="margin-top: 10px">
          Naam: {{item.name}}
        </p>
        <p>
          E-mail: {{item.email}}
        </p>
        <p>
          Functie: {{item.role_name}}
        </p>
      </div>
    </div>
    <p class="error" v-if="error">Er ging iets fout, probeer later opnieuw.</p>
  </div>
</template>

<script>
import EmployeeService from "../services/employee.service.js";
import router from "../router";
export default {
  name: "employeelist",
  data() {
    return {
      employees: [],
      error: null,
      search: ""
    };
  },
  methods: {
    openDetail: function(id) {
      router.push({
        name: "EmployeeDetail",
        params: {
          employeeId: id
        }
      });
    }
  },
  computed: {
    filteredList() {
      //filter for search field
      return this.employees.filter(employee => {
        return (
          employee.name.toLowerCase().includes(this.search.toLowerCase()) ||
          employee.email.toLowerCase().includes(this.search.toLowerCase()) ||
          employee.role_name.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    }
  },
  mounted() {
    EmployeeService.getEmployees(
      data => {
        this.employees = data.data;
      },
      response => {
        this.error = response;
      }
    );
  }
};
</script>

<style scoped>
a {
  color: #42b983;
}

.employee-cell {
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid #cbddec;
}

.search {
  position: relative;
    cursor: default;
    padding: 0;
    vertical-align: top;
    display: inline-block;
}

.search input {
  padding-left: 28px;
}

.fa-search {
    position: absolute;
    left: 0;
    padding: 6px 10px;
    pointer-events: none;
    margin-top: 0;
}

.employee-cell:hover {
  background-color: lightgrey;
}

.error {
  color: red;
  font-weight: bold;
}
</style>
