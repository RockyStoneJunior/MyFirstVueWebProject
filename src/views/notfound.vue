<template>
  <div>
    <c-title :text="title" :hide="true"></c-title>
    <p>{{ message }}</p>

    <el-tree
            :data="data2"
            :props="defaultProps"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false">
      <!--:render-content="renderContent"-->
    </el-tree>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import cTitle from 'components/title';

  export default {
    data () {
      return {
        title: 'ERROR!',
          data2: [{
              id: 1,
              label: '一级 1',
              children: [{
                  id: 4,
                  label: '二级 1-1',
                  children: [{
                      id: 9,
                      label: '三级 1-1-1'
                  }, {
                      id: 10,
                      label: '三级 1-1-2'
                  }]
              }]
          }, {
              id: 2,
              label: '一级 2',
              children: [{
                  id: 5,
                  label: '二级 2-1'
              }, {
                  id: 6,
                  label: '二级 2-2'
              }]
          }, {
              id: 3,
              label: '一级 3',
              children: [{
                  id: 7,
                  label: '二级 3-1'
              }, {
                  id: 8,
                  label: '二级 3-2'
              }, {
                  id: 9,
                  label: '二级 3-3'
              }]
          }],
          defaultProps: {
              children: 'children',
              label: 'label'
          }
      }
    },
    computed: mapState([
      'message'
    ]),
    mounted: function () {
      this.$store.commit('message', '404 Not Found！');
    },
    components: {cTitle}
  }
</script>