<template>
  <div class="main">
    <form @submit.prevent="addCommas">
      <input type="checkbox" id="process-strings" name="process-strings" v-model="processStrings">
      <label for="process-strings">For strings (add single quotes)</label><br>
      <input type="checkbox" id="leading-commas" name="leading-commas" v-model="useLeadingCommas">
      <label for="leading-commas">Use leading commas</label><br>
      <br>
      <p>Input</p>
      <textarea rows="10" cols="50" v-model="input"></textarea>
      <br><br>
      <p>Output</p>
      <textarea rows="10" cols="50" v-model="output"></textarea>
      <button>Add commas</button>
    </form>

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
      if (this.input === "" || this.input === null || this.input.replaceAll(" ", "") === "") {
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

      this.output = records
          .slice(0, 1)
          .concat(records.slice(1).map(x => `,${x}`))
          .join("\n")
    },
  }
}
</script>

<style scoped>
.main {
  margin-top: 100px;
  margin-left: 100px;

}
</style>