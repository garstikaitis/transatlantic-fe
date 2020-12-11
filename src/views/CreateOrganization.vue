<template>
  <base-page title="Create organization" :show-back="true">
    <div slot="content">
      <div>
        <base-detail-item
          title="Organization details"
          description="This information consists of main details"
        >
          <base-input v-model="name" label="Name" />
          <base-input class="mt-4" v-model="subdomain" label="Subdomain" />
        </base-detail-item>
        <base-detail-item class="mt-8" title="Organization logo">
          <base-file-upload v-model="logo" />
        </base-detail-item>
        <div class="flex justify-end mt-4">
          <base-button class="w-min-content" @click="handleCreateOrganization"
            >Save</base-button
          >
        </div>
      </div>
    </div>
  </base-page>
</template>

<script lang="ts">
import router from "@/router";
import { Organization } from "@/types/organizations";
import { Component, Vue } from "vue-property-decorator";
import { State, Action, Mutation } from "vuex-class";

@Component({ name: "create-organization" })
export default class CreateOrganization extends Vue {
  name: string = "";
  subdomain: string = "";
  logo: File | null = null;
  @Action("createOrganization", { namespace: "organizations" })
  createOrganization!: (input: {
    name: string;
    subdomain: string;
    logo: File;
  }) => Promise<boolean>;
  async handleCreateOrganization() {
    const success = await this.createOrganization({
      name: this.name,
      logo: this.logo!,
      subdomain: this.subdomain,
    });
    if (success) {
      router.back();
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
