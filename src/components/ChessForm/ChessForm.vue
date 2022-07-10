<script>
    import axios from 'axios';
    import ErrorSnack from "@/components/Errors/ErrorSnack.vue";
    export default {
        components: { ErrorSnack },
        props: {
            active: Number,
        },
        emits: ["setActive"],
        data() {
            return {
                errors: {
                    experience_level: {
                        valid: false,
                        title: "Knowledge level required",
                        description: "Please select your knowledge level"
                    },
                    character_id: {
                        valid: false,
                        title: "Grandmaster not chosen",
                        description: "Please choose the desired grandmaster"
                    },
                    already_participated: {
                        valid: false,
                        title: "Participation status required",
                        description: "Please select whether you've participated in the Championship or not"
                    }
                },
                errData: [],
                options: {
                    0: { value: 'beginner', option: 'Beginner' }, 
                    1: { value: 'normal', option: 'Intermediate' }, 
                    2: { value: 'professional', option: 'Professional' }
                },
                grandmastersData: [],
                storageData: {
                    experience_level: "",
                    character_id: "",
                    already_participated: "",
                    character_name: "",
                    experience_name: ""
                },
            };
        },
        methods: {
            handleDropDown() {
                this.$refs.gmWrapper.classList.remove("active");
                this.$refs.dropDownIconGM.classList.remove("open");

                this.$refs.optionsWrapper.classList.toggle("active");
                this.$refs.dropDownIcon.classList.toggle("open");
            },
            handleDropDownGM() {
                this.$refs.optionsWrapper.classList.remove("active");
                this.$refs.dropDownIcon.classList.remove("open");

                this.$refs.gmWrapper.classList.toggle("active");
                this.$refs.dropDownIconGM.classList.toggle("open");
            },
            handleSelect(val, name) {
                this.storageData.experience_level = val;
                this.storageData.experience_name = name;
                sessionStorage.setItem("KC-chessInfo", JSON.stringify(this.storageData));

                this.errors.experience_level.valid = true;

                this.$refs.select.innerText = name;
                this.$refs.optionsWrapper.classList.remove("active");
                this.$refs.dropDownIcon.classList.remove("open");
            },
            handleGM(val, id) {
                this.storageData.character_id = id;
                this.storageData.character_name = val;
                sessionStorage.setItem("KC-chessInfo", JSON.stringify(this.storageData));

                this.errors.character_id.valid = true;

                this.$refs.selectGM.innerText = val;
                this.$refs.gmWrapper.classList.remove("active");
                this.$refs.dropDownIconGM.classList.remove("open");
            },
            handleRadio(e) {
                this.errors.already_participated.valid = true;
                let setbool = (e.target.value === "true");
                this.storageData.already_participated = setbool;
                sessionStorage.setItem("KC-chessInfo", JSON.stringify(this.storageData));
            },

            // validation methods
            validateErrors() {
                Object.entries(this.storageData).forEach(e => {
                    if(e[0] !== "character_name" && e[0] !== "experience_name") {
                        if(e[1] !== "") {
                            const key = e[0];
                            this.errors[key].valid = true;
                        }
                    }
                });
            },
            validateForms() {
                let formDone;
                if (JSON.parse(sessionStorage.getItem("KC-personalInfo")) !== null) {
                    const personalFormObject = JSON.parse(sessionStorage.getItem("KC-personalInfo"));
                    Object.values(personalFormObject).forEach(e => {
                        if(e !== "") {
                            formDone = true;
                        } else {
                            formDone = false;
                        }
                    }); 
                } else {
                    formDone = false;
                }
                return formDone;
            },
            validate() {
                this.validateErrors();
                const formDone = this.validateForms();
                
                if (!formDone) {
                    this.$router.push("/personalForm");
                } else {
                    let count = 0;
                    Object.values(this.storageData).forEach(e => {
                        if(e !== "") {
                            count++;
                        }
                    });

                    this.errData = [];

                    Object.values(this.errors).forEach((e) => {
                        if (e.valid === false) {
                            this.errData.push({title: e.title, description: e.description});
                        }
                    });

                    if(this.errData.length === 0 || count === 5) {
                        this.storageData = JSON.parse(sessionStorage.getItem("KC-chessInfo"));
                        this.$router.push("/complete");
                    }
                }
            },
        },
        beforeMount: async function() {
            const res = await axios.get(`https://chess-tournament-api.devtest.ge/api/grandmasters`);
            const data = await res.data;
            this.grandmastersData = await data;
        },
        mounted: function() {
            if(sessionStorage.getItem("KC-chessInfo")) {
                this.storageData = JSON.parse(sessionStorage.getItem("KC-chessInfo"));
            }
        }
    }
</script>

<template>
    <div class="errorsWrapper">
        <ErrorSnack v-for="i in errData" :key="i" :title=i.title :description=i.description />
    </div>
    <form class="chessForm">
        <div class="selectParent" id="select0">
            <div class="selectWrapper" @click="handleDropDown(), $emit('setActive', 2)">
                <p v-if="storageData.experience_name" ref="select">{{ storageData.experience_name }}</p>
                <p v-else ref="select">level of knowledge <span>*</span></p>
              <svg ref="dropDownIcon" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.646894 7.35401C0.600331 7.30756 0.563388 7.25239 0.538181 7.19164C0.512975 7.1309 0.5 7.06577 0.5 7.00001C0.5 6.93424 0.512975 6.86912 0.538181 6.80837C0.563388 6.74763 0.600331 6.69245 0.646894 6.64601L6.64689 0.646007C6.69334 0.599443 6.74852 0.562501 6.80926 0.537294C6.87001 0.512088 6.93513 0.499113 7.00089 0.499113C7.06666 0.499113 7.13178 0.512088 7.19253 0.537294C7.25327 0.562501 7.30845 0.599443 7.35489 0.646007L13.3549 6.64601C13.4488 6.73989 13.5015 6.86723 13.5015 7.00001C13.5015 7.13278 13.4488 7.26012 13.3549 7.35401C13.261 7.44789 13.1337 7.50064 13.0009 7.50064C12.8681 7.50064 12.7408 7.44789 12.6469 7.35401L7.00089 1.70701L1.35489 7.35401C1.30845 7.40057 1.25327 7.43751 1.19253 7.46272C1.13178 7.48793 1.06666 7.5009 1.00089 7.5009C0.935127 7.5009 0.870005 7.48793 0.80926 7.46272C0.748515 7.43751 0.69334 7.40057 0.646894 7.35401Z" fill="#212529"/>
              </svg>
            </div>
            <div ref="optionsWrapper" class="optionsWrapper hidden">
                <p @click="handleSelect(i.value, i.option)" v-for="i in options" :key="i">{{ i.option }}</p>
            </div>
        </div>
        <div class="selectParent" id="select1">
            <div class="selectWrapper" @click="handleDropDownGM(), $emit('setActive', 2)">
                <p v-if="storageData.character_name" ref="selectGM">{{ storageData.character_name }}</p>
                <p v-else ref="selectGM">Choose your character <span>*</span></p>
              <svg ref="dropDownIconGM" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.646894 7.35401C0.600331 7.30756 0.563388 7.25239 0.538181 7.19164C0.512975 7.1309 0.5 7.06577 0.5 7.00001C0.5 6.93424 0.512975 6.86912 0.538181 6.80837C0.563388 6.74763 0.600331 6.69245 0.646894 6.64601L6.64689 0.646007C6.69334 0.599443 6.74852 0.562501 6.80926 0.537294C6.87001 0.512088 6.93513 0.499113 7.00089 0.499113C7.06666 0.499113 7.13178 0.512088 7.19253 0.537294C7.25327 0.562501 7.30845 0.599443 7.35489 0.646007L13.3549 6.64601C13.4488 6.73989 13.5015 6.86723 13.5015 7.00001C13.5015 7.13278 13.4488 7.26012 13.3549 7.35401C13.261 7.44789 13.1337 7.50064 13.0009 7.50064C12.8681 7.50064 12.7408 7.44789 12.6469 7.35401L7.00089 1.70701L1.35489 7.35401C1.30845 7.40057 1.25327 7.43751 1.19253 7.46272C1.13178 7.48793 1.06666 7.5009 1.00089 7.5009C0.935127 7.5009 0.870005 7.48793 0.80926 7.46272C0.748515 7.43751 0.69334 7.40057 0.646894 7.35401Z" fill="#212529"/>
              </svg>
            </div>
            <div ref="gmWrapper" class="gmWrapper hidden">
                <span>(Total {{ grandmastersData.length }})</span>
                <div v-for="i in grandmastersData" :key="i" class="gmParent" @click="handleGM(i.name, i.id)">
                    <div class="gmBar">
                        <p>{{ i.name }}</p>
                        <div class="gmPicture">
                            <img :src="`https://chess-tournament-api.devtest.ge` + i.image" alt="chess grandmaster picture">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="selectParent radio" id="select2">
            <p class="radioHeader">Have you participated in the Redberry Championship? <span>*</span></p>
            <div class="radioParent">
                <div class="radioWrapper" @click="$emit('setActive', 2)">
                    <input :checked="storageData.already_participated === true" type="radio" name="radiobtn" value="true" @click="handleRadio($event)">
                    <label for="true">Yes</label>
                </div>
                <div class="radioWrapper" @click="$emit('setActive', 2)">
                    <input :checked="storageData.already_participated === false" type="radio" name="radiobtn" value="false" @click="handleRadio($event)">
                    <label for="false">No</label>
                </div>
            </div>
        </div>
    </form>
    <div class="navButtonWrapper">
        <button class="backBtn" @click="$router.go(-1)">Back</button>
        <button class="nextBtn" @click.prevent="validate()">Done</button>
    </div>
</template>

<style>
    @import url(./ChessForm.css);
</style>