Vue.filter('capitalize', val => {
    console.log('capitalize', val);
    return val[0].toUpperCase() + val.slice(1);
})

Vue.filter('capitalizeWords', val => {
    return val.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
})
