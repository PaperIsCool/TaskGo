<template>
  <div class="checkbox-wrapper-31">
    <input type="checkbox" :checked="checked" @change="toggleCheck"/>
    <svg viewBox="0 0 35.6 35.6">
      <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
      <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
      <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'CustomCheckbox',
  props: {
    checked: Boolean
  },
  methods: {
    toggleCheck(event) {
      if (!this.checked) {
        this.$emit('change', true);
      } else {
        event.target.checked = true;
      }
    }
  }
};
</script>

<style>
.checkbox-wrapper-31:hover .check {
  stroke-dashoffset: 0;
}

.checkbox-wrapper-31 {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.checkbox-wrapper-31 .background {
  fill: #ccc;
  transition: ease all 0.6s;
  -webkit-transition: ease all 0.6s;
}
.checkbox-wrapper-31 .stroke {
  fill: none;
  stroke: #fff;
  stroke-miterlimit: 10;
  stroke-width: 2px;
  stroke-dashoffset: 100;
  stroke-dasharray: 100;
  transition: ease all 0.6s;
  -webkit-transition: ease all 0.6s;
}
.checkbox-wrapper-31 .check {
  fill: none;
  stroke: #fff;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2px;
  stroke-dashoffset: 22;
  stroke-dasharray: 22;
  transition: ease all 0.6s;
  -webkit-transition: ease all 0.6s;
}
.checkbox-wrapper-31 input[type=checkbox] {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  margin: 0;
  opacity: 0;
  -appearance: none;
  -webkit-appearance: none;
}
.checkbox-wrapper-31 input[type=checkbox]:hover {
  cursor: pointer;
}
.checkbox-wrapper-31 input[type=checkbox]:checked + svg .background {
  fill: #6cbe45;
}
.checkbox-wrapper-31 input[type=checkbox]:checked + svg .stroke {
  stroke-dashoffset: 0;
}
.checkbox-wrapper-31 input[type=checkbox]:checked + svg .check {
  stroke-dashoffset: 0;
}
</style>
