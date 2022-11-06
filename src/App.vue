<script setup>
import TheInput from './components/TheInput.vue';
import TheBoard from './components/TheBoard.vue'
import { ref, computed } from 'vue';
import { useSelectListStore,itemsStore } from "./store/state";
import initialCards from './initialCards'


const selectListStore = useSelectListStore();
const selectList = computed(() => selectListStore.list);

for (let item in initialCards) {
  let newItem = {
    [item]: initialCards[item]
  }
  selectListStore.push(newItem)
}
const input = ref()

const allNamesItems = itemsStore()
const customers = computed(() => allNamesItems.list);

</script>

<template>
  <header>
    <h1>Документы</h1>
    <nav>
      <div class="btn svg"><svg fill="gray" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15"
          viewBox="0 0 24 24">
          <path
            d="M 6.0097656 2 C 4.9143111 2 4.0097656 2.9025988 4.0097656 3.9980469 L 4 22 L 12 19 L 20 22 L 20 20.556641 L 20 4 C 20 2.9069372 19.093063 2 18 2 L 6.0097656 2 z M 6.0097656 4 L 18 4 L 18 19.113281 L 12 16.863281 L 6.0019531 19.113281 L 6.0097656 4 z">
          </path>
        </svg></div>
      <div class="btn"><span class="symbol">+</span>&nbsp Новый тип</div>
      <div class="btn"><span class="symbol">+</span>&nbsp Новый документ</div>
    </nav>
  </header>
  <TheInput :items="customers" filterby="name" />
  <TheBoard />

</template>

<style scoped>
.search {
  height: 100%;
  width: 20%;
  display: flex;
  align-items: center;
}

h1 {
  font-size: 30px;
  font-family: Roboto;
  font-weight: 500;
}

header {
  margin: 20px auto;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.symbol {
  color: blue;
  font-size: 30px;

}

.btn {
  margin: auto 5px;
  font-weight: 900;
  padding-left: 20px;
  padding-right: 20px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(193, 193, 193);
  border-radius: 20px;
}

nav {
  display: flex;
  justify-content: center;
  align-items: center;
}

.svg {
  padding: 0;
  border-radius: 50%;
  width: 30px;
  height: 30px;
}

.btn:hover {
  background: rgba(173, 216, 230, 0.2);
  cursor: pointer;
}

.input {
  margin-top: 29px;
  position: relative;
  margin-left: 70px;
  width: 564px;
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

input:focus {
  border-bottom: 2px solid blue;
}

input {
  font-size: 15px;
  padding-bottom: 3px;
  padding-left: 35px;
  height: 100%;
  width: 93%;
  border: none;
  outline: none;
  border-bottom: 2px solid gray;
}

.multiply {
  position: absolute;
  right: 10px;
  font-size: 15px;
  color: red;
  cursor: pointer;
}

.glass {
  left: 10px;
  position: absolute;
  margin-bottom: 5px;
}
</style>
