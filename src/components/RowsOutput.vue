<template>
  <div>
    <wired-textarea rows="10" columns="50" :value="output"></wired-textarea>
    <p>Processed records: {{ output }}</p>
  </div>
</template>

<script>
import "wired-elements";
import {W} from "vue-wired-elements"
export default {
  name: 'RowsOutput',
  props: ['output']
}
</script>
