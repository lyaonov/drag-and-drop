import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSelectListStore = defineStore('selectList', () => {
  const list = ref([]);

  function set(newList) {
    list.value = newList;
  }

  function clear() {
    list.value.splice(0);
  }

  function push(item) {
    list.value.push(item);
  }

  function remove(i) {
    list.value.splice(i, 1);
  }

  return { list, set, push, remove, clear }
});
export const itemsStore = defineStore('items', () => {
  const list = ref([]);

  function set(newList) {
    list.value = newList;
  }

  function clear() {
    list.value.splice(0);
  }

  function push(item) {
    list.value.push(item);
  }

  function remove(i) {
    list.value.splice(i, 1);
  }

  return { list, set, push, remove, clear }
});