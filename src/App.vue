<template>
  <div>
    <section class="hero is-info is-small">
      <div class="hero-body">
        <p class="title">
          SQLCommatize
        </p>
        <p class="subtitle">
          Simple online tool that add commas (and optionally single quotes) to given input - so it can be later used within SQL IN clause.<br> Supports leading/trailing comma styling.
        </p>
      </div>
    </section>
    <section class="section is-centered">
      <div class="container">
        <b-field>
          <b-switch v-model="processStrings" type="is-info">
            For strings (add single quotes)
          </b-switch>
        </b-field>
        <b-field>
          <b-switch v-model="useLeadingCommas" type="is-info">
            Use leading commas
          </b-switch>
        </b-field>
        <b-field>
          <b-input type="textarea"
                   size="is-medium"
                   placeholder="Paste your rows here"
                   v-model="input"
          >

          </b-input>
        </b-field>
        <b-field>
          <b-button type="is-info" expanded @click="addCommas">Add commas</b-button>
        </b-field>
        <b-field>
          <b-input type="textarea"
                   size="is-medium"
                   placeholder="Output"
                   v-model="output"
          >

          </b-input>
        </b-field>
      </div>

    </section>
  </div>

</template>

<script>
import "wired-elements";

export default {
  name: 'App',
  data: function() {
    return {
      processStrings: false,
      useLeadingCommas: false,
      input: null,
      output: null,
    }
  },
  methods: {
    addCommas: function() {
      const input = this.input
      const processStrings = this.processStrings
      const useLeadingCommas = this.useLeadingCommas
      if (input === "" || input === null || input.replaceAll(" ", "") === "") {
        return
      }

      let records = input.split("\n")

      if (processStrings) {
        records = records.map(x => `'${x.replaceAll("'", "''")}'`)
      }

      if (!useLeadingCommas) {
        this.output = records.join(",\n")
        return
      }

      if (records.length === 1) {
        this.output = records[0]
      }

      this.output = records
          .slice(0, 1)
          .map(x => ` ${x}`)
          .concat(records.slice(1).map(x => `,${x}`))
          .join("\n")
    },
  }
};
</script>

<style>
/*#app {*/
/*  margin-top: 50px;*/
/*}*/
</style>