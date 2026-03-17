"use strict";

var main = new Vue({
  el: '#portal-main',
  data: {
    terms: "",
    apps_path: "",
    menu: [],
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
    getTarget,
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

/*
 *  Computed
 */
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
  axios.get("apps/config.json", {responseType: 'json'}).then(
    response => {
      let config = response.data
      vm['apps_path'] = config['apps_path'];
      vm['menu'] = config['menu'];
      vm['types'] = config['types'];
      vm['type_icon'] = config['type_icon'];
    });
  axios.get("apps/apps.json", {responseType: 'json'}).then(
    response => {
      let apps = response.data
      vm['apps'] = apps['apps'];
    });
 };
