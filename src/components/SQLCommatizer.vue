<template>
  <div>
    <v-checkbox label="For strings (add single quotes)" v-model="processStrings"></v-checkbox>
    <v-checkbox label="Use leading commas" v-model="useLeadingCommas"></v-checkbox>

    <p>Input</p>
    <v-textarea v-model="input"></v-textarea>
    <v-btn @click="addCommas">Add commas</v-btn>
    <p>Output</p>
    <v-textarea :value="output"></v-textarea>
  </div>
</template>

<script>
export default {
  name: "SQLCommatizer",
  data: function() {
    return {
      input: null,
      output: null,
      useLeadingCommas: false,
      processStrings: false,
    }
  },
  methods: {
    addCommas: function() {
      if (this.input === "" || this.input === null || this.input === undefined) {
        return
      }
      let records = this.input.split("\n")
      if (this.processStrings) {
        records = records.map(x => `'${x.replaceAll("'", "''")}'`)
      }
      if (!this.useLeadingCommas) {
        this.output = records.join(",\n")
        return
      }

      if (records.length === 1) {
        this.output = records[0]
      }

      records = records.slice(0, 1).concat(records.slice(1).map(x => `,${x}`))
      this.output = records.join("\n")
    },
  }
}
</script>

<style scoped>

</style>