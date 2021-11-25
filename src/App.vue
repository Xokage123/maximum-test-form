<template>
  <router-view />
</template>

<script lang="ts">
import { Vueform, useVueform } from "vueform";
import { ref, computed, markRaw } from "vue";

import { defineComponent } from "vue";
export default defineComponent({
  mixins: [Vueform],
  setup(props, context) {
    const vueform = useVueform(props, context);

    const el$ = vueform.el$;
  },
});
</script>
