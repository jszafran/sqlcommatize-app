<template>
  <div class="main">
    <wired-card elevation="5">
      <h1>SQL Commatizer</h1>
    </wired-card>
    <form @submit.prevent="addCommas">
    <div class="controls">
      <div>
        <wired-checkbox id="processStringsCheckbox">For strings (add single quotes)</wired-checkbox>
      </div>
      <div>
        <wired-checkbox id="useLeadingCommasCheckbox">Use leading commas</wired-checkbox>
      </div>
    </div>
      <p>Input</p>
      <wired-textarea placeholder="Paste data here" rows="10" columns="50" ref="input"></wired-textarea>
      <br>
      <p>Output</p>
      <RowsOutput :output="output"></RowsOutput>
      <br>
      <button>Add commas</button>
    </form>

  </div>
</template>

<script>
import "wired-elements";
import RowsOutput from "@/components/RowsOutput";

export default {
  name: 'App',
  components: {RowsOutput,},
  data: function() {
    return {
      output: null,
    }
  },
  methods: {
    addCommas: function() {
      const input = this.$refs.input.value
      const processStrings = document.getElementById("processStringsCheckbox").checked
      const useLeadingCommas = document.getElementById("useLeadingCommasCheckbox").checked
      if (input === "" || input === null || input.replaceAll(" ", "") === "") {
        return
      }

      let records = input.split("\n")

      if (processStrings) {
        records = records.map(x => `'${x.replaceAll("'", "''")}'`)
      }

      if (!useLeadingCommas) {
        this.output = records.join(",\n")
        console.log(this.output)
        return
      }

      if (records.length === 1) {
        this.output = records[0]
      }

      const res = records
          .slice(0, 1)
          .map(x => ` ${x}`)
          .concat(records.slice(1).map(x => `,${x}`))
          .join("\n")
      console.log(res)
      this.output = res
    },
  }
};
</script>

<style>
.main {
  font-family: "Gloria Hallelujah", cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.controls {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>