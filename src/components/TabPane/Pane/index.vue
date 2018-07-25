<template>
  <div class="pane" v-show="show">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'pane',
  props: {
    label: {
      type: String
    },
    name: {
      type: String
    }
  },
  data() {
    return {
      show: false
    }
  },
  mounted() {
    this.updateParent()
  },
  methods: {
    updateParent() {
      this.$parent.updateNav()
    }
  },
  watch: {
    label() {
      this.updateParent()
    }
  }
}
</script>
