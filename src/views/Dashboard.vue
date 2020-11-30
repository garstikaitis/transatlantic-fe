<template>
  <base-page :show-back="false" title="Dashboard">
    <div class="flex w-screen flex" slot="content">
      <div class="bg-white overflow-hidden shadow rounded-lg w-1/3 mr-4">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg
                class="h-6 w-6 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">
                  Total translations
                </dt>
                <dd>
                  <div class="text-lg font-medium text-gray-900">
                    <v-count-to
                      :startVal="0"
                      :endVal="totals.total_translations"
                      :duration="3000"
                    ></v-count-to>
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-5 py-3">
          <div class="text-sm">
            <a href="#" class="font-medium text-cyan-700 hover:text-cyan-900">
              View all
            </a>
          </div>
        </div>
      </div>
      <div class="bg-white overflow-hidden shadow rounded-lg w-1/3">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg
                class="h-6 w-6 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">
                  Upcoming payment
                </dt>
                <dd>
                  <div class="text-lg font-medium text-gray-900">
                    $30,659.45
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-5 py-3">
          <div class="text-sm">
            <a href="#" class="font-medium text-cyan-700 hover:text-cyan-900">
              View all
            </a>
          </div>
        </div>
      </div>
    </div>
  </base-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TotalsApi from "@/api/totals-api";
import { State } from "vuex-class";
import { OrganizationState } from "@/types/organizations";
import { GetDashboardTotalsResponse } from "@/types/responses";
@Component({ name: "dashboard" })
export default class Dashboard extends Vue {
  @State("organizations") organizations!: OrganizationState;
  totals: GetDashboardTotalsResponse["data"] = { total_translations: 0 };
  async mounted() {
    const { data } = await new TotalsApi().getDashboardTotals(
      this.organizations.activeOrganization!.id
    );
    this.totals = data;
  }
}
</script>
