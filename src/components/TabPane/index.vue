<template>
  <div class="tabs">
    <div class="tabs-bar">
      <!-- tabpan标题 -->
      <div :class="tabCls(item)" v-for="(item,index) in paneList" :key="index" @change="handleChange(index)">
        {{item.label}}
      </div>
    </div>
    <div class="tabs-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tabPane',
  props: {
    value: {
      type: [String]
    }
  },
  data() {
    return {
      paneList: [],
      currentValue: this.value
    }
  },
  methods: {
    getTabs() {
      return this.$children.filter(item => {
        item.$options.name === 'pane'
      })
    },
    updateNav() {
      this.paneList = []
      this.getTabs().forEach((pane, index) => {
        this.paneList.push({
          label: pane.label,
          name: pane.name || index
        })
        if (!pane.name) {
          pane.name = index
        }
        if (index === 0) {
          if (!this.currentValue) {
            this.currentValue = pane.name || index
          }
        }
      })
      this.updateStatus()
    },
    updateStatus() {
      const tabs = this.getTabs()
      tabs.forEach(tab => {
        return (tab.show = tab.name === this.currentValue)
      })
    },
    tabClsitem(item) {
      return [
        'tabs-tab',
        {
          'tabs-tab-active': item.name === this.currentValue
        }
      ]
    },
    handleChange(index) {
      const name = this.paneList[index].name
      this.currentValue = name
      this.$emit('input', name)
    }
  },
  mounted() {},
  watch: {
    value(val) {
      this.currentValue = val
    },
    currentValue() {
      this.updateStatus()
    }
  }
}
</script>

<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
.tabs {
  font-size: 14px;
  color: #657180;
}
.tabs-bar:after {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  background: #d7dde4;
  margin-top: -1px;
}
.tabs-tab {
  display: inline-block;
  padding: 4px 16px;
  margin-right: 6px;
  background: #fff;
  border: 1px solid #d7dde4;
  cursor: pointer;
  position: relative;
}
.tabs-tab-active {
  color: #3399ff;
  border-top: 1px solid #3399ff;
  border-bottom: 1px solid #3399ff;
}
.tabs-tab-active:before {
  content: '';
  display: block;
  height: 1px;
  background: #3399ff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.tabs-content {
  padding: 8px 0;
}
</style>
