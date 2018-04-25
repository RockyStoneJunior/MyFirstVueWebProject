<template>
  <div class="hello">
    <c-title :text="title"></c-title>
    <img class="logo" src="../assets/images/logo.png">
    <p class="welcome">Rocky 欢迎使用 vue</p>
    <p>{{message}}</p>
    <div v-html="content"></div>
  </div>
</template>

<script>

  import {mapState} from 'vuex';
  import cTitle from 'components/title';

  export default {
    data () {
      return {
        title: 'Hello Rocky Stone!',
        content: ''
      }
    },
    methods: {
      async getContent () {
        const response = await fetch('/api/hello');

        console.log(response)

        this.content = await response.text();
      }
    },
    mounted () {
        this.$store.commit('message', '欢迎光临！');
        this.getContent();
    },

    components: {cTitle}
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  h1 {
    color: #42b983;
  }

  .logo {
    width: 100px;
    height: 100px;
    a {
      color: #42b983;
      text-decoration: none;
    }
  }

  .welcome{
    color: #42b983;
  }
</style>
