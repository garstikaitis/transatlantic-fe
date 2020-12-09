<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div
    class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 shadow rounded-lg"
  >
    <div class="flex-1 flex justify-between sm:hidden">
      <div
        @click="fetchPrevPageOfTranslations"
        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 cursor-pointer"
      >
        Previous
      </div>
      <div
        @click="fetchNextPageOfTranslations"
        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 cursor-pointer"
      >
        Next
      </div>
    </div>
    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          <span class="font-medium">{{
            pagination.currentPage === 1
              ? 1
              : (pagination.currentPage - 1) * 50 + 1
          }}</span>
          to
          <span class="font-medium">{{
            pagination.currentPage === 1 ? 50 : pagination.currentPage * 50
          }}</span>
          of
          <span class="font-medium">{{ pagination.totalResults }}</span>
          results
        </p>
      </div>
      <div>
        <nav
          class="relative z-0 inline-flex shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <div
            @click="fetchPrevPageOfTranslations"
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            :class="{
              'cursor-pointer': allowBack,
              'cursor-not-allowed': !allowBack,
            }"
          >
            <span class="sr-only">Previous</span>
            <!-- Heroicon name: chevron-left -->
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
            v-for="(page, index) in pagesToRender"
            :key="index"
            @click="fetchExactPageOfTranslations(page)"
          >
            {{ page > 0 ? page : "..." }}
          </div>
          <div
            @click="fetchNextPageOfTranslations"
            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            :class="{
              'cursor-pointer': allowNext,
              'cursor-not-allowed': !allowNext,
            }"
          >
            <span class="sr-only">Next</span>
            <!-- Heroicon name: chevron-right -->
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Pagination } from "@/types/common";
import { Component, Vue, Prop } from "vue-property-decorator";
import _takeRight from "lodash/takeRight";
import { Action, namespace, State } from "vuex-class";
import { ProjectsState } from "@/types/projects";
@Component({ name: "base-pagination" })
export default class BasePagination extends Vue {
  @Prop() pagination!: Pagination;
  @State("projects") projectsState!: ProjectsState;

  @Action("getTranslations", { namespace: "translations" })
  fetchTranslations!: (input: { projectId: number; page: number }) => void;
  get pagesToRender(): number[] {
    return [
      ...this.getStartOfPagesToReturn(),
      ...this.getMiddleOfPagesToReturn(),
      ...this.getEndOfPagesToReturn(),
    ];
  }

  fetchPrevPageOfTranslations() {
    if (this.allowBack) {
      this.fetchTranslations({
        projectId: this.projectsState.activeProject!.id,
        page: this.pagination.currentPage - 1,
      });
    }
  }

  fetchNextPageOfTranslations() {
    if (this.allowNext) {
      this.fetchTranslations({
        projectId: this.projectsState.activeProject!.id,
        page: this.pagination.currentPage + 1,
      });
    }
  }

  fetchExactPageOfTranslations(page: number) {
    this.fetchTranslations({
      projectId: this.projectsState.activeProject!.id,
      page,
    });
  }

  get allowBack() {
    return this.pagination.currentPage !== 1;
  }

  get allowNext() {
    return this.pagination.currentPage !== this.pagination.totalPages;
  }

  getStartOfPagesToReturn(): number[] {
    const { currentPage } = this.pagination;
    if (currentPage === 1) {
      return [1, 2, 3];
    } else {
      return [currentPage - 1, currentPage, currentPage + 1];
    }
  }

  getMiddleOfPagesToReturn(): number[] {
    const startPages = this.getStartOfPagesToReturn();
    const lastElementOfStartPages = startPages[startPages.length - 1];

    const endPages = this.getEndOfPagesToReturn();
    const firstElementOfEndPages = endPages[0];

    if (lastElementOfStartPages >= firstElementOfEndPages)
      return [firstElementOfEndPages];

    return [0];
  }

  getEndOfPagesToReturn(): number[] {
    const { currentPage, totalPages } = this.pagination;
    const range = this.range(currentPage, totalPages);
    const difference = range.length - currentPage;
    if (difference <= 1) return _takeRight(range, 2);
    else return _takeRight(range, 3);
  }

  range(start: number, end: number): number[] {
    return Array.from(Array(end - start + 1), (_, i) => i + start);
  }
}
</script>
