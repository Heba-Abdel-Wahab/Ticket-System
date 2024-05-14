<template>
  <h1 class="font-sans text-2xl">
    {{ text }}
  </h1>
</template>

<script>
export default {
  name: "customHeadline",
  props: {
    text: { type: String, required: true },
  },
};
</script>
