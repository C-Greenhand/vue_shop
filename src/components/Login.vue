<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box"></div>

      <!--表单区域-->
      <el-form
        ref="loginformRef"
        :model="loginform"
        :rules="loginformRules"
        label-width="0px"
        class="login_form"
      >
        <!--用户名-->
        <el-form-item prop="username">
          <el-input v-model="loginform.username" placeholder="用户名："></el-input>
        </el-form-item>

        <!--密码-->
        <el-form-item prop="password">
          <el-input v-model="loginform.password" placeholder="密码：" type="password"></el-input>
        </el-form-item>

        <!--按钮区域-->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登陆</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginform: {
        username: "admin",
        password: "123456"
      },
      //这是表单的规则验证对象
      loginformRules: {
        //验证用户名是否合法
        username: [
          { required: true, message: "请输入登陆名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        //验证密码是否合法
        password: [
          { required: true, message: "请输入登陆密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //点击重置按钮函数
    resetLoginForm() {
      this.$refs.loginformRef.resetFields();
    },
    //登陆预校验函数
    login() {
      this.$refs.loginformRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post("login", this.loginform);
        if (res.meta.status !== 200) return this.$message.error("登陆失败");
        this.$message.success("登陆成功");
        window.sessionStorage.setItem("token", res.data.token);
        this.$router.push("/home");
      });
    }
  }
};
</script>

<style scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.avatar_box {
  height: 130px;
  width: 130px;
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>