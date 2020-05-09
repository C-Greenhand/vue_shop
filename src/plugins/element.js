import Vue from "vue";
import {
  Button,
  Form,
  FormItem,
  input,
  Message,
  Container,
  Header,
  Aside,
  Main,
} from "element-ui";

Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(input);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.prototype.$message = Message;
