<template>
  <div class="Introduction">
    <li></li>
    <h1>{{ msg }}</h1>
    <h3>What's an Approval Poll?</h3>
    <ul>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
          target="_blank"
          rel="noopener"
          >babel</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router"
          target="_blank"
          rel="noopener"
          >router</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
          target="_blank"
          rel="noopener"
          >eslint</a
        >
      </li>
    </ul>
    <h3>Why are Approval Ratings Important?</h3>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank" rel="noopener"
          >Forum</a
        >
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank" rel="noopener"
          >Community Chat</a
        >
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank" rel="noopener"
          >Twitter</a
        >
      </li>
      <li>
        <a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a>
      </li>
    </ul>
    <h3>History of Public Opinion Polling</h3>
    <ul>
      <p>
        Presidential job approval ratings were first conducted by George H.
        Gallup, in the 1930s, to gauge public support for the president of the
        U.S. during their term.
      </p>
      <li></li>
      <p>
        It all started under Franklin D. Roosevelt's presidency, when Gallup
        conducted polling to see how the American population felt about the New
        Deal programs. Results showed that only 60% of Americans supported those
        programs, since confidence in the economy was high.
      </p>
      <li></li>
      <p>
        It did not start off as political poll, but rather a way to shape social
        reform. Afterwards, it was used commercially and eventually
        politicially.
      </p>
    </ul>
    <h3>Why Are Gallup's Polls Widely Used?</h3>
    <ul>
      <p>
        Literary Digest was the first polling company to conduct a nationwide
        sampling of public opinion. They accurately called the 1920, 1924, 1928,
        and 1932 presidential elections. However, they were wrong in 1936, when
        they predicted Alfred Landon would win the election. This miscalculation
        was due to the fact that they did not take into account the growing
        number of low-income voters, who were supporters of the New Deal.
      </p>
      <li></li>
      <p>
        Gallup's polling was more accurate, since he took into account the
        different demographics of the population.
      </p>
      <li></li>
      <p>
        Gallup is credited with having the most consistent polling, since he has
        asked the same questions in the same way for over 80 years: "Do you
        approve or disapprove of the way [the President] is handling his job as
        president?"
      </p>
    </ul>
    <h3>How are Approval Ratings Calculated?</h3>
    <h3>Additional Resources</h3>
    <ul>
      <li>
        <a
          href="https://www.gallup.com/poll/2444/presidential-job-approval.aspx"
          target="_blank"
          rel="noopener"
          >Gallup Presidential Approval Ratings</a
        >
      </li>
      <li>
        <a
          href="https://time.com/vault/issue/1936-03-02/spread/16/"
          target="_blank"
          rel="noopener"
          >TIME's 1936 Polling Article</a
        >
      </li>
    </ul>
    <li></li>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #9f1870;
}
h3 {
  margin: 40px 0 0;
  color: rgb(212, 146, 157);
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0 200px;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #9f1870;
}
</style>
