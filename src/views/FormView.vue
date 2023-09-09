<template>
  <div class="home">
    <h1>Enter your details</h1>
    <v-form v-on:submit="submitForm" v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="name"
              label="Name"
              required
              :rules="NameRules"
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="college"
              label="College"
              required
              :rules="CollegeRules"
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="year"
              label="Year"
              required
              :items="items"
              :rules="[(v) => !!v || 'Item is required']"
            />
          </v-col>
        </v-row>
        <v-btn type="submit" variant="elevated">Submit</v-btn>
      </v-container>
    </v-form>
  </div>

  <div class="text-center ma-2">
    <v-sanckbar v-if="snackbar">
      {{ snackbarText }}
      <v-btn color="blue" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </v-sanckbar>
  </div>
</template>

<script>
import { API } from "aws-amplify";

export default {
  data() {
    return {
      name: "",
      college: "",
      year: undefined,
      items: [1, 2, 3, 4],
      NameRules: [
        (value) => {
          if (value?.length == 0) return "Name is required.";
          if (/[^0-9]/.test(value)) return true;
          return "Name can not contain digits.";
        },
      ],
      CollegeRules: [
        (value) => {
          if (value?.length == 0) return "College is required.";
          return true;
        },
      ],
      snackbar: false,
      snackbarText: "",
      snackbarTimeout: 1500,
    };
  },
  methods: {
    async submitForm(e) {
      e.preventDefault();
      if (
        this.name.length == 0 ||
        this.college.length == 0 ||
        this.year == undefined
      ) {
        return;
      }
      try {
        await API.post("formsapi", "/forms", {
          body: {
            name: this.name,
            college: this.college,
            year: this.year,
          },
        });
        this.snackbar = true;
        this.snackbarText = "Form sucessfully filled";
        this.name = "";
        this.college = "";
        this.year = undefined;
      } catch (err) {
        this.snackbar = true;
        this.snackbarText = "Error";
        console.log(err);
      }
    },
  },
};
</script>

<style>
.home {
  margin: 50px;
}
</style>
