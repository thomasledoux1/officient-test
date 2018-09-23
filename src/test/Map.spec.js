import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Map from '../components/Map.vue'

describe('Directions.vue', () => {
  it('should contain an element with a class called google-map', () => {
    const wrapper = shallowMount(Map);
    expect(wrapper.findAll('.google-map').length === 1);
  });
});