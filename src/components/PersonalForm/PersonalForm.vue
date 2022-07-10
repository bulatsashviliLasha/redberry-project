<script>
    import ErrorSnack from "../Errors/ErrorSnack.vue";
    export default {
    props: {
        active: Number,
    },
    emits: ["setActive"],
    data() {
        return {
            personalData: {
                name: String,
                email: String,
                phone: String,
                date_of_birth: String
            },
            errors: {
                name: {
                    valid: false,
                    title: "Invalid name",
                    description: "Please enter valid name"
                },
                email: {
                    valid: false,
                    title: "Invalid email",
                    description: "Please enter valid email"
                },
                phone: {
                    valid: false,
                    title: "Invalid phone number",
                    description: "Please enter valid phone number"
                },
                date_of_birth: {
                    valid: false,
                    title: "Invalid date entered",
                    description: "Please enter valid date"
                }
            },
            storageData: {
                name: "",
                email: "",
                phone: "",
                date_of_birth: ""
            },
            errData: []
        };
    },
    methods: {
        // styling methods
        handleBlur(e) {
            if (e.target.value.length > 0) {
                e.target.classList.add("active");
            }
            else {
                e.target.classList.remove("active");
            }
        },
        transform() {
            const ref = this.$refs.birthInput;
            ref.type = "date";

            ref.classList.remove("valid");
        },

        // input validations
        validateName(e) {
            this.storageData.name = e.value;
            sessionStorage.setItem("KC-personalInfo", JSON.stringify(this.storageData));

            const nameRegex = /^[a-z ,.'-]+$/i;
            if (e.value.length > 2 && nameRegex.test(e.value)) {
                this.errors.name.valid = true;
                this.personalData.name = e.value;
                e.classList.add("valid");
                e.classList.remove("error");
            }
            else {
                this.errors.name.valid = false;
                e.classList.add("error");
                e.classList.remove("valid");
            }
        },
        validateMail(e) {
            this.storageData.email = e.value;
            sessionStorage.setItem("KC-personalInfo", JSON.stringify(this.storageData));

            const rbRegex = /^[a-z0-9](\.?[a-z0-9]){2,}@redberry\.ge$/i;
            if (rbRegex.test(e.value)) {
                this.errors.email.valid = true;
                this.personalData.email = e.value;
                e.classList.add("valid");
                e.classList.remove("error");
            }
            else {
                this.errors.email.valid = false;
                e.classList.add("error");
                e.classList.remove("valid");
            }
        },
        validatePN(e) {
            this.storageData.phone = e.value;
            sessionStorage.setItem("KC-personalInfo", JSON.stringify(this.storageData));

            if (e.value[0] === "5" && e.value.length == 9) {
                this.errors.phone.valid = true;
                this.personalData.phone = e.value;
                e.classList.add("valid");
                e.classList.remove("error");
            }
            else {
                this.errors.phone.valid = false;
                e.classList.add("error");
                e.classList.remove("valid");
            }
        },
        validateDate(e) {
            this.storageData.date_of_birth = e.value;
            sessionStorage.setItem("KC-personalInfo", JSON.stringify(this.storageData));

            const year = new Date().getFullYear();

            const date = e.value.split("-");
            if (e.value !== "" && parseInt(date[0]) < year && parseInt(date[0]) > 1800) {

                this.errors.date_of_birth.valid = true;
                const parsedDate = [date[1], date[2], date[0]];
                this.personalData.date_of_birth = parsedDate.join("/");

                e.classList.add("valid");
                e.classList.remove("error");
            } else {
                this.errors.date_of_birth.valid = false;
                e.classList.add("error");
                e.classList.remove("valid");
            }
        },

        // main validation methods
        validateWrapper() {
            this.validateName(this.$refs.textInput);
            this.validateMail(this.$refs.emailInput);
            this.validatePN(this.$refs.pnInput);
            this.validateDate(this.$refs.birthInput);
        },
        validate() {
            this.validateWrapper();
            this.errData = [];
            Object.values(this.errors).forEach((e) => {
                if (e.valid === false) {
                    this.errData.push({title: e.title, description: e.description});
                }
            });
            if(this.errData.length === 0) {
                this.$router.push("/chessForm");
            }
        },
    },
    mounted: function () {
        if(sessionStorage.getItem("KC-personalInfo")) {
            this.storageData = JSON.parse(sessionStorage.getItem("KC-personalInfo"));
        }
    },
    components: { ErrorSnack }
}
</script>

<template>
    <div class="errorsWrapper">
        <ErrorSnack v-for="i in errData" :key="i" :title=i.title :description=i.description />
    </div>
    <form>
        <input @click="$emit('setActive', 1)" @blur="handleBlur($event); validateName(this.$refs.textInput)" ref="textInput" type="text" name="name" id="userName" placeholder="Name *" :value="storageData.name ? storageData.name : ''">
        <input @click="$emit('setActive', 1)" @blur="handleBlur($event); validateMail(this.$refs.emailInput)" ref="emailInput" type="email" name="email" id="userAddress" placeholder="Email address *" :value="storageData.email ? storageData.email : ''">
        <input @click="$emit('setActive', 1)" @blur="handleBlur($event); validatePN(this.$refs.pnInput)" ref="pnInput" name="number" id="userPN" placeholder="Phone number *" :value="storageData.phone ? storageData.phone : ''">
        <input @click="$emit('setActive', 1); transform()" @blur="handleBlur($event); validateDate(this.$refs.birthInput)" ref="birthInput" type="text" name="date" id="userDate" placeholder="Date of birth *" :value="storageData.date_of_birth ? storageData.date_of_birth : ''">
    </form>
    <div class="navButtonWrapper">
        <button class="backBtn" @click="$router.go(-1)">Back</button>
        <button class="nextBtn" @click.prevent="validate()">Next</button>
    </div>
</template>

<style>
    @import url(./PersonalForm.css);
</style>