<template>
  <div>
    <div class="blurred">
      <base-page></base-page>
    </div>
    <div class="card absolute bg-white flex shadow rounded-lg p-8">
      <div class="w-1/2 mr-8">
        <div class="font-semibold text-3xl text-green-600">
          Thank you for signing up
        </div>
        <p class="text-gray-600">
          Before starting to use Transatlantic, please fill up some data
        </p>
        <div v-if="step === 1">
          <base-input
            v-model="firstName"
            class="my-3 mb-6"
            label="First name"
          />
          <base-input v-model="lastName" label="Last name" />
          <base-button class="mt-8" @click="updateOnboarding"
            >Continue</base-button
          >
        </div>
        <div v-else-if="step === 2">
          <base-input
            v-model="companyName"
            class="my-3 mb-6"
            label="Company name"
          />
          <base-input v-model="subdomain" label="Subdomain" />
          <base-button class="mt-8" @click="handleCreateOrganization"
            >Finish</base-button
          >
        </div>
      </div>
      <div class="w-1/2">
        <img class="w-full mt-8" src="@/assets/onboarding.svg" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { AuthState } from "@/types/auth";
import { CreateOrganizationInput, UpdateUserRequest } from "@/types/requests";
import { User } from "@/types/user";
import { Component, Vue } from "vue-property-decorator";
import { State, Action, Mutation } from "vuex-class";
import UsersApi from "@/api/users-api";
import router from "@/router";
import OrganizationsApi from "@/api/organizations-api";
import {
  AddUserToOrganizationResponse,
  CreateOrganizationResponse,
} from "@/types/responses";

@Component({ name: "onboarding" })
export default class Onboarding extends Vue {
  @State("auth") auth!: AuthState;
  @Action("updateUser", { namespace: "users" })
  updateUser!: (input: UpdateUserRequest) => void;

  @Action("createOrganization", { namespace: "organizations" })
  createOrganization!: (input: {
    name: string;
    subdomain: string;
  }) => Promise<CreateOrganizationResponse>;

  @Action("addUserToOrganization", { namespace: "organizations" })
  addUserToOrganization!: (input: {
    userId: number;
    organizationId: number;
  }) => Promise<AddUserToOrganizationResponse>;

  @Mutation("SET_USER", { namespace: "auth" })
  setUser!: (user: User) => void;

  firstName = "";
  companyName = "";
  subdomain = "";
  lastName = "";
  step = 1;

  async updateOnboarding() {
    const data = await new UsersApi().updateUser(
      this.auth!.user!.id,
      this.firstName,
      this.lastName,
      false
    );
    if (data.success) {
      this.setUser(data.data);
      this.step++;
    }
  }
  async handleCreateOrganization() {
    console.log(this.companyName, this.subdomain);
    const data = await this.createOrganization({
      name: this.companyName,
      subdomain: this.subdomain,
    });
    if (data.success) {
      const map = await this.addUserToOrganization({
        userId: this.auth!.user!.id,
        organizationId: data.data.id,
      });
      if (map.success) {
        const final = await new UsersApi().updateUser(
          this.auth!.user!.id,
          this.firstName,
          this.lastName,
          true
        );
        if (final.success) {
          router.push({ name: "Dashboard" });
        }
      }
    }
  }
  async mounted() {
    const data = await new UsersApi().getMe();
    if (data.success) {
      if (data.data.firstName && data.data.lastName) {
        this.firstName = data.data.firstName;
        this.lastName = data.data.lastName;
        this.step++;
      }
    }
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
