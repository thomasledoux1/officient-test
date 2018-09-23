import {
    expect
} from 'chai';
import {
    shallowMount,
    createLocalVue
} from '@vue/test-utils';
import VueRouter from 'vue-router';
import EmployeeDetail from '../components/EmployeeDetail.vue';
const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('EmployeeDetail.vue', () => {
    it('should contain a p element with an error because there will be no employee connected', () => {
        const wrapper = shallowMount(EmployeeDetail, {
            localVue,
            router
        });
        expect(wrapper.findAll('p').length === 1);
    });
});