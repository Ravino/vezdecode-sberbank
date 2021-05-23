const {
  connect,
  NatsConnection,
  StringCodec,
  Subscription
} = require("nats");


console.log("Nats1");
async function test() {

  const nc = await connect({servers: "127.0.0.1:4222"});
  const sc = StringCodec();


  const sub = nc.subscribe("time", { queue: "post"});
  console.log(`listening for ${sub.getSubject()} requests...`);



  for await (const m of sub) {
    console.log(sc.decode(m.data));
    if (m.respond(sc.encode("User profile1"))) {
      console.info(`[time] handled #${sub.getProcessed()}`);
    } else {
      console.log(`[time] #${sub.getProcessed()} ignored - no reply subject`);
    }
  }
}


test()
