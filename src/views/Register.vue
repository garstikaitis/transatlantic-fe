<template>
  <div class="flex w-screen h-screen flex-col">
    <div class="w-1/3 flex flex-col">
      <div class="text-2xl font-bold">
        Welcome to <br /><span class="text-4xl text-yellow-600"
          >TRANSATLANTIC</span
        >
      </div>
      <div class="flex flex-col">
        <label class="text-lg font-semibold text-green-dark-700">Email</label>
        <input
          v-model="email"
          class="focus:outline-none border p-4 shadow rounded-lg focus:border-green-400 text-lg"
          type="email"
        />
      </div>
      <div class="flex flex-col mt-4">
        <label class="text-lg font-semibold text-green-dark-700"
          >Password</label
        >
        <input
          v-model="password"
          type="password"
          class="focus:outline-none border p-4 shadow rounded-lg focus:border-green-400 text-lg"
        />
      </div>
      <div
        @click="signup"
        class="w-full bg-green-600 text-white text-center text-xl p-3 rounded-lg shadow mt-8 cursor-pointer hover:bg-green-700 transition duration-100"
      >
        Register
      </div>
      <base-divider class="my-4 mx-auto ">OR</base-divider>
      <div
        class="w-full bg-white border border-green-600 text-green-600 text-white text-center text-md p-3 rounded-lg shadow cursor-pointer hover:border-green-700 transition duration-100 flex items-center justify-center"
      >
        <eva-icon class="mr-2" name="google" fill="#268D81"></eva-icon>
        Register with google
      </div>
      <div class="flex justify-center mt-4">
        Already have account?
        <router-link
          :to="{ name: 'Login' }"
          class="text-green-600 hover:underline ml-1"
          >Login here</router-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { AuthenticateRequest } from "@/types/requests";
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";
@Component({ name: "register" })
export default class Register extends Vue {
  email: string = "";
  password: string = "";
  @Action("register", { namespace: "auth" })
  register!: (input: AuthenticateRequest) => void;
  async signup() {
    const data = await this.register({
      email: this.email,
      password: this.password,
    });
  }
}
</script>
