console.log("start");

function loginUser(email, password, callback) {
  setTimeout(() => {
    console.log("got data");
    callback({ userEmail: email });
  }, 5000);
}

function getUserVideos(email, callback) {
  setTimeout(() => {
    // console.log("got data");
    callback(["first_vid", "second_vid"]);
  }, 2000);
}

const user = loginUser("dev@dev.com", 2222222, (user) => {
	console.log(user);
	getUserVideos(user.userEmail, videos => {
		console.log(videos);
	})
});

console.log("end");
