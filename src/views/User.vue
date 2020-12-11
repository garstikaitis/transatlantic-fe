<template>
  <base-page title="Edit profile" :show-back="false">
    <div slot="content-loading" v-if="loading"></div>
    <div slot="content" v-else>
      <div>
        <base-detail-item
          title="User details"
          description="This information consists of main details"
        >
          <base-input v-model="user.firstName" label="First name" />
          <base-input class="mt-4" v-model="user.lastName" label="Last name" />
          <base-input
            class="mt-4"
            v-model="user.email"
            label="E-mail"
            type="email"
          />
        </base-detail-item>
        <base-detail-item class="mt-8" title="Profile picture">
          <div v-if="user.image && !showFileUploader">
            <img
              class="w-32 h-32 flex-shrink-0 bg-white rounded-full"
              :src="user.image"
            />
            <base-button @click="showFileUploader = true" class="w-32 mt-4"
              >Upload new</base-button
            >
          </div>
          <base-file-upload v-else v-model="newLogo" />
        </base-detail-item>
        <div class="flex justify-end mt-4">
          <base-button class="w-min-content" @click="handleEditUser"
            >Save</base-button
          >
        </div>
      </div>
    </div>
  </base-page>
</template>

<script lang="ts">
import router from "@/router";
import { AuthState } from "@/types/auth";
import { Organization } from "@/types/organizations";
import { BaseResponse } from "@/types/responses";
import { Component, Vue } from "vue-property-decorator";
import { State, Action, Mutation } from "vuex-class";
import { User as UserType } from "@/types/user";
import { EditUserRequest } from "@/types/requests";

@Component({ name: "user" })
export default class User extends Vue {
  user: UserType | null = null;
  loading: boolean = true;
  showFileUploader: boolean = true;
  newLogo: File | null = null;
  @State("auth") authState!: AuthState;
  @Action("updateUser", { namespace: "auth" })
  updateUser!: (input: EditUserRequest) => void;

  handleEditUser() {
    this.updateUser({
      firstName: this.user!.firstName,
      lastName: this.user!.lastName,
      email: this.user!.email,
      userId: this.user!.id,
      newLogo: this.newLogo,
      onboardingCompleted: this.user!.onboardingCompleted,
      role: this.user!.role,
    });
  }

  async mounted() {
    setTimeout(() => {
      this.user = this.authState.user;
      this.showFileUploader = Boolean(this.user!.logo);
      this.loading = false;
    }, 500);
  }
}
</script>
<style lang="scss">
.blurred {
  filter: blur(10px);
}
.card {
  top: calc(50% - 30vh);
  left: calc(50% - 30vw);
  height: 60vh;
  width: 60vw;
}
</style>
