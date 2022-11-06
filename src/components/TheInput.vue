<template>
    <div class="autocomplete">
        <div class="input" style="margin-bottom:20px">
            <svg class="glass" fill="gray" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14"
                viewBox="0 0 30 30">
                <path
                    d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z">
                </path>
            </svg>
            <input v-model="query" placeholder="Поиск" type="text">
            <span class="multiply" v-if="query" @click="query = ''">&#10006</span>
            <div class="options" v-show="visible">
                <ul>
                    <li v-for="( match, index ) in matches" :key="match[filterby]"
                        :class="{ 'selected': (selected == index) }" @click="itemClicked(index,match[filterby])"
                        v-text="match[filterby]">
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['items', 'filterby'],
    data() {
        return {
            selectedItem: null,
            query: '',
            visible: false,
            selected: 0,
        }
    },
    methods: {
        toggleVisible() {
            this.visible = !this.visible
        },
        itemClicked(index, match) {
            this.selected = index;
            this.query = match;
            this.selectItem();
        },
        selectItem() {
            this.selectedItem = this.matches[this.selected]
            this.visible = false
            // this.query = ''
        }
    },
    computed: {
        matches() {
            if (this.query == '') {
                this.visible = false
                return []
            }
            this.visible = true
            return this.items.filter((item) => item[this.filterby].toLowerCase().includes(this.query.toLowerCase()))
        }
    }
}
</script>

<style scoped>
* {
    font-family: "Fira Sans";
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
    font-family: 'Fira Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 108%;
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

.options {
    position: absolute;
    width: 100%;
    top: 40px;
    max-height: 150px;
    overflow-y: scroll;
    margin-top: 5px;
    z-index: 2;
}

.options ul {
    margin: 0;
    /* background: rgba(255, 255, 255, 0.2); */
    list-style-type: none;
    text-align: left;
    padding-left: 0;
}

.options ul li {
    border-bottom: 1px solid lightgray;
    padding: 10px;
    cursor: pointer;
    background: #f1f1f1;
}

.options ul li:hover {
    background: lightgrey;
    /* color: #fff; */
    font-weight: 500;
}
</style>