<template>
<div class="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <transition
        :appear="true"
        enter-active-class="transition ease-out duration-300"
        enter-class="transition opacity-0"
        enter-to-class="transition opacity-100"
        leave-active-class="transition ease-in duration-200"
        leave-class="transition opacity-100"
        leave-to-class="transition opacity-0"
    >
        <div>
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <transition key="content"
                :appear="true"
                enter-active-class="transition ease-out duration-300"
                enter-class="transition opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enter-to-class="transition opacity-100 translate-y-0 sm:scale-100"
                leave-active-class="transition ease-in duration-200"
                leave-class="transition opacity-100 translate-y-0 sm:scale-100"
                leave-to-class="transition opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >

                <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <div class="sm:flex sm:items-start">
                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                <slot name="title">Modal title</slot>
                            </h3>
                            <div class="mt-2">
                                <p class="text-sm text-gray-500">
                                <slot name="description">Modal description</slot>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="sm:ml-4 sm:mt-4">
                        <slot name="content"></slot>
                    </div>
                    <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <slot name="button">
                                <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                                    Continue
                                </button>
                        </slot>
                        <slot name="cancel">
                            <button @click="$emit('close')" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm">
                            Cancel
                            </button>
                        </slot>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
  </div>
</div>

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({ name: "base-modal" })
export default class BaseModal extends Vue {
}
</script>