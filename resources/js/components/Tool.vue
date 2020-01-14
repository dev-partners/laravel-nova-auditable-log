<template>
    <div>
        <hr class="border-t-2 border-50 my-11">

        <div v-if="displayAudits">
            <h2 class="mb-3 text-90 font-normal text-2xl">{{__('Audit Log')}}</h2>
            <div class="card">
                <table cellpadding="0" cellspacing="0" data-testid="resource-table" class="table w-full">
                    <thead>
                    <tr>
                        <th></th>
                        <th class="text-left"><span> {{__('User')}} </span></th>
                        <th class="text-left"><span> {{__('Event')}} </span></th>
                        <th class="text-left"><span> {{__('Date/Time')}} </span></th>
                        <th class="text-left"><span> {{__('Old Values')}} </span></th>
                        <th class="text-left"><span> {{__('New Values')}} </span></th>
                        <th v-if="canRestore"></th>
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
                            {{ audit.user ? audit.user.name : __('console') }}
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
                        <td class="text-center" v-if="canRestore">
                            <svg @click="showRestoreAudit(audit)" style="max-width: 20px;"
                                 xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#"
                                 xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                                 xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg"
                                 xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
                                 xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" viewBox="0 -256 1792 1792"
                                 id="svg3447" version="1.1" inkscape:version="0.48.3.1 r9886" width="100%" height="100%"
                                 sodipodi:docname="undo_font_awesome.svg">
                                <defs id="defs3455"/>
                                <sodipodi:namedview pagecolor="#ffffff" bordercolor="#666666" borderopacity="1"
                                                    objecttolerance="10" gridtolerance="10" guidetolerance="10"
                                                    inkscape:pageopacity="0" inkscape:pageshadow="2"
                                                    inkscape:window-width="640" inkscape:window-height="480"
                                                    id="namedview3453" showgrid="false" inkscape:zoom="0.13169643"
                                                    inkscape:cx="896" inkscape:cy="896" inkscape:window-x="0"
                                                    inkscape:window-y="25" inkscape:window-maximized="0"
                                                    inkscape:current-layer="svg3447"/>
                                <g transform="matrix(1,0,0,-1,113.89831,1262.6441)" id="g3449">
                                    <path
                                        d="M 1536,640 Q 1536,484 1475,342 1414,200 1311,97 1208,-6 1066,-67 924,-128 768,-128 589,-128 431.5,-52 274,24 165.5,161 57,298 18,473 q -3,14 7,27 9,12 25,12 h 199 q 23,0 30,-23 Q 329,327 464,227.5 599,128 768,128 872,128 966.5,168.5 1061,209 1130,278 q 69,69 109.5,163.5 40.5,94.5 40.5,198.5 0,104 -40.5,198.5 Q 1199,933 1130,1002 1061,1071 966.5,1111.5 872,1152 768,1152 670,1152 580,1116.5 490,1081 420,1015 L 557,877 q 31,-30 14,-69 -17,-40 -59,-40 H 64 Q 38,768 19,787 0,806 0,832 v 448 q 0,42 40,59 39,17 69,-14 l 130,-129 q 107,101 244.5,156.5 137.5,55.5 284.5,55.5 156,0 298,-61 142,-61 245,-164 103,-103 164,-245 61,-142 61,-298 z"
                                        id="path3451" inkscape:connector-curvature="0" style="fill:currentColor"/>
                                </g>
                            </svg>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="bg-20 rounded-b" per-page="5" resource-count-label="1-3 of 3" current-resource-count="3"
                     all-matching-resource-count="3">
                    <nav class="flex justify-between items-center">
                        <button :disabled="pagination.prev_page_url === null" rel="prev" dusk="previous"
                                class="btn btn-link py-3 px-4 text-80"
                                :class="{ 'opacity-50': pagination.prev_page_url === null, 'text-primary': pagination.prev_page_url !== null }"
                                @click="fetchAudits(pagination.prev_page_url)">
                            {{__('Previous')}}
                        </button>
                        <span class="text-sm text-80 px-4">
                    {{ pagination.from }}-{{ pagination.to }} of {{ pagination.total }}
                </span>
                        <button :disabled="pagination.next_page_url === null" rel="next" dusk="next"
                                :class="{ 'opacity-50': pagination.next_page_url === null, 'text-primary': pagination.next_page_url !== null }"
                                class="btn btn-link py-3 px-4 text-80" @click="fetchAudits(pagination.next_page_url)">
                            {{__('Next')}}
                        </button>
                    </nav>
                </div>
            </div>
        </div>

        <button class="btn btn-default btn-primary" @click.prevent="showAndFetch" v-if="displayAudits === false">
            {{__('View Audit Log')}}
        </button>

        <restore-audit-modal v-if="restore !== null" :fields="parentFields" :resourceName="resourceName"
                             :resourceId="resourceId" :audit="restore" @close="restore = null" @restored="restored">
        </restore-audit-modal>
    </div>
</template>

<script>
    import RestoreAuditModal from './RestoreAuditModal';
    import {normaliseFields} from './../fields';

    export default {
        props: ['resourceName', 'resourceId', 'field'],

        components: {
            RestoreAuditModal
        },
        data() {
            return {
                audits: [],
                displayAudits: false,
                pagination: {},
                restore: null,
                parentFields: [],
                canRestore: false,
            }
        },

        mounted() {
            if (this.displayAudits === true) {
                this.fetchAudits();
            }

            // Normalise the parent fields
            this.parentFields = normaliseFields(this.$parent.$children.filter(component => component.$vnode.componentOptions.tag === 'panel')[0].fields);
        },

        methods: {

            showAndFetch() {
                this.displayAudits = true;
                this.fetchAudits();
            },

            async fetchAudits(page = null) {
                if (!page) {
                    page = `/nova-vendor/auditable-log/audits/${this.resourceName}/${this.resourceId}`
                }

                try {
                    const {data} = await Nova.request().get(page);
                    this.audits = data.audits.data;
                    this.pagination = data.audits;
                    this.canRestore = data.restore;
                }
                catch(e) {
                    // Do nothing, nova handles errors
                }
            },

            formatData(values) {
                let returned = [];

                for (var property in values) {
                    if (values.hasOwnProperty(property)) {
                        returned.push({name: property, value: values[property]});
                    }
                }

                return returned;
            },

            showRestoreAudit(audit) {
                this.restore = audit;
            },

            restored(updatedProps) {
                // Updates the value of the parent fields
                updatedProps.forEach(prop => {
                    this.parentFields[prop.key].value = prop.value;
                });

                // Retrieve fresh audits
                this.fetchAudits();
            }
        }
    }
</script>
