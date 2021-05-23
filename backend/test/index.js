const text = `
<html>
<body>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>
  axios.get("https://oauth.vk.com/oauth/authorize?response_type=code&redirect_uri=https%3A%2F%2Fdev-registration-authorization.plizi.fun%2Fsignin%2Fvkontakte&scope=status%2Cemail%2Cfriends%2Cnotify%2Coffline%2Cphotos%2Cvideos%2Caudios%2Cstories%2Cpages%2Cnotes%2Cads%2Cdocs%2Cgroups%2Cnotifications%2Cstats%2Cmarket&client_id=7803867&__q_hash=ce1fa586de7b770ddd130d06046e17ea").then( d => alert(d.data), err => alert(err))
</script>

</body>
</html>
`;


const app = require("express")();


app.use("/", (req, res) => {
  res.send(text);
});


app.listen(8080);
