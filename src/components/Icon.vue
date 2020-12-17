<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="`#${iconName}`" />
  </svg>
</template>

<script>
export default {
  name: "Icon",
  props: {
    iconName: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.icon {
  width: 16px;
  height: 16px;
  vertical-align: -0.15em;
  fill: currentColor !important;
  overflow: hidden;
}
</style>
