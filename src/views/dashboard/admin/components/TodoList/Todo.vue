<template>
  <li class="todo" :class="{ completed: todo.done, editing: editing }">
    <div class="view">
      <input class="toggle" type="checkbox" :checked="todo.done" @change="toggleTodo( todo )">
      <label v-text="todo.text" @dblclick="editing=true"></label>
      <button class="destroy" @click="deleteTodo( todo )"></button>
    </div>
    <input class="edit" v-focus="editing" v-show="editing" :value="todo.text" @keyup.enter="doneEdit" @keyup.esc="cancelEdit" @blur="doneEdit">
  </li>
</template>
<script>
export default {
  name: 'Todo',
  props: ['todo'],
  data() {
    return {
      editing: false
    }
  },
  directives: {
    focus(el, { value }, { context }) {
      if (value) {
        context.$nextTick(() => {
          el.focus()
        })
      }
    }
  },
  methods: {
    toggleTodo(todo) {
      this.$emit('toggleTodo', todo)
    },
    deleteTodo(todo) {
      this.$emit('deleteTodo', todo)
    },
    editTodo({ todo, value }) {
      this.$emit('editTodo', { todo, value })
    },
    cancelEdit(e) {
      console.log(e)
      e.target.value = this.todo.text
      this.editing = false
    },
    doneEdit(e) {
      const value = e.target.value.trim()
      const { todo } = this
      if (!value) {
        this.deleteTodo({ todo })
      } else if (this.editing) {
        this.editTodo({
          todo,
          value
        })
        this.editing = false
      }
    }
  }
}
</script>
