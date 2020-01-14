<template>
    <modal @modal-close="handleClose">
        <form
            @submit.prevent="handleConfirm"
            slot-scope="props"
            class="bg-white rounded-lg shadow-lg overflow-hidden"
            style="width: 750px"
        >
            <slot>
                <div class="p-8">
                    <heading :level="2" class="mb-6">
                        {{__('Restore audit')}}
                    </heading>
                    <table class="table w-full mt-4">
                        <thead>
                        <th style="max-width: 20px;">
                            <checkbox
                                @input="toggleSelectAll"
                                :checked="allSelected"
                            />
                        </th>
                        <th>
                            {{__('Field')}}
                        </th>
                        <th>
                            {{__('Current')}}
                        </th>
                        <th>
                            {{__('Restore to')}}
                        </th>
                        </thead>
                        <tbody>
                        <tr v-for="compare in comparison">
                            <td style="max-width: 20px;" class="text-center">
                                <input type="checkbox" class="checkbox" v-model="restoreIds" :value="compare.key" />
                            </td>
                            <td>{{compare.label}}</td>
                            <td class="text-center">{{compare.current}}</td>
                            <td class="text-center">{{compare.restore}}</td>
                        </tr>
                        <tr v-if="comparison.length == 0">
                            <td colspan="4" class="text-center">
                                {{__('No changes')}}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </slot>

            <div class="bg-30 px-6 py-3 flex">
                <div class="ml-auto">
                    <button
                        type="button"
                        data-testid="cancel-button"
                        dusk="cancel-delete-button"
                        @click.prevent="handleClose"
                        class="btn text-80 font-normal h-9 px-3 mr-3 btn-link"
                    >
                        {{ __('Cancel') }}
                    </button>

                    <button
                        id="confirm-delete-button"
                        ref="confirmButton"
                        data-testid="confirm-button"
                        type="submit"
                        class="btn btn-default btn-danger"
                    >
                        {{ __('Restore') }}
                    </button>
                </div>
            </div>
        </form>
    </modal>
</template>

<script>
    export default {
        props: ['fields', 'audit', 'resourceName', 'resourceId'],

        data(){
            return {
                restoreIds: [],
                selectAll: false,
            };
        },

        methods: {
            handleClose() {
                this.$emit('close')
            },

            async handleConfirm() {
                // If the user is actually restoring certain values
                if(this.restoreIds.length > 0) {
                    // Send the keys to the restore endpoint
                    const response = await Nova.request()
                        .post(`/nova-vendor/auditable-log/audits/${this.resourceName}/${this.resourceId}/${this.audit.id}`, {restore: this.restoreIds});

                    // Keep track of which keys have been updated
                    const updatedProps = this.restoreIds.map(id => {
                        return {
                            key: id,
                            value: response.data.record[id]
                        }
                    });

                    // Trigger restored event
                    this.$emit('restored', updatedProps);
                }

                // Just close the modal
                this.$emit('close');
            },

            toggleSelectAll() {
                if(this.allSelected) {
                    this.restoreIds = [];
                    return;
                }

                this.restoreIds = this.comparison.map(c => c.key);
            }
        },

        computed: {
            allSelected(){
                return this.comparison.length === this.restoreIds.length;
            },
            // Returns a list of differences with the current values of the record
            comparison() {
                return Object.keys(this.audit.new_values).map(key => {
                    if (typeof this.fields[key] == 'undefined') return null;
                    if(this.fields[key].value == this.audit.new_values[key]) return null;

                    return  {
                        key,
                        label: this.fields[key].label,
                        current: this.fields[key].value,
                        restore: this.audit.new_values[key]
                    }
                }).filter(field => field !== null)
            }
        },
    }
</script>
