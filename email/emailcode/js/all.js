let app = new Vue({
	el: "#app",
	data: {
		contact: [],
		email: "",
		password: "",
	},
	methods: {
		submithandler() {
			let Emailcheck = axios.get("http://localhost:8888/user").then((res) => {
				res.data.email = this.email;
			});
			let regex =
				/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if (!this.email || this.password == "") return alert("請輸入帳號跟密碼");
			else if (regex.test(this.email) != true) {
				return alert("請輸入正確的信箱格式!!");
			} else if (Emailcheck) {
				alert("此信箱已被註冊");
				this.cancelhandler();
				return;
			}
			axios
				.post("http://localhost:8888/user", {
					email: this.email,
					password: this.password,
				})
				.then((res) => {
					this.contact.push(res.data); //如果沒有PUSH的話，我的陣列資料不會馬上改變，會等下一次mounted時才會重新整理我的陣列內容，屆時資料才會顯示在陣列中
					alert("恭喜註冊成功");
					this.cancelhandler();
				});
		},
		cancelhandler() {
			this.email = "";
			this.password = "";
		},
	},
	mounted() {
		axios.get("http://localhost:8888/user").then((res) => {
			this.contact = res.data;
		});
	},
});
