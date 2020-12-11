<template>
  <base-page title="Edit organization" :show-back="true">
    <div slot="content-loading" v-if="loading"></div>
    <div slot="content" v-else>
      <div>
        <base-detail-item
          title="Organization details"
          description="This information consists of main details"
        >
          <base-input v-model="organization.name" label="Name" />
          <base-input
            class="mt-4"
            v-model="organization.subdomain"
            label="Subdomain"
          />
        </base-detail-item>
        <base-detail-item class="mt-8" title="Organization logo">
          <div v-if="organization.logo && !showFileUploader">
            <img
              class="w-32 h-32 flex-shrink-0 bg-white rounded-full"
              :src="organization.logo"
            />
            <base-button @click="showFileUploader = true" class="w-32 mt-4"
              >Upload new</base-button
            >
          </div>
          <base-file-upload v-else v-model="newLogo" />
        </base-detail-item>
        <div class="flex justify-end mt-4">
          <base-button
            class="w-min-content"
            @click="
              editOrganization({
                name: organization.name,
                subdomain: organization.subdomain,
                organizationId: organization.id,
                newLogo: newLogo,
              })
            "
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
import { BaseResponse } from "@/types/responses";
import { Component, Vue } from "vue-property-decorator";
import { State, Action, Mutation } from "vuex-class";

@Component({ name: "edit-organization" })
export default class EditOrganization extends Vue {
  organization: Organization | null = null;
  loading: boolean = true;
  newLogo: File | null = null;
  showFileUploader: boolean = true;
  @Action("getOrganizationById", { namespace: "organizations" })
  getOrganizationById!: (input: {
    organizationId: string;
  }) => Promise<BaseResponse>;

  @Action("editOrganization", { namespace: "organizations" })
  editOrganization!: (input: {
    organizationId: string;
    name: string;
    subdomain: string;
    newLogo: File | null;
  }) => void;

  async mounted() {
    const { success, data } = await this.getOrganizationById({
      organizationId: this.$route.params.id.toString(),
    });
    if (success) {
      this.organization = data;
      this.showFileUploader = !Boolean(this.organization!.logo);
    }
    this.loading = false;
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
