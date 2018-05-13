<template>
  <nav>
    <ul>
      <li :class="$route.path == '/monitoring'    ? 'selected' : ''"><router-link to="/monitoring">Monitoring</router-link></li>
      <li :class="$route.path == '/home-security' ? 'selected' : ''"><router-link to="/home-security">Home-Security</router-link></li>
      <li :class="$route.path == '/family'        ? 'selected' : ''"><router-link to="/family">Famille</router-link></li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'nav-menu'
  }
</script>

<style scoped lang="scss">
nav {
  overflow: hidden;
  height: 45px;
  margin: 0;
  padding: 0;
  ul {
    padding: 0;
    margin: 0;
    li {
      margin: 0;
      padding: 10px;
      float: left;
      display: block;
      font-size: 1.5em;
      background-color: #578ac5;  
      a {
        color: white;
        text-decoration: none;
      }
    }
    li:hover {
      background-color: rgb(55, 68, 126);  
    }
    li.selected {
      background-color: rgb(35, 48, 86);
    }
  }
}
</style>
