export default {
  bind(el, binding) {
    // let _this = this
    function handleClick(event) {
      if (el.contains(event.target)) {
        return false
      }
      if (binding.expression) {
        binding.value(event)
      }
    }
    el._clickout_ = handleClick
    document.body.addEventListener('click', el._clickout_)
  },
  unbind(el) {
    document.body.removeEventListener('click', el._clickout_)
    delete el._clickout_

  }
}
