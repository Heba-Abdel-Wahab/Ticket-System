<template>
  <button
    class="px-4 py-1 text-sm text-lime-600 font-semibold rounded-full border border-lime-200 hover:text-white hover:bg-lime-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600 focus:ring-offset-2"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "customButton",
  props: {
    text: { type: String, required: true },
  },
};
</script>
