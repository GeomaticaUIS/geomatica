"use strict";

var main = new Vue({
  el: '#portal-main',
  data: {
    terms: "",
    apps_path: "",
    indicador_path: "",
    logout_path: "",
    menu: [],
    submenu: [],
    types: [],
    type_icon: {},
    type_target: {},
    apps: [],
  },

  methods: {
    appsByTag,
    getIcon,
  },

  computed: {
    appsSearch,
    urlIframe,
    getTarget,
  },

  filters: {
    capitalize,
 },

  mounted() {
    get_appdata(this);
  },
});

var side = new Vue({
  el: '#portal-sidebar',
  data: {
    terms: "",
    apps_path: "",
    indicador_path: "",
    logout_path: "",
    menu: [],
    submenu: [],
    types: [],
    type_icon: {},
    type_target: {},
    apps: [],
  },

  methods: {
    appsByTag,
    getIcon,
    getTarget,
  },

  computed: {
    appsSearch,
  },

  filters: {
    capitalize,
 },

  mounted() {
    get_appdata(this);
  },
});


/*
 *  Methods
 */
function appsByTag(tag) {
  let search = new RegExp(tag);
  return this.appsSearch.filter(app => {
    return search.test(app.tags);
  });
};
function getIcon(type) {
  if (!this.type_icon){
    return "";
  }
  return this.type_icon[type]
};
function getTarget(type) {
  if (!this.type_target){
    return "";
  }
  return this.type_target[type]
};

/*****************
  Computed
*****************/
function appsSearch() {
  if (!this.terms) {
    return this.apps;
  }

  let terms = this.terms.trim().split(/\s*,\s*/);
  terms = terms.filter(term => term != "");
  let search = new RegExp(terms.join('|') , "i");

  return this.apps.filter(app => {
    return (
      search.test(app.type) ||
      search.test(app.name) ||
      search.test(app.tags) ||
      search.test(app.description));
  });
};

function urlIframe() {
  let urlParams = new URLSearchParams(window.location.search);
  let indicador = urlParams.get('indicador');
  if (!indicador) {
    return "index.html"
  }
  return  this.indicador_path+indicador;
};

/*
*  Filters
*/
function capitalize(value) {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
};

/*
 * Mounted
 */
function get_appdata(vm){
 axios.get("apps/data.json", {responseType: 'json'}).then(
   response => {
     let apps = response.data
     vm['apps_path'] = apps['apps_path'];
     vm['indicador_path'] = apps['indicador_path'];
     vm['logout_path'] = apps['logout_path'];

     vm['menu'] = apps['menu'];
     vm['submenu'] = apps['submenu'];
     vm['types'] = apps['types'];
     vm['type_icon'] = apps['type_icon'];
     vm['type_target'] = apps['type_target'];
     vm['apps'] = apps['apps'];
   });
 };
