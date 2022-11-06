

<template>
  <div class="card-scene">
    <Container orientation="vertical" @drop="onColumnDrop($event)" drag-handle-selector=".column-drag-handle"
      @drag-start="dragStart" :drop-placeholder="upperDropPlaceholderOptions">
      <Draggable v-for="column in scene.children.filter(col => col.name !== 'unselected')" :key="column.id"
        :class="!column.isOpen ? 'activeDrag' : ''">
        <div :class="column.props.className">
          <div v-if="column.name !== 'unselected'" class="card-column-header">
            <svg @click="open(column)" :class="column.isOpen ? 'active' : ''" class="close_open" width="10" height="10"
              viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L7 7L13 1" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <input class="inputCategory" :class="!column.isReadOnly ? 'visibleInput' : ''" type="text"
              v-model="column.name" :readonly="column.isReadOnly" @keyup.enter="editCat(column)">
            <p v-if="column.isReadOnly"
              style="font-size:11px;color: #8E9CBB;position:absolute;font-weight:400px; left:350px; font-family:'Fira Sans';">
              {{ column.description }}</p>

            <div class="colors" v-if="column.name === 'Обязательные для всех' && column.isReadOnly"
              style="positon:absolute; display:flex;">
              <div class="color red" style="width:10px;height:10px;background: red;border-radius: 50%;"></div>
              <div class="color yellow" style="width:10px;height:10px;background: yellow;border-radius: 50%;"></div>
              <div class="color orange"
                style="width:10px;height:10px;background: orange;border-radius: 50%; border: 2px solid black; box-sizing: border-box; box-shadow: 0px 5px 7px gray;">
              </div>
            </div>


            <div class="nav_item">
              <svg style="margin-right: 10px;" @click="editCat(column)" fill="gray" xmlns="http://www.w3.org/2000/svg"
                x="0px" y="0px" width="14" height="14" viewBox="0 0 24 24">
                <path
                  d="M 18.414062 2 C 18.158062 2 17.902031 2.0979687 17.707031 2.2929688 L 15.707031 4.2929688 L 14.292969 5.7070312 L 3 17 L 3 21 L 7 21 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.926094 2.0979687 18.670063 2 18.414062 2 z M 18.414062 4.4140625 L 19.585938 5.5859375 L 18.292969 6.8789062 L 17.121094 5.7070312 L 18.414062 4.4140625 z M 15.707031 7.1210938 L 16.878906 8.2929688 L 6.171875 19 L 5 19 L 5 17.828125 L 15.707031 7.1210938 z">
                </path>
              </svg>
              <svg @click="remove(column.name)" style="margin-right: 5px;" class="trash"
                xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" fill="red"
                viewBox="0 0 48 48">
                <path
                  d="M 24 4 C 20.704135 4 18 6.7041348 18 10 L 11.746094 10 A 1.50015 1.50015 0 0 0 11.476562 9.9785156 A 1.50015 1.50015 0 0 0 11.259766 10 L 7.5 10 A 1.50015 1.50015 0 1 0 7.5 13 L 10 13 L 10 38.5 C 10 41.519774 12.480226 44 15.5 44 L 32.5 44 C 35.519774 44 38 41.519774 38 38.5 L 38 13 L 40.5 13 A 1.50015 1.50015 0 1 0 40.5 10 L 36.746094 10 A 1.50015 1.50015 0 0 0 36.259766 10 L 30 10 C 30 6.7041348 27.295865 4 24 4 z M 24 7 C 25.674135 7 27 8.3258652 27 10 L 21 10 C 21 8.3258652 22.325865 7 24 7 z M 13 13 L 35 13 L 35 38.5 C 35 39.898226 33.898226 41 32.5 41 L 15.5 41 C 14.101774 41 13 39.898226 13 38.5 L 13 13 z M 20.476562 17.978516 A 1.50015 1.50015 0 0 0 19 19.5 L 19 34.5 A 1.50015 1.50015 0 1 0 22 34.5 L 22 19.5 A 1.50015 1.50015 0 0 0 20.476562 17.978516 z M 27.476562 17.978516 A 1.50015 1.50015 0 0 0 26 19.5 L 26 34.5 A 1.50015 1.50015 0 1 0 29 34.5 L 29 19.5 A 1.50015 1.50015 0 0 0 27.476562 17.978516 z">
                </path>
              </svg>
              <svg fill="grey" class="column-drag-handle" width="14" height="14" role="img" focusable="false"
                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                <path
                  d="M 8.71436,10.42863 H 7.8571 V 3.571452 h 0.85726 c 0.11605,0 0.21657,-0.04241 0.30131,-0.127233 0.0847,-0.08482 0.12715,-0.18526 0.12715,-0.301315 0,-0.116055 -0.0422,-0.216493 -0.12731,-0.301397 L 7.30132,1.127233 C 7.21658,1.042411 7.11606,1 7,1 6.88395,1 6.78351,1.04241 6.69869,1.127233 L 4.98441,2.841507 c -0.0848,0.0849 -0.12723,0.185342 -0.12723,0.301397 0,0.116055 0.0424,0.216493 0.12723,0.301315 0.0849,0.08482 0.18535,0.127233 0.3014,0.127233 h 0.85718 v 6.857178 h -0.8571 c -0.11613,0 -0.21657,0.04241 -0.30139,0.127151 -0.0848,0.0849 -0.12724,0.185425 -0.12724,0.301397 0,0.116055 0.0424,0.216493 0.12724,0.301397 l 1.71427,1.714192 C 6.78357,12.957587 6.88403,13 7.00008,13 7.11614,13 7.21666,12.95759 7.3014,12.872767 l 1.71427,-1.714192 c 0.0847,-0.0849 0.12715,-0.185342 0.12715,-0.301397 0,-0.115972 -0.0424,-0.216493 -0.12715,-0.301397 C 8.93097,10.470961 8.83049,10.42863 8.71436,10.42863 z" />
              </svg>
            </div>

          </div>
          <Container v-if="column.name !== 'unselected'" group-name="col" @drop="(e) => onCardDrop(column.id, e)"
            @drag-start="(e) => log('drag start', e)" @drag-end="(e) => log('drag end', e)"
            :get-child-payload="getCardPayload(column.id)" drag-class="card-ghost" drop-class="card-ghost-drop"
            :drop-placeholder="dropPlaceholderOptions" drag-handle-selector=".column-drag-handle">
            <Draggable v-for="card in column.children" :key="card.id">
              <div :class="!column.isOpen ? 'open-close-animation' : ''">
                <div :class="card.props.className" :style="card.props.style">
                  <input class=" inputDoc" :class="!card.isReadOnly ? 'visibleInput' : ''" type="text"
                    v-model="card.data" :readonly="card.isReadOnly" @keyup.enter="editDoc(card)">



                  <div class="colors colorInDoc"
                    v-if="(card.data === 'Паспорт' || card.data === 'Трудовой договор') && card.isReadOnly"
                    style="display:flex;">
                    <div v-if="card.data === 'Паспорт'" class="color lblue"
                      style="margin-left: -60px;width:10px;height:10px;background: lightblue;border-radius: 50%;"></div>
                    <div v-if="card.data === 'Трудовой договор'" class="color blue"
                      style="width:10px;height:10px;background: blue;border-radius: 50%;">
                    </div>
                    <div v-if="card.data === 'Трудовой договор'" class="color gray"
                      style="width:10px;height:10px;background: lightgray; border-radius: 50%">
                    </div>
                  </div>
                  <p style="font-size:11px;color: red;position:absolute;font-weight:500px; left:120px; margin-top: 5px; font-family:'Fira Sans';"
                    v-if="(card.data === 'Паспорт' || card.data === 'ИНН') && card.isReadOnly">Обязательный</p>
                  <p v-if="card.isReadOnly"
                    style="font-size:11px;color: #8E9CBB;position:absolute;font-weight:400px; left:250px; margin-top: 5px; font-family:'Fira Sans';">
                    {{ card.description }}</p>


                  <div class="nav_item">
                    <svg style="margin-right: 10px;" @click="editDoc(card)" fill="gray"
                      xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 24 24">
                      <path
                        d="M 18.414062 2 C 18.158062 2 17.902031 2.0979687 17.707031 2.2929688 L 15.707031 4.2929688 L 14.292969 5.7070312 L 3 17 L 3 21 L 7 21 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.926094 2.0979687 18.670063 2 18.414062 2 z M 18.414062 4.4140625 L 19.585938 5.5859375 L 18.292969 6.8789062 L 17.121094 5.7070312 L 18.414062 4.4140625 z M 15.707031 7.1210938 L 16.878906 8.2929688 L 6.171875 19 L 5 19 L 5 17.828125 L 15.707031 7.1210938 z">
                      </path>
                    </svg>
                    <svg @click="removeDoc(card.id, column.name)" style="margin-right: 5px;" class="trash"
                      xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" fill="red"
                      viewBox="0 0 48 48">
                      <path
                        d="M 24 4 C 20.704135 4 18 6.7041348 18 10 L 11.746094 10 A 1.50015 1.50015 0 0 0 11.476562 9.9785156 A 1.50015 1.50015 0 0 0 11.259766 10 L 7.5 10 A 1.50015 1.50015 0 1 0 7.5 13 L 10 13 L 10 38.5 C 10 41.519774 12.480226 44 15.5 44 L 32.5 44 C 35.519774 44 38 41.519774 38 38.5 L 38 13 L 40.5 13 A 1.50015 1.50015 0 1 0 40.5 10 L 36.746094 10 A 1.50015 1.50015 0 0 0 36.259766 10 L 30 10 C 30 6.7041348 27.295865 4 24 4 z M 24 7 C 25.674135 7 27 8.3258652 27 10 L 21 10 C 21 8.3258652 22.325865 7 24 7 z M 13 13 L 35 13 L 35 38.5 C 35 39.898226 33.898226 41 32.5 41 L 15.5 41 C 14.101774 41 13 39.898226 13 38.5 L 13 13 z M 20.476562 17.978516 A 1.50015 1.50015 0 0 0 19 19.5 L 19 34.5 A 1.50015 1.50015 0 1 0 22 34.5 L 22 19.5 A 1.50015 1.50015 0 0 0 20.476562 17.978516 z M 27.476562 17.978516 A 1.50015 1.50015 0 0 0 26 19.5 L 26 34.5 A 1.50015 1.50015 0 1 0 29 34.5 L 29 19.5 A 1.50015 1.50015 0 0 0 27.476562 17.978516 z">
                      </path>
                    </svg>
                    <svg fill="grey" class="column-drag-handle" width="14" height="14" role="img" focusable="false"
                      aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                      <path
                        d="M 8.71436,10.42863 H 7.8571 V 3.571452 h 0.85726 c 0.11605,0 0.21657,-0.04241 0.30131,-0.127233 0.0847,-0.08482 0.12715,-0.18526 0.12715,-0.301315 0,-0.116055 -0.0422,-0.216493 -0.12731,-0.301397 L 7.30132,1.127233 C 7.21658,1.042411 7.11606,1 7,1 6.88395,1 6.78351,1.04241 6.69869,1.127233 L 4.98441,2.841507 c -0.0848,0.0849 -0.12723,0.185342 -0.12723,0.301397 0,0.116055 0.0424,0.216493 0.12723,0.301315 0.0849,0.08482 0.18535,0.127233 0.3014,0.127233 h 0.85718 v 6.857178 h -0.8571 c -0.11613,0 -0.21657,0.04241 -0.30139,0.127151 -0.0848,0.0849 -0.12724,0.185425 -0.12724,0.301397 0,0.116055 0.0424,0.216493 0.12724,0.301397 l 1.71427,1.714192 C 6.78357,12.957587 6.88403,13 7.00008,13 7.11614,13 7.21666,12.95759 7.3014,12.872767 l 1.71427,-1.714192 c 0.0847,-0.0849 0.12715,-0.185342 0.12715,-0.301397 0,-0.115972 -0.0424,-0.216493 -0.12715,-0.301397 C 8.93097,10.470961 8.83049,10.42863 8.71436,10.42863 z" />
                    </svg>
                  </div>
                </div>
              </div>
            </Draggable>
          </Container>
        </div>
      </Draggable>
    </Container>
    <!-- <hr v-if="scene.children.length > 1" style="margin-bottom:10px;width: 96%;"> -->
    <Container style="width: 96%;" group-name="col"
      @drop="(e) => onCardDrop(scene.children[scene.children.length - 1].id, e)"
      @drag-start="(e) => log('drag start', e)" @drag-end="(e) => log('drag end', e)"
      :get-child-payload="getCardPayload(scene.children[scene.children.length - 1].id)" drag-class="card-ghost"
      drop-class="card-ghost-drop" :drop-placeholder="dropPlaceholderOptions"
      drag-handle-selector=".column-drag-handle">
      <Draggable v-for="card in scene.children[scene.children.length - 1].children" :key="card.id">
        <div :class="card.props.className" :style="card.props.style">
          <input class=" inputDoc" :class="!card.isReadOnly ? 'visibleInput' : ''" type="text" v-model="card.data"
            :readonly="card.isReadOnly" @keyup.enter="editDoc(card)">
          <div class="colors colorInDoc"
            v-if="(card.data === 'Паспорт' || card.data === 'Трудовой договор') && card.isReadOnly"
            style="display:flex;">
            <div v-if="card.data === 'Паспорт'" class="color lblue"
              style="margin-left: -60px;width:10px;height:10px;background: lightblue;border-radius: 50%;"></div>
            <div v-if="card.data === 'Трудовой договор'" class="color blue"
              style="width:10px;height:10px;background: blue;border-radius: 50%;">
            </div>
            <div v-if="card.data === 'Трудовой договор'" class="color gray"
              style="width:10px;height:10px;background: lightgray;border-radius: 50%; ">
            </div>
          </div>
          <p style="font-size:11px;color: red;position:absolute;font-weight:500px; left:120px; margin-top: 5px; font-family:'Fira Sans';"
            v-if="(card.data === 'Паспорт' || card.data === 'ИНН') && card.isReadOnly">Обязательный</p>
          <p v-if="card.isReadOnly"
            style="font-size:11px;color: #8E9CBB;position:absolute;font-weight:400px; left:250px; margin-top: 5px; font-family:'Fira Sans';">
            {{ card.description }}</p>


          <div class="nav_item">
            <svg style="margin-right: 10px;" @click="editDoc(card)" fill="gray" xmlns="http://www.w3.org/2000/svg"
              x="0px" y="0px" width="14" height="14" viewBox="0 0 24 24">
              <path
                d="M 18.414062 2 C 18.158062 2 17.902031 2.0979687 17.707031 2.2929688 L 15.707031 4.2929688 L 14.292969 5.7070312 L 3 17 L 3 21 L 7 21 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.926094 2.0979687 18.670063 2 18.414062 2 z M 18.414062 4.4140625 L 19.585938 5.5859375 L 18.292969 6.8789062 L 17.121094 5.7070312 L 18.414062 4.4140625 z M 15.707031 7.1210938 L 16.878906 8.2929688 L 6.171875 19 L 5 19 L 5 17.828125 L 15.707031 7.1210938 z">
              </path>
            </svg>
            <svg @click="removeDoc(card.id, 'unselected')" style="margin-right: 5px;" class="trash"
              xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" fill="red" viewBox="0 0 48 48">
              <path
                d="M 24 4 C 20.704135 4 18 6.7041348 18 10 L 11.746094 10 A 1.50015 1.50015 0 0 0 11.476562 9.9785156 A 1.50015 1.50015 0 0 0 11.259766 10 L 7.5 10 A 1.50015 1.50015 0 1 0 7.5 13 L 10 13 L 10 38.5 C 10 41.519774 12.480226 44 15.5 44 L 32.5 44 C 35.519774 44 38 41.519774 38 38.5 L 38 13 L 40.5 13 A 1.50015 1.50015 0 1 0 40.5 10 L 36.746094 10 A 1.50015 1.50015 0 0 0 36.259766 10 L 30 10 C 30 6.7041348 27.295865 4 24 4 z M 24 7 C 25.674135 7 27 8.3258652 27 10 L 21 10 C 21 8.3258652 22.325865 7 24 7 z M 13 13 L 35 13 L 35 38.5 C 35 39.898226 33.898226 41 32.5 41 L 15.5 41 C 14.101774 41 13 39.898226 13 38.5 L 13 13 z M 20.476562 17.978516 A 1.50015 1.50015 0 0 0 19 19.5 L 19 34.5 A 1.50015 1.50015 0 1 0 22 34.5 L 22 19.5 A 1.50015 1.50015 0 0 0 20.476562 17.978516 z M 27.476562 17.978516 A 1.50015 1.50015 0 0 0 26 19.5 L 26 34.5 A 1.50015 1.50015 0 1 0 29 34.5 L 29 19.5 A 1.50015 1.50015 0 0 0 27.476562 17.978516 z">
              </path>
            </svg>
            <svg fill="grey" class="column-drag-handle" width="14" height="14" role="img" focusable="false"
              aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
              <path
                d="M 8.71436,10.42863 H 7.8571 V 3.571452 h 0.85726 c 0.11605,0 0.21657,-0.04241 0.30131,-0.127233 0.0847,-0.08482 0.12715,-0.18526 0.12715,-0.301315 0,-0.116055 -0.0422,-0.216493 -0.12731,-0.301397 L 7.30132,1.127233 C 7.21658,1.042411 7.11606,1 7,1 6.88395,1 6.78351,1.04241 6.69869,1.127233 L 4.98441,2.841507 c -0.0848,0.0849 -0.12723,0.185342 -0.12723,0.301397 0,0.116055 0.0424,0.216493 0.12723,0.301315 0.0849,0.08482 0.18535,0.127233 0.3014,0.127233 h 0.85718 v 6.857178 h -0.8571 c -0.11613,0 -0.21657,0.04241 -0.30139,0.127151 -0.0848,0.0849 -0.12724,0.185425 -0.12724,0.301397 0,0.116055 0.0424,0.216493 0.12724,0.301397 l 1.71427,1.714192 C 6.78357,12.957587 6.88403,13 7.00008,13 7.11614,13 7.21666,12.95759 7.3014,12.872767 l 1.71427,-1.714192 c 0.0847,-0.0849 0.12715,-0.185342 0.12715,-0.301397 0,-0.115972 -0.0424,-0.216493 -0.12715,-0.301397 C 8.93097,10.470961 8.83049,10.42863 8.71436,10.42863 z" />
            </svg>
          </div>
        </div>
      </Draggable>
    </Container>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
import { applyDrag, generateItems } from '../infra/helpers'
import { useSelectListStore, itemsStore } from "../store/state";
import { ref, computed } from 'vue';


export default {
  name: 'Cards',
  components: { Container, Draggable },
  setup() {
    const allNamesItems = itemsStore()
    const selectListStore = useSelectListStore();
    const selectList = computed(() => selectListStore.list);
    const columnNames = ref(selectList.value.reduce((container, obj) => [...container, ...Object.keys(obj)], []))
    const cards = ref(selectList.value.reduce((total, doc) => total = { ...total, ...doc }))
    const scene = ref({
      type: 'container',
      props: {
        orientation: 'horizontal'
      },
      children: generateItems(columnNames.value.length, i => ({
        id: `column${i}`,
        isOpen: i === 0 ? true : false,
        isReadOnly: true,
        type: 'container',
        name: columnNames.value[i],
        description: columnNames.value[i] === 'Обязательные для всех' ? 'Документы, обязательные для всех сотрудников без исключения' : columnNames.value[i] === 'Обязательные для трудоустройства' ? 'Документы, без которых невозможно трудоустройство человека на какую бы то ни было должность в компании вне зависимости от граж' : '',
        props: {
          orientation: 'vertical',
          className: 'card-container'
        },
        children: generateItems(cards.value[columnNames.value[i]].length, j => ({
          type: 'draggable',
          isReadOnly: true,
          description: cards.value[columnNames.value[i]][j].text === "Паспорт" || cards.value[columnNames.value[i]][j].text === "ИНН"
            ? 'Для всех'
            : cards.value[columnNames.value[i]][j].text === "Тестовое задание для кандидата"
              ? 'Россия, Белоруссия, Украина, администратор филиала, повар-сушист, повар-пиццмейкер, повар горячего цеха' : '',
          id: cards.value[columnNames.value[i]][j].id,
          isNeed: cards.value[columnNames.value[i]][j].id === 1 || cards.value[columnNames.value[i]][j].id === 2 ? 'Обязательный' : false,
          props: {
            className: 'card',
          },
          data: cards.value[columnNames.value[i]][j].text
        }))
      }))
    })



    for (let x = 0; x < scene.value.children.length; x++) {
      if (scene.value.children[x].name !== 'unselected')
        allNamesItems.push({ name: scene.value.children[x].name })
      for (let z = 0; z < scene.value.children[x].children.length; z++) {
        allNamesItems.push({ name: scene.value.children[x].children[z].data })
      }
    }

    function getAllNamesItems() {
      allNamesItems.clear()
      for (let x = 0; x < scene.value.children.length; x++) {
        if (scene.value.children[x].name !== 'unselected')
          allNamesItems.push({ name: scene.value.children[x].name })
        for (let z = 0; z < scene.value.children[x].children.length; z++) {
          allNamesItems.push({ name: scene.value.children[x].children[z].data })
        }
      }
    }
    function remove(i) {
      for (let z = 0; z < scene.value.children.length; z++) {
        if (scene.value.children[z].name === i) scene.value.children.splice(z, 1)
      }
      getAllNamesItems()
    }
    function removeDoc(i, el) {
      let index = 0
      for (let z = 0; z < scene.value.children.length; z++) {
        if (scene.value.children[z].name === el) index = z
      }
      for (let z = 0; z < scene.value.children[index].children.length; z++) {
        if (scene.value.children[index].children[z].id === i) scene.value.children[index].children.splice(z, 1)
      }
      getAllNamesItems()
    }

    function open(card) {
      card.isOpen = !card.isOpen
    }
    function editCat(category) {
      let saveBool = category.isReadOnly
      for (let item in scene.value.children) {
        scene.value.children[item].isReadOnly = true
        for (let child in scene.value.children[item].children) {
          scene.value.children[item].children[child].isReadOnly = true
        }
      }
      category.isReadOnly = !saveBool
      getAllNamesItems()
    }
    function editDoc(doc) {
      let saveBool = doc.isReadOnly
      for (let item in scene.value.children) {
        scene.value.children[item].isReadOnly = true
        for (let child in scene.value.children[item].children) {
          scene.value.children[item].children[child].isReadOnly = true
        }
      }
      doc.isReadOnly = !saveBool
      getAllNamesItems()
    }

    return {
      scene,
      columnNames,
      cards,
      remove,
      removeDoc,
      open,
      editCat,
      editDoc,
      allNamesItems,
    }
  },
  data() {
    return {

      upperDropPlaceholderOptions: {
        className: 'cards-drop-preview',
        animationDuration: '150',
        showOnTop: true
      },
      dropPlaceholderOptions: {
        className: 'drop-preview',
        animationDuration: '150',
        showOnTop: true
      }
    }
  },
  methods: {
    onColumnDrop(dropResult) {
      const scene = Object.assign({}, this.scene)
      scene.children = applyDrag(scene.children, dropResult)
      this.scene = scene
    },
    onCardDrop(columnId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const scene = Object.assign({}, this.scene)
        const column = scene.children.filter(p => p.id === columnId)[0]
        const columnIndex = scene.children.indexOf(column)
        const newColumn = Object.assign({}, column)
        newColumn.children = applyDrag(newColumn.children, dropResult)
        scene.children.splice(columnIndex, 1, newColumn)
        this.scene = scene
      }
    },
    getCardPayload(columnId) {
      return index => {
        return this.scene.children.filter(p => p.id === columnId)[0].children[index]
      }
    },
    dragStart() {
    },
    log(...params) {
    },
  },
}
</script>
<style scoped>
.description p {
  color: red;

}

.description {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 95%;
}

.inputDoc {

  font-family: 'Fira Sans';
  /* margin-left: 50px; */
  width: 35%;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 108%;
  border: none;
  outline: none;
}

.open-close-animation {
  display: none;
}

.visibleInput {
  background: rgba(101, 82, 82, 0.05);
  padding-left: 5px;
  transition: 0.2s;
}

.close_open {
  position: absolute;
  border: 1px solid lightgrey;
  padding: 7px;
  border-radius: 50%;
  transition: 0.1s;
}

h4 {
  padding-left: 50px;
}

.inputCategory {
  font-family: 'Fira Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 108%;
  margin-left: 50px;
  width: 50%;
  border: none;
  outline: none;
}

.nav_item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.draggable-item {
  height: 50px;
  line-height: 50px;
  text-align: center;
  display: block;
  background-color: #fff;
  outline: 0;
  border: 1px solid rgba(0, 0, 0, .125);
  margin-bottom: 2px;
  margin-top: 2px;
  cursor: default;
  user-select: none;
}

.draggable-item-horizontal {
  height: 300px;
  padding: 10px;
  line-height: 100px;
  text-align: center;
  /* width : 200px; */
  display: block;
  background-color: #fff;
  outline: 0;
  border: 1px solid rgba(0, 0, 0, .125);
  margin-right: 4px;
  cursor: default;
}

.dragging {
  background-color: yellow;
}

.card-scene {
  max-width: 1210px;
  min-width: 1205px;
  margin-left: 50px;
  /* background-color: #fff; */
}

.card-container {
  width: 95%;
  padding-left: 10px;
  margin: 2px;
  margin-right: 45px;
  padding-bottom: 2px;
  /* background-color: #f3f3f3; */
  /* box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24); */
}

.card {

  display: flex;
  justify-content: space-between;
  margin-left: 15px;
  /* border: 1px solid #ccc; */
  background-color: white;
  border: 1px solid lightgray;
  padding: 5px;
  padding-left: 10px;

}

.card-column-header {
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  white-space: nowrap;
  border: 1px solid lightgray;
  padding: 10px;
}

.column-drag-handle {
  cursor: move;
  padding: 5px;
}

.card-ghost {
  transition: transform 0.18s ease;

}

.card-ghost-drop {
  transition: transform 0.18s ease-in-out;
  transform: rotateZ(0deg)
}

.opacity-ghost {
  transition: all .18s ease;
  opacity: 0.8;
  /* transform: rotateZ(5deg); */
  background-color: cornflowerblue;
  box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.3);
}

.active {
  transform: rotateZ(180deg)
}

.opacity-ghost-drop {
  opacity: 1;
  /* transform: rotateZ(0deg); */
  background-color: white;
  box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.0);
}


.form-demo {
  width: 650px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  display: flex
}

.form {
  flex: 3;
  /* width: 500px; */
  /* background-color: #f3f3f3; */
  border: 1px solid rgba(0, 0, 0, .125);
  border-radius: 6px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.08), 0px 3px 3px rgba(0, 0, 0, 0.08);
}

.form-fields-panel {
  flex: 1;
  margin-right: 50px;
}


.form-ghost {
  transition: 0.18s ease;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.08);
}

.form-ghost-drop {
  box-shadow: 0 0 2px 5px rgba(0, 0, 0, 0.0);
}

.drop-preview {
  background-color: rgba(150, 150, 200, 0.1);
  border: 1px dashed #abc;
  margin: 5px;
}

.cards-drop-preview {
  background-color: rgba(150, 150, 200, 0.1);
  border: 1px dashed #abc;
  margin: 5px 45px 5px 5px;
}

.activeDrag {
  height: 65px;
}

.color {
  margin: 0 3px;
}

.colorInDoc {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border: 1px solid black; */
  position: absolute;
  margin-left: -100px;
  height: 25px;
}


.colors {
  /* margin-top: 6px; */
  position: absolute;
  left: 250px;
}
</style>