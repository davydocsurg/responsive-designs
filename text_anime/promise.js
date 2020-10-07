const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("user");
    resolve({ user: "dave" });
  }, 2000);
});

promise.then((user) => {
  console.log(user);
});
