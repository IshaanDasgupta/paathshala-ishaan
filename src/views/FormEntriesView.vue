<template>
  <div>
    <h1>All form entries :</h1>
    <div class="table">
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">College</th>
            <th class="text-left">Year</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in formEntries" :key="entry.name">
            <td class="text-left">{{ entry.name }}</td>
            <td class="text-left">{{ entry.college }}</td>
            <td class="text-left">{{ entry.year }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>
<script>
import { API } from "aws-amplify";

export default {
  methods: {
    async getAllForms() {
      try {
        const res = await API.get("formsapi", "/forms/name");
        this.formEntries = res.Items;
      } catch (err) {
        console.log(err);
      }
    },
  },
  data() {
    return {
      formEntries: [],
    };
  },
  mounted() {
    this.getAllForms();
  },
};
</script>

<style>
.table {
  margin: 50px;
}
</style>
