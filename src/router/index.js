import { createRouter, createWebHistory } from "vue-router";
import FormView from "../views/FormView.vue";
import FormEntriesView from "../views/FormEntriesView.vue";

const routes = [
  {
    path: "/",
    name: "form",
    component: FormView,
  },
  {
    path: "/formEntries",
    name: "All Entries",
    component: FormEntriesView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
