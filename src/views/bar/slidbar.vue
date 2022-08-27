<template>
  <div >
    <nav class="shell light">
        <a href="#" class="shell__item"><i class="shell__icon fas fa-list"></i><span class="shell__title">List</span></a>
        <a href="#" class="shell__item"><i class="shell__icon fas fa-home"></i><span class="shell__title">Home</span></a>
        <a href="#" class="shell__item"><i class="shell__icon fas fa-magic"></i><span class="shell__title">Theme</span></a>
        <a href="#" class="shell__item"><i class="shell__icon fas fa-wallet"></i><span class="shell__title">Wallet</span></a>
        <a href="#" class="shell__item"><i class="shell__icon fas fa-image"></i><span class="shell__title">Image</span></a>
        <a href="#" class="shell__item"><i class="shell__icon fas fa-qrcode"></i><span class="shell__title">QRCode</span></a>
        <a href="#" class="shell__item"><i class="shell__icon fas fa-shield-alt"></i><span class="shell__title">Secure</span></a>
        <a href="#" class="shell__item"><i class="shell__icon fas fa-bug"></i><span class="shell__title">Bug</span></a>
    </nav>
    
  </div>
</template>

<script>
export default{
    name:'slidbar'
}

</script>


<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

ul,
li {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
  color: inherit;
}

body {
  background-color: #d1d5db;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
  min-width: 388px;
}

.dark {
  --shell-bg-color: #111827;
  --item-bg-color: #374251;
  --item-hover-txt-color: #fff;
  --item-txt-color: #a0a0af;
}

.light {
  --shell-bg-color: #f3f4f6;
  --item-bg-color: #d1d5db;
  --item-hover-txt-color: #f19f9f;
  --item-txt-color: #000;
}

.unknown {
  --shell-bg-color: #312e81;
  --item-bg-color: #8c78f0;
  --item-hover-txt-color: #312e81;
  --item-txt-color: #8c78f0;
}

:root {
  --shell-bg-color: #312e81;
  --item-bg-color: #4338ca;
  --item-hover-txt-color: #312e81;
  --item-txt-color: #8c78f0;
}

.shell {
  width: 100px;
  height: 100%;
  background-color: var(--shell-bg-color);
  border-radius: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  transition: .3s;
  overflow: hidden;
}

.shell:hover {
  width: 270px;
}

.shell__item {
  display: flex;
  align-items: center;
  width: 85%;
  height: 15%;
  margin: 9px;
  border-radius: 10px;
  position: relative;
  transition: .3s;
  color: var(--item-txt-color);
}

.shell__item:nth-child(1)::before, .shell__item:nth-child(5)::before {
  content: "";
  display: block;
  width: 100%;
  height: 2px;
  background-color: var(--item-bg-color);
  position: absolute;
  bottom: -10px;
}

.shell__item:hover {
  background-color: var(--item-bg-color);
  color: var(--item-hover-txt-color);
}

.shell__icon {
  line-height: 40px;
  font-size: 40px;
  font-weight: bold;
  position: absolute;
  margin-left: .5em;
}

.shell__title {
  position: relative;
  left: 4em;
  font-size: 20px;
  font-weight: bold;
  opacity: 0;
  transition: .1s;
}

.shell:hover .shell__title {
  opacity: 1;
}

</style>