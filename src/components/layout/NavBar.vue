<template>
  <nav class="navbar-container">
    <ul class="navbar-list">
      <router-link to="/">
        <li class="navbar-item navbar-logo">
          <img src="../../assets/logo.png" alt="Logo" />
          AniList
        </li>
      </router-link>
      <router-link to="/">
        <li class="navbar-item">Home</li>
      </router-link>
      <router-link to="/about">
        <li class="navbar-item">About</li>
      </router-link>
      <router-link to="/search">
        <li class="navbar-item">Search</li>
      </router-link>
      <router-link to="/my-anime-list">
        <li class="navbar-item">List</li>
      </router-link>
      <li class="navbar-item navbar-search">
        <input type="text" placeholder="Enter something..." />
        <img src="../../assets/images/icons/loupe.svg" alt="Loupe" />
      </li>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar-container {
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9999;
  background-color: var(--c-bg-navbar);
  padding: 13px 0;
  font-weight: 500;
  font-size: 18px;
  border-bottom: 3px solid var(--c-btn-red-hover);
  box-shadow: 0 0 15px var(--c-btn-red);
}
.navbar-list {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  list-style: none;
}
.navbar-item {
  cursor: pointer;
  transition: 0.3s ease;
}
.navbar-item:hover {
  color: var(--c-white);
  transition: 0.3s ease;
}
.navbar-logo {
  display: flex;
  align-items: center;
  font-size: 26px;
  font-weight: 700;
}
.navbar-logo img {
  width: 50px;
  margin-right: 15px;
  pointer-events: none;
}
.navbar-search {
  position: relative;
  display: flex;
  align-items: center;
}
.navbar-search input {
  border: none;
  background: none;
  outline: none;

  background-color: var(--c-bg-search);
  color: var(--c-white);
  padding: 13px 15px;
  border-radius: 20px;
  width: 350px;
}
.navbar-search input::placeholder {
  color: var(--c-text-white);
}
.navbar-search img {
  width: 20px;
  position: absolute;
  right: 15px;
  pointer-events: none;
}
</style>
