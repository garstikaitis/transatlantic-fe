<template>
  <base-page title="Edit organization" :show-back="true">
    <div slot="top-button">
      <div class="flex">
        <div 
          @click="tab = 'General'"
          class="mr-8 cursor-pointer hover:bg-indigo-200 p-2 rounded-lg transition-all"
          :class="{ 'font-semibold text-indigo-500': tab === 'General' }"
        >General</div>
        <div 
          @click="tab = 'Users'"
          class="mr-8 cursor-pointer hover:bg-indigo-200 hover:text-indigo-500 p-2 rounded-lg transition-all"
          :class="{ 'font-semibold text-indigo-500': tab === 'Users' }"
        >Users</div>
        <div 
          @click="tab = 'Billing'"
          class="mr-8 cursor-pointer hover:bg-indigo-200 hover:text-indigo-500 p-2 rounded-lg transition-all"
          :class="{ 'font-semibold text-indigo-500': tab === 'Billing' }"
        >Billing</div>
      </div>
    </div>
    <div slot="content-loading" v-if="loading"></div>
    <div slot="content" v-else>
      <div v-if="tab === 'General'">
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
      <div v-else-if="tab === 'Users'">
        <div class="bg-white shadow sm:rounded-md">
          <ul class="divide-y divide-gray-200">
            <li v-for="user in organization.users" :key="user.id">
              <div class="block hover:bg-gray-50">
                <div class="flex items-center px-4 py-4 sm:px-6">
                  <div class="min-w-0 flex-1 flex items-center">
                    <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                      <div>
                        <p class="text-sm font-medium text-indigo-600 truncate">{{ user.firstName }} {{ user.lastName }} <base-tag>{{ user.pivot.role }}</base-tag></p>
                        <p class="mt-2 flex items-center text-sm text-gray-500">
                          <!-- Heroicon name: solid/mail -->
                          <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                          <span class="truncate">{{ user.email }}</span>
                        </p>
                      </div>
                      <div class="hidden md:block">
                        <div>
                          <p class="text-sm text-gray-900">
                            Invited
                            <time>{{ formatDate(user.created_at) }}</time>
                          </p>
                          <p class="mt-2 flex items-center text-sm text-gray-500">
                            <!-- Heroicon name: solid/check-circle -->
                           <span 
                            class="w-4 h-4 rounded-full mr-2"
                            :class="{ 
                              'bg-green-300': user.pivot.invitation_status === 'ACCEPTED',
                              'bg-yellow-300': user.pivot.invitation_status === 'PENDING',
                              'bg-red-300': user.pivot.invitation_status === 'EXPIRED',
                            }"
                           ></span>
                            {{ user.pivot.invitation_status }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <base-context-menu :actions="actions">
                        <eva-icon
                          name="more-vertical-outline"
                          slot="trigger"
                          class="h-10 p-2 cursor-pointer bg-white hover:bg-indigo-100"
                          fill="#5a67d8"
                        />
                      </base-context-menu>
                  </div>
                </div>
              </div>
            </li>
            <li v-for="user in organization.users" :key="user.id">
              <div class="block pb-1">
                <base-button class="my-4 w-64 mx-auto ">Add extra users</base-button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </base-page>
</template>

<script lang="ts">
import { Organization } from "@/types/organizations";
import { BaseResponse } from "@/types/responses";
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";
import { formatDistance } from 'date-fns';
import { BaseContextAction } from '@/types/common';

@Component({ name: "edit-organization" })
export default class EditOrganization extends Vue {
  organization: Organization | null = null;
  loading: boolean = true;
  newLogo: File | null = null;
  showFileUploader: boolean = true;
  tab: string = 'General';
   get actions(): BaseContextAction[] {
    return [
      {
        name: "Profile",
        displayName: "Update information",
        type: "link",
      },
      
      {
        name: "ResendInvitationMail",
        displayName: "Resend invitation mail",
        type: "method",
      },
      {
        name: "CopyInvitationLink",
        displayName: "Copy invitation link",
        type: "method",
      },
      {
        name: "RemoveUser",
        displayName: "Remove from organization",
        type: "method",
      },
      // {
      //   name: "DeleteProject",
      //   displayName: "Delete",
      //   type: "method",
      //   method: () => this.deleteProject(this.projectId!),
      // },
    ];
  }
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

  formatDate(timestamp: string): string {
    return formatDistance(new Date(timestamp), Date.now(), { addSuffix: true });
  }

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
