<template>
    <div>
        <hr class="border-t-2 border-50 my-11">

        <div v-if="displayAudits">
            <h2 class="mb-3 text-90 font-normal text-2xl">Audit Log</h2>
            <div class="card">
                <table cellpadding="0" cellspacing="0" data-testid="resource-table" class="table w-full">
                    <thead>
                    <tr>
                        <th></th>
                        <th class="text-left"><span> User </span></th>
                        <th class="text-left"><span> Event </span></th>
                        <th class="text-left"><span> Date/Time </span></th>
                        <th class="text-left"><span> Old Values </span></th>
                        <th class="text-left"><span> New Values </span></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="audit in audits">
                        <td>
                            <svg v-if="audit.event === 'created'" aria-hidden="true" focusable="false" data-prefix="fas"
                                 data-icon="save" class="h-6 text-60 svg-inline--fa fa-save fa-w-14" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor"
                                      d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"></path>
                            </svg>
                            <svg v-if="audit.event === 'updated'" aria-hidden="true" focusable="false" data-prefix="fas"
                                 data-icon="save" class="h-6 text-60 svg-inline--fa fa-save fa-w-14" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor"
                                      d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"></path>
                            </svg>
                            <svg v-if="audit.event === 'deleted'" aria-hidden="true" focusable="false" data-prefix="fas"
                                 data-icon="trash-alt" class="h-6 text-60 svg-inline--fa fa-trash-alt fa-w-14"
                                 role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor"
                                      d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path>
                            </svg>
                        </td>
                        <td>
                            {{ audit.user ? audit.user.name : 'console' }}
                        </td>
                        <td>
                            {{ audit.event }}
                        </td>
                        <td>
                            {{ audit.created_at }}
                        </td>
                        <td>
                            <div v-for="old_value in formatData(audit.old_values)" class="my-2">
                                <span class="inline-block bg-30 p-1 rounded-sm mr-2">{{ old_value.name }}</span> {{
                                old_value.value }}
                            </div>
                        </td>
                        <td>
                            <div v-for="new_value in formatData(audit.new_values)" class="my-2">
                                <span class="inline-block bg-30 p-1 rounded-sm mr-2">{{ new_value.name }}</span> {{
                                new_value.value }}
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="bg-20 rounded-b" per-page="5" resource-count-label="1-3 of 3" current-resource-count="3"
                     all-matching-resource-count="3">
                    <nav class="flex justify-between items-center">
                        <button  :disabled="pagination.prev_page_url === null" rel="prev" dusk="previous"
                                class="btn btn-link py-3 px-4 text-80" :class="{ 'opacity-50': pagination.prev_page_url === null, 'text-primary': pagination.prev_page_url !== null }"
                                 @click="fetchAudits(pagination.prev_page_url)">
                            Previous
                        </button>
                        <span class="text-sm text-80 px-4">
                    {{ pagination.from }}-{{ pagination.to }} of {{ pagination.total }}
                </span>
                        <button :disabled="pagination.next_page_url === null" rel="next" dusk="next"
                                :class="{ 'opacity-50': pagination.next_page_url === null, 'text-primary': pagination.next_page_url !== null }"
                                class="btn btn-link py-3 px-4 text-80" @click="fetchAudits(pagination.next_page_url)">
                            Next
                        </button>
                    </nav>
                </div>
            </div>
        </div>

        <button class="btn btn-default btn-primary" @click.prevent="showAndFetch" v-if="displayAudits === false">View
            Audit Log
        </button>

    </div>
</template>

<script>
    export default {
        props: ['resourceName', 'resourceId', 'field'],

        data() {
            return {
                audits: [],
                displayAudits: false,
                pagination: {}
            }
        },

        mounted() {
            if (this.displayAudits === true) {
                this.fetchAudits();
            }
        },

        methods: {

            showAndFetch() {
                this.displayAudits = true;
                this.fetchAudits();
            },

            fetchAudits(page = null) {
                let vm = this;

                if (!page) {
                    page = '/nova-vendor/auditable-log/audits/' + vm.resourceName + '/' + vm.resourceId
                }

                Nova.request().get(page)
                    .then(({data}) => {
                        vm.audits = data.audits.data;
                        vm.pagination = data.audits;
                    })
                    .catch(() => {

                    })
            },

            formatData(values) {
                let vm = this;
                let returned = [];

                for (var property in values) {
                    if (values.hasOwnProperty(property)) {
                        returned.push({name: property, value: values[property]});
                    }
                }

                return returned;
            },
        }
    }
</script>
