import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource);

const OfficientAPI = 'https://officient-test.herokuapp.com/api/';

export default {
    getEmployees(success, error) {
        Vue.http.get(OfficientAPI + 'employees').then(response => {
            success(response.body);
        }, response => {
            error(response);
            // error callback
        });
        /*Vue.http.get('employees').then(
            (response) => {
                success(response.data)
            },
            (response) => {
                error(response)
            }
        )*/
    },
    getEmployeeById(id, success, error) {
        Vue.http.get(OfficientAPI + 'employee?id=' + id).then(response => {
            success(response.body);
        }, response => {
            error(response);
            // error callback
        });
        /*Vue.http.get('employees').then(
            (response) => {
                success(response.data)
            },
            (response) => {
                error(response)
            }
        )*/
    },
    getDirections(id, address, success, error, toWork = null) {
        let query = '?id=' + id + '&address=' + address;
        if (toWork) {
            query += '&toWork=true';
        }
        Vue.http.get(OfficientAPI + 'directions' + query).then(response => {
            success(response.body);
        }, response => {
            error(response);
            // error callback
        });
    }
}